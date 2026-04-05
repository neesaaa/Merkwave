param($BASE = "http://localhost:5070")

Add-Type -AssemblyName System.Net.Http

Write-Host ""
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "   MERKWAVE FLEET  -  DATA SEEDER         " -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""

# Login
$loginBody = '{"UserName":"testadmin","Password":"FleetTest@1"}'
$lr = Invoke-RestMethod "$BASE/api/auth/login" -Method POST -ContentType "application/json" -Body $loginBody
$token = $lr.token
if (-not $token) { Write-Host "LOGIN FAILED" -ForegroundColor Red; exit 1 }
Write-Host "Logged in OK" -ForegroundColor Green

$glbDir = "d:\dec 2025\merkwave_Website\frontend\merkwave"
$vessels = Get-Content "d:\dec 2025\merkwave_Website\fleet-data.json" -Raw | ConvertFrom-Json

function Post-Fleet($v, $imgPath) {
    $hc   = [System.Net.Http.HttpClient]::new()
    $form = [System.Net.Http.MultipartFormDataContent]::new()

    $fields = @{
        NameEn = $v.nameEn; NameAr = $v.nameAr
        DescriptionEn = $v.descEn; DescriptionAr = $v.descAr
        DetailedDescriptionEn = $v.detailEn; DetailedDescriptionAr = $v.detailAr
    }
    foreach ($kv in $fields.GetEnumerator()) {
        $sc = [System.Net.Http.StringContent]::new($kv.Value, [System.Text.Encoding]::UTF8)
        $form.Add($sc, $kv.Key)
    }
    $fi = 0
    foreach ($feat in $v.features) {
        foreach ($prop in @(
            @("TitleEn", $feat.titleEn), @("TitleAr", $feat.titleAr),
            @("DescriptionEn", $feat.descEn), @("DescriptionAr", $feat.descAr)
        )) {
            $sc = [System.Net.Http.StringContent]::new($prop[1], [System.Text.Encoding]::UTF8)
            $form.Add($sc, "Features[$fi].$($prop[0])")
        }
        $fi++
    }

    $imgBytes = [System.Net.Http.ByteArrayContent]::new([System.IO.File]::ReadAllBytes($imgPath))
    $imgBytes.Headers.ContentType = [System.Net.Http.Headers.MediaTypeHeaderValue]::new("image/jpeg")
    $form.Add($imgBytes, "Image", [System.IO.Path]::GetFileName($imgPath))

    $mdlPath = "$glbDir\$($v.model)"
    $mdlBytes = [System.Net.Http.ByteArrayContent]::new([System.IO.File]::ReadAllBytes($mdlPath))
    $mdlBytes.Headers.ContentType = [System.Net.Http.Headers.MediaTypeHeaderValue]::new("model/gltf-binary")
    $form.Add($mdlBytes, "Model3D", $v.model)

    $req = [System.Net.Http.HttpRequestMessage]::new([System.Net.Http.HttpMethod]::Post, [Uri]"$BASE/api/fleet")
    $req.Headers.Authorization = [System.Net.Http.Headers.AuthenticationHeaderValue]::new("Bearer", $token)
    $req.Content = $form
    $resp = $hc.SendAsync($req).Result
    $body = $resp.Content.ReadAsStringAsync().Result
    $hc.Dispose()
    return @{ Code = [int]$resp.StatusCode; Body = $body }
}

$created = @()
foreach ($v in $vessels) {
    Write-Host ""
    Write-Host "Creating: $($v.nameEn)" -ForegroundColor Yellow

    $imgPath = [System.IO.Path]::Combine($env:TEMP, "fleet_$(New-Guid).jpg")
    Write-Host "  Downloading image..." -NoNewline
    try {
        $resp = Invoke-WebRequest $v.img -TimeoutSec 30 -UseBasicParsing
        [System.IO.File]::WriteAllBytes($imgPath, $resp.Content)
        Write-Host " OK ($([math]::Round($resp.Content.Length/1024))KB)" -ForegroundColor Green
    } catch {
        Write-Host " FAILED. Skipping." -ForegroundColor Red
        continue
    }

    $mdlPath = "$glbDir\$($v.model)"
    if (-not (Test-Path $mdlPath)) {
        Write-Host "  [SKIP] model not found: $mdlPath" -ForegroundColor Red
        Remove-Item $imgPath -ErrorAction SilentlyContinue
        continue
    }
    Write-Host "  model: $($v.model) ($([math]::Round((Get-Item $mdlPath).Length/1024))KB)" -ForegroundColor DarkGray

    $r = Post-Fleet $v $imgPath
    Remove-Item $imgPath -ErrorAction SilentlyContinue

    if ($r.Code -eq 200 -or $r.Code -eq 201) {
        $p = $r.Body | ConvertFrom-Json
        Write-Host "  [OK] id=$($p.id)" -ForegroundColor Green
        $created += [pscustomobject]@{ Id = $p.id; Name = $v.nameEn }
    } else {
        Write-Host "  [FAIL] HTTP $($r.Code): $($r.Body.Substring(0,[math]::Min(300,$r.Body.Length)))" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "   DONE: $($created.Count)/$($vessels.Count) vessels seeded" -ForegroundColor $(if ($created.Count -eq $vessels.Count) { "Green" } else { "Yellow"})
$created | ForEach-Object { Write-Host "   id=$($_.Id)  $($_.Name)" -ForegroundColor White }
Write-Host "===========================================" -ForegroundColor Cyan