param($BASE = "http://localhost:5070")

Add-Type -AssemblyName System.Net.Http

$pass = 0; $fail = 0

function Assert($label, $expected, $actual, $extra = "") {
  if ("$actual" -eq "$expected") {
    Write-Host "  [PASS] $label" -ForegroundColor Green
    $script:pass++
  }
  else {
    Write-Host "  [FAIL] $label  expected='$expected'  got='$actual'  $extra" -ForegroundColor Red
    $script:fail++
  }
}

function Send-Multipart($method, $url, $fields, $imgPath = $null, $mdlPath = $null) {
  $hc = [System.Net.Http.HttpClient]::new()
  $form = [System.Net.Http.MultipartFormDataContent]::new()
  foreach ($kv in $fields.GetEnumerator()) {
    $form.Add([System.Net.Http.StringContent]::new($kv.Value, [System.Text.Encoding]::UTF8), $kv.Key)
  }
  if ($imgPath) {
    $c = [System.Net.Http.ByteArrayContent]::new([System.IO.File]::ReadAllBytes($imgPath))
    $c.Headers.ContentType = [System.Net.Http.Headers.MediaTypeHeaderValue]::new("image/gif")
    $form.Add($c, "Image", [System.IO.Path]::GetFileName($imgPath))
  }
  if ($mdlPath) {
    $c = [System.Net.Http.ByteArrayContent]::new([System.IO.File]::ReadAllBytes($mdlPath))
    $c.Headers.ContentType = [System.Net.Http.Headers.MediaTypeHeaderValue]::new("model/gltf-binary")
    $form.Add($c, "Model3D", [System.IO.Path]::GetFileName($mdlPath))
  }
  $req = [System.Net.Http.HttpRequestMessage]::new([System.Net.Http.HttpMethod]::new($method), [Uri]$url)
  if ($script:token) {
    $req.Headers.Authorization = [System.Net.Http.Headers.AuthenticationHeaderValue]::new("Bearer", $script:token)
  }
  $req.Content = $form
  $resp = $hc.SendAsync($req).Result
  $body = $resp.Content.ReadAsStringAsync().Result
  $hc.Dispose()
  return @{ Code = [int]$resp.StatusCode; Body = $body }
}

Write-Host ""
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "   FLEET CONTROLLER  -  FULL TEST SUITE   " -ForegroundColor Cyan
Write-Host "==========================================="  -ForegroundColor Cyan
Write-Host "   Target: $BASE" -ForegroundColor DarkGray
Write-Host ""

# STEP 0 - Login
Write-Host "STEP 0  Login" -ForegroundColor Yellow
$loginBody = '{"UserName":"testadmin","Password":"FleetTest@1"}'
try {
  $lr = Invoke-RestMethod "$BASE/api/auth/login" -Method POST -ContentType "application/json" -Body $loginBody
  $script:token = $lr.token
  Assert "Login returns JWT token" $true ($script:token.Length -gt 10)
  Write-Host "         token: $($script:token.Substring(0,50))..." -ForegroundColor DarkGray
}
catch {
  Write-Host "  [FAIL] Login failed: $($_.Exception.Message)" -ForegroundColor Red
  exit 1
}

# STEP 1 - Auth Guards
Write-Host ""
Write-Host "STEP 1  Auth Guards (no token must return 401)" -ForegroundColor Yellow
$gf = [ordered]@{
  NameEn = "x"; NameAr = "x"; DescriptionEn = "x"; DescriptionAr = "x"
  DetailedDescriptionEn = "x"; DetailedDescriptionAr = "x"
}
$savedToken = $script:token
$script:token = $null

$r = Send-Multipart "POST" "$BASE/api/fleet" $gf
Assert "POST without token -> 401" 401 $r.Code

$r = Send-Multipart "PUT" "$BASE/api/fleet/1" $gf
Assert "PUT without token -> 401" 401 $r.Code

$hcD = [System.Net.Http.HttpClient]::new()
$rqD = [System.Net.Http.HttpRequestMessage]::new([System.Net.Http.HttpMethod]::Delete, [Uri]"$BASE/api/fleet/1")
$cdD = [int]($hcD.SendAsync($rqD).Result.StatusCode)
$hcD.Dispose()
Assert "DELETE without token -> 401" 401 $cdD

