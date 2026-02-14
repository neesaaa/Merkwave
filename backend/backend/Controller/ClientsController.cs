using BusinessLogiclayer.Dtos;
using BusinessLogiclayer.ServicesContracts;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientsController : ControllerBase
    {
        private readonly IClientService _service;
        private readonly ILogger<ClientsController> _logger;

        public ClientsController(IClientService service, ILogger<ClientsController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var clients = await _service.GetAllAsync();
            return Ok(clients);
        }

        [HttpPost("contact")]
        public async Task<IActionResult> SendMail([FromBody] ClientDto dto)
        {
            try
            {
                var res = await _service.SendEmailAndSaveAsync(dto);

                if (!res)
                    return BadRequest(new { message = "Failed to save client data" });

                return Ok(new { message = "Message sent successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in SendMail endpoint");
                return StatusCode(500, new { message = "An error occurred while processing your request", error = ex.Message });
            }
        }
    }
}
