using BusinessLogiclayer.Dtos;
using BusinessLogiclayer.ServicesContracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller
{
  [ApiController]
  [Route("api/[controller]")]
  public class OdooModulesController : ControllerBase
  {
    private readonly IOdooModuleService _service;

    public OdooModulesController(IOdooModuleService service)
    {
      _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
      var modules = await _service.GetAllAsync();
      return Ok(modules);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
      var module = await _service.GetByIdAsync(id);
      if (module == null)
        return NotFound();
      return Ok(module);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromForm] CreateUpdateOdooModuleDto dto)
    {
      var result = await _service.CreateAsync(dto);
      if (result != null)
        return Ok("Odoo module created successfully.");
      return BadRequest("Failed to create odoo module.");
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> Update(int id, [FromForm] CreateUpdateOdooModuleDto dto)
    {
      var result = await _service.UpdateAsync(id, dto);
      if (result == null)
        return NotFound();
      return Ok(result);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete(int id)
    {
      var result = await _service.DeleteAsync(id);
      if (result == null)
        return NotFound();
      return Ok(result);
    }
  }
}
