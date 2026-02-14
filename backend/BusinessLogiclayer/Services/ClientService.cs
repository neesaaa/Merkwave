using AutoMapper;
using BusinessLogiclayer.Dtos;
using BusinessLogiclayer.Entities;
using BusinessLogiclayer.RepoContracts;
using BusinessLogiclayer.ServicesContracts;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogiclayer.Services
{
    internal class ClientService : IClientService
    {
        private readonly IGenericRepo<Client> _repo;
        private readonly IMapper _mapper;
        private readonly EmailService _emailService;
        private readonly ILogger<ClientService> _logger;

        public ClientService(
            IGenericRepo<Client> repo,
            IMapper mapper,
            EmailService emailService,
            ILogger<ClientService> logger)
        {
            _repo = repo;
            _mapper = mapper;
            _emailService = emailService;
            _logger = logger;
        }

        public async Task<bool> SendEmailAndSaveAsync(ClientDto dto)
        {
            Client client = _mapper.Map<Client>(dto);
            int rows = await _repo.AddAsync(client);
            if (rows == 0)
            {
                _logger.LogWarning("Failed to save client record for {Email}", dto.Email);
                return false;
            }

            _logger.LogInformation("Client record saved. Attempting to send email for {Email}", dto.Email);

            var body = $"""
                        Name: {dto.Name}
                        Email: {dto.Email}
                        Phone: {dto.Phone}

                        Message:
                        {dto.Message}
                        """;

            try
            {
                await _emailService.SendAsync(
                    "nassar@merkwave.com",
                    dto.Subject,
                    body);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Email sending failed for client {Email}, but client record was saved.", dto.Email);
                // Data is saved, email failed — return true so the user knows the message was received
                // but log the error so you can investigate
                return true;
            }
        }

        public async Task<IEnumerable<ClientDto>> GetAllAsync()
        {
            var clients = await _repo.GetAllAsync();
            return _mapper.Map<IEnumerable<ClientDto>>(clients);
        }
    }
}
