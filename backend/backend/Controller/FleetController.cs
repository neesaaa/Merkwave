using BusinessLogiclayer.Dtos;
using BusinessLogiclayer.ServicesContracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller
{
  [ApiController]
  [Route("api/[controller]")]
  public class FleetController : ControllerBase
  {
    private readonly IFleetService _fleetService;

    public FleetController(IFleetService fleetService)
    {
      _fleetService = fleetService;
    }

    // GET api/fleet
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
      var fleets = await _fleetService.GetAllAsync();
      return Ok(fleets);
    }

    // GET api/fleet/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
      var fleet = await _fleetService.GetByIdAsync(id);
      if (fleet == null)
        return NotFound();
      return Ok(fleet);
    }

    // POST api/fleet  (multipart/form-data — image + 3d model + fields)
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromForm] CreateFleetDto dto)
    {
      var result = await _fleetService.CreateAsync(dto);
      if (result == null)
        return BadRequest("Failed to create fleet.");
      return Ok(new { id = result, message = "Fleet created successfully." });
    }

    // PUT api/fleet/5  (multipart/form-data — files are optional on edit)
    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> Update(int id, [FromForm] EditFleetDto dto)
    {
      var result = await _fleetService.UpdateAsync(id, dto);
      if (result == null)
        return NotFound();
      return Ok(new { message = "Fleet updated successfully." });
    }

    // DELETE api/fleet/5
    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete(int id)
    {
      var result = await _fleetService.DeleteAsync(id);
      if (result == null)
        return NotFound();
      return Ok(new { message = "Fleet deleted successfully." });
    }
  }
}