$script:token = $savedToken

# STEP 2 - GET ALL before create
Write-Host ""
Write-Host "STEP 2  GET ALL before create" -ForegroundColor Yellow
try {
  $r2 = Invoke-RestMethod "$BASE/api/fleet" -Method GET
  Assert "GET /api/fleet returns 200" $true ($null -ne $r2)
  Write-Host "         fleet count before: $(@($r2).Count)" -ForegroundColor DarkGray
}
catch {
  Assert "GET /api/fleet -> 200" 200 ([int]$_.Exception.Response.StatusCode)
}

# STEP 3 - GET 404 non-existent
Write-Host ""
Write-Host "STEP 3  GET non-existent -> 404" -ForegroundColor Yellow
try {
  Invoke-RestMethod "$BASE/api/fleet/999999" -Method GET | Out-Null
  Assert "GET 999999 -> 404" 404 200
}
catch [System.Net.WebException] {
  Assert "GET 999999 -> 404" 404 ([int]$_.Exception.Response.StatusCode)
}

# STEP 4 - CREATE with image + 3D model
Write-Host ""
Write-Host "STEP 4  CREATE fleet with image + 3D model (POST /api/fleet)" -ForegroundColor Yellow

$gifPath = "$env:TEMP\fleet_test.gif"
$glbPath = "$env:TEMP\fleet_test.glb"
[IO.File]::WriteAllBytes($gifPath, [byte[]](0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00, 0x00, 0xFF, 0x00, 0x3B))
[IO.File]::WriteAllBytes($glbPath, [byte[]](0x67, 0x6C, 0x54, 0x46, 0x02, 0x00, 0x00, 0x00, 0x0C, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00))

$cf = [ordered]@{
  NameEn                      = "Merkwave Vessel Alpha"
  NameAr                      = "Markwave Vessel Alpha AR"
  DescriptionEn               = "State-of-the-art offshore support vessel"
  DescriptionAr               = "Vessel description arabic placeholder"
  DetailedDescriptionEn       = "Equipped with DP2 positioning and 400-tonne crane"
  DetailedDescriptionAr       = "Detailed description arabic placeholder"
  "Features[0].TitleEn"       = "Dynamic Positioning"
  "Features[0].TitleAr"       = "Dynamic Positioning AR"
  "Features[0].DescriptionEn" = "DP2-class system for station-keeping"
  "Features[0].DescriptionAr" = "Feature 0 description arabic placeholder"
  "Features[1].TitleEn"       = "400-Tonne Crane"
  "Features[1].TitleAr"       = "400-Tonne Crane AR"
  "Features[1].DescriptionEn" = "Heavy lift up to 400 tonnes"
  "Features[1].DescriptionAr" = "Feature 1 description arabic placeholder"
  "Features[2].TitleEn"       = "Advanced Sonar"
  "Features[2].TitleAr"       = "Advanced Sonar AR"
  "Features[2].DescriptionEn" = "Multi-beam 0.5 degree resolution"
  "Features[2].DescriptionAr" = "Feature 2 description arabic placeholder"
}

$r4 = Send-Multipart "POST" "$BASE/api/fleet" $cf $gifPath $glbPath
Assert "POST /api/fleet -> 200"            200  $r4.Code  $r4.Body
$p4 = $r4.Body | ConvertFrom-Json
$fleetId = $p4.id
Assert "Response.id > 0"                   $true ($fleetId -gt 0)               $r4.Body
Assert "Response.message = created"        $true ($p4.message -like "*created*") $r4.Body
Write-Host "         created fleet id: $fleetId" -ForegroundColor DarkGray

# STEP 5 - GET ALL after create
Write-Host ""
Write-Host "STEP 5  GET ALL after create" -ForegroundColor Yellow
$r5 = Invoke-RestMethod "$BASE/api/fleet" -Method GET
Assert "Array has >= 1 fleet" $true (@($r5).Count -ge 1)
Write-Host "         fleet count after: $(@($r5).Count)" -ForegroundColor DarkGray

