using BusinessLogiclayer.Dtos;
using BusinessLogiclayer.ServicesContracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
  [ApiController]
  [Route("api/brandlogos")]
  public class BrandLogosController : ControllerBase
  {
    private readonly IBrandLogoService _service;

    public BrandLogosController(IBrandLogoService service)
    {
      _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
      return Ok(await _service.GetAllAsync());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
      var result = await _service.GetByIdAsync(id);
      return result == null ? NotFound() : Ok(result);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromForm] CreateUpdateBrandLogoDto dto)
    {
      var result = await _service.CreateAsync(dto);
      return result == null ? BadRequest() : Ok(result);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> Update(int id, [FromForm] CreateUpdateBrandLogoDto dto)
    {
      var result = await _service.UpdateAsync(id, dto);
      return result == null ? NotFound() : Ok(result);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete(int id)
    {
      var result = await _service.DeleteAsync(id);
      return result == null ? NotFound() : Ok(result);
    }
  }
}
