using BusinessLogiclayer.Dtos;
using BusinessLogiclayer.ServicesContracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/blogs")]
    public class BlogsController : ControllerBase
    {
        private readonly IBlogService _blogService;

        public BlogsController(IBlogService blogService)
        {
            _blogService = blogService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _blogService.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var blog = await _blogService.GetByIdAsync(id);
            if (blog == null)
                return NotFound();

            return Ok(blog);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromForm] CreateUpdateBlogDto dto)
        {
            var result = await _blogService.CreateAsync(dto);
            if (result == null)
                return BadRequest();

            return Ok(result);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, [FromForm] CreateUpdateBlogDto dto)
        {
            var result = await _blogService.UpdateAsync(id, dto);
            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _blogService.DeleteAsync(id);
            if (result == null)
                return NotFound();

            return Ok(result);
        }
    }
}