# STEP 6 - GET BY ID
Write-Host ""
Write-Host "STEP 6  GET BY ID (GET /api/fleet/$fleetId)" -ForegroundColor Yellow
$r6 = Invoke-RestMethod "$BASE/api/fleet/$fleetId" -Method GET
Assert "id matches"                  $fleetId                  $r6.id
Assert "nameEn matches"              "Merkwave Vessel Alpha"   $r6.nameEn
Assert "imageUrl not empty"          $true                     ($r6.imageUrl.Length -gt 0)
Assert "model3DUrl not empty"        $true                     ($r6.model3DUrl.Length -gt 0)
Assert "features count = 3"          3                         (@($r6.features).Count)
$feat0 = @($r6.features)[0]
Assert "feature[0].titleEn present"  $true                     ($feat0.titleEn.Length -gt 0)
Assert "feature[0].id > 0"           $true                     ($feat0.id -gt 0)
Write-Host "         imageUrl:   $($r6.imageUrl)" -ForegroundColor DarkGray
Write-Host "         model3DUrl: $($r6.model3DUrl)" -ForegroundColor DarkGray
$origImg = $r6.imageUrl
$origMdl = $r6.model3DUrl

# STEP 7 - UPDATE text only (no new files)
Write-Host ""
Write-Host "STEP 7  UPDATE text-only, no new files (PUT /api/fleet/$fleetId)" -ForegroundColor Yellow
$uf = [ordered]@{
  NameEn                      = "Merkwave Vessel Alpha UPDATED"
  NameAr                      = "Markwave Vessel Alpha Updated AR"
  DescriptionEn               = "Updated description after refit"
  DescriptionAr               = "Updated description arabic placeholder"
  DetailedDescriptionEn       = "Now supports crew of 60 after refit"
  DetailedDescriptionAr       = "Detailed updated arabic placeholder"
  "Features[0].TitleEn"       = "Dynamic Positioning DP3"
  "Features[0].TitleAr"       = "Dynamic Positioning DP3 AR"
  "Features[0].DescriptionEn" = "Upgraded to DP3 class"
  "Features[0].DescriptionAr" = "Updated feature arabic placeholder"
}
$r7 = Send-Multipart "PUT" "$BASE/api/fleet/$fleetId" $uf
Assert "PUT -> 200"                             200  $r7.Code  $r7.Body
$p7 = $r7.Body | ConvertFrom-Json
Assert "Response.message = updated"             $true ($p7.message -like "*updated*")

$r7v = Invoke-RestMethod "$BASE/api/fleet/$fleetId" -Method GET
Assert "nameEn reflects update"                 "Merkwave Vessel Alpha UPDATED" $r7v.nameEn
Assert "imageUrl preserved (no new file)"       $origImg  $r7v.imageUrl
Assert "model3DUrl preserved (no new file)"     $origMdl  $r7v.model3DUrl
Assert "features replaced - now 1 feature"      1         (@($r7v.features).Count)

# STEP 8 - UPDATE 404
Write-Host ""
Write-Host "STEP 8  UPDATE non-existent (PUT /api/fleet/999999)" -ForegroundColor Yellow
$r8 = Send-Multipart "PUT" "$BASE/api/fleet/999999" $uf
Assert "PUT /api/fleet/999999 -> 404" 404 $r8.Code

# STEP 9 - UPDATE with new image + new 3D model
Write-Host ""
Write-Host "STEP 9  UPDATE with new image + new 3D model (PUT /api/fleet/$fleetId)" -ForegroundColor Yellow
$png2 = "$env:TEMP\fleet_test2.png"
$glb2 = "$env:TEMP\fleet_test2.glb"
[IO.File]::WriteAllBytes($png2, [byte[]](
    0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52,
    0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53,
    0xDE, 0x00, 0x00, 0x00, 0x0C, 0x49, 0x44, 0x41, 0x54, 0x08, 0xD7, 0x63, 0xF8, 0xFF, 0xFF, 0x00,
    0x05, 0xFE, 0x02, 0xFE, 0xA4, 0x35, 0x81, 0x84, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44,
    0xAE, 0x42, 0x60, 0x82))
[IO.File]::WriteAllBytes($glb2, [byte[]](0x67, 0x6C, 0x54, 0x46, 0x02, 0x00, 0x00, 0x00, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01))

