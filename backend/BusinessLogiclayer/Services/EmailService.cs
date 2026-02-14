using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogiclayer.Services
{
    public class EmailService
    {
        private readonly IConfiguration _config;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IConfiguration config, ILogger<EmailService> logger)
        {
            _config = config;
            _logger = logger;
        }

        public async Task SendAsync(string to, string subject, string body)
        {
            var sender = _config["Email:Address"]
                ?? throw new InvalidOperationException("Email:Address is not configured in appsettings.");
            var password = _config["Email:Password"]
                ?? throw new InvalidOperationException("Email:Password is not configured in appsettings.");

            _logger.LogInformation("Attempting to send email from {Sender} to {To} with subject '{Subject}'", sender, to, subject);

            try
            {
                using var client = new SmtpClient("smtp.titan.email", 587)
                {
                    EnableSsl = true,
                    Credentials = new NetworkCredential(sender, password),
                    Timeout = 30000 
                };

                var mail = new MailMessage
                {
                    From = new MailAddress(sender),
                    Subject = subject,
                    Body = body
                };

                mail.To.Add(to);

                await client.SendMailAsync(mail);
                _logger.LogInformation("Email sent successfully to {To}", to);
            }
            catch (SmtpException ex)
            {
                _logger.LogError(ex, "SMTP error sending email to {To}. StatusCode: {StatusCode}", to, ex.StatusCode);
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error sending email to {To}", to);
                throw;
            }
        }
    }
}
