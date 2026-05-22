using BusinessLogiclayer.Dtos;
using BusinessLogiclayer.ServicesContracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
  [ApiController]
  [Route("api/testimonials")]
  public class TestimonialsController : ControllerBase
  {
    private readonly ITestimonialService _testimonialService;

    public TestimonialsController(ITestimonialService testimonialService)
    {
      _testimonialService = testimonialService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
      return Ok(await _testimonialService.GetAllAsync());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
      var testimonial = await _testimonialService.GetByIdAsync(id);
      if (testimonial == null)
        return NotFound();

      return Ok(testimonial);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] CreateUpdateTestimonialDto dto)
    {
      var result = await _testimonialService.CreateAsync(dto);
      if (result == null)
        return BadRequest();

      return Ok(result);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> Update(int id, [FromBody] CreateUpdateTestimonialDto dto)
    {
      var result = await _testimonialService.UpdateAsync(id, dto);
      if (result == null)
        return NotFound();

      return Ok(result);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete(int id)
    {
      var result = await _testimonialService.DeleteAsync(id);
      if (result == null)
        return NotFound();

      return Ok(result);
    }
  }
}