$nf = [ordered]@{
  NameEn                      = "Merkwave Vessel Alpha New Media"
  NameAr                      = "Markwave Vessel Alpha New Media AR"
  DescriptionEn               = "Refreshed media assets version 2"
  DescriptionAr               = "Refreshed media arabic placeholder"
  DetailedDescriptionEn       = "Same vessel with new image and 3D model files"
  DetailedDescriptionAr       = "Detailed arabic placeholder v2"
  "Features[0].TitleEn"       = "New Feature After File Update"
  "Features[0].TitleAr"       = "New Feature AR"
  "Features[0].DescriptionEn" = "Verified new file upload path works"
  "Features[0].DescriptionAr" = "Feature description arabic placeholder"
}
$r9 = Send-Multipart "PUT" "$BASE/api/fleet/$fleetId" $nf $png2 $glb2
Assert "PUT with new files -> 200" 200 $r9.Code $r9.Body

$r9v = Invoke-RestMethod "$BASE/api/fleet/$fleetId" -Method GET
Assert "imageUrl changed to new file"   $true ($r9v.imageUrl -ne $origImg -and $r9v.imageUrl.Length -gt 0)
Assert "model3DUrl changed to new file" $true ($r9v.model3DUrl -ne $origMdl -and $r9v.model3DUrl.Length -gt 0)
Write-Host "         new imageUrl:   $($r9v.imageUrl)" -ForegroundColor DarkGray
Write-Host "         new model3DUrl: $($r9v.model3DUrl)" -ForegroundColor DarkGray

$wwwRoot = "d:\dec 2025\merkwave_Website\backend\backend\wwwroot"
Assert "Old image deleted from disk" $false (Test-Path (Join-Path $wwwRoot $origImg.TrimStart("/")))
Assert "Old 3D model deleted from disk" $false (Test-Path (Join-Path $wwwRoot $origMdl.TrimStart("/")))

# STEP 10 - DELETE
Write-Host ""
Write-Host "STEP 10 DELETE (DELETE /api/fleet/$fleetId)" -ForegroundColor Yellow
$authHdr = @{ Authorization = "Bearer $script:token" }
try {
  $r10 = Invoke-RestMethod "$BASE/api/fleet/$fleetId" -Method DELETE -Headers $authHdr
  Assert "DELETE -> 200 with message" $true ($r10.message -like "*deleted*")
}
catch {
  Assert "DELETE -> 200" 200 ([int]$_.Exception.Response.StatusCode)
}

Start-Sleep -Milliseconds 300
try {
  Invoke-RestMethod "$BASE/api/fleet/$fleetId" -Method GET | Out-Null
  Assert "Deleted fleet GET -> 404" 404 200
}
catch [System.Net.WebException] {
  Assert "Deleted fleet GET -> 404" 404 ([int]$_.Exception.Response.StatusCode)
}

Assert "New image deleted from disk after DELETE"    $false (Test-Path (Join-Path $wwwRoot $r9v.imageUrl.TrimStart("/")))
Assert "New 3D model deleted from disk after DELETE" $false (Test-Path (Join-Path $wwwRoot $r9v.model3DUrl.TrimStart("/")))

# STEP 11 - DELETE 404
Write-Host ""
Write-Host "STEP 11 DELETE non-existent (DELETE /api/fleet/999999)" -ForegroundColor Yellow
try {
  Invoke-RestMethod "$BASE/api/fleet/999999" -Method DELETE -Headers $authHdr | Out-Null
  Assert "DELETE 999999 -> 404" 404 200
}
catch [System.Net.WebException] {
  Assert "DELETE 999999 -> 404" 404 ([int]$_.Exception.Response.StatusCode)
}

# SUMMARY
$total = $pass + $fail
Write-Host ""
Write-Host "===========================================" -ForegroundColor Cyan
$color = if ($fail -eq 0) { "Green" } else { "Yellow" }
Write-Host ("   RESULTS: {0}/{1} passed" -f $pass, $total) -ForegroundColor $color
if ($fail -gt 0) { Write-Host ("   FAILURES: {0}" -f $fail) -ForegroundColor Red }
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""
