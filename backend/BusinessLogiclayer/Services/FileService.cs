using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogiclayer.Services
{
    public class FileService
    {
        private readonly IWebHostEnvironment _env;
        public FileService(IWebHostEnvironment env)
        {
            _env = env;
        }
        public async Task<string> SaveImageAsync(IFormFile file, string folderName)
        {
            try
            {
                var rootFolder = Path.Combine(_env.WebRootPath, folderName);

                if (!Directory.Exists(rootFolder))
                    Directory.CreateDirectory(rootFolder);

                var extension = Path.GetExtension(file.FileName);
                var uniqueName = $"{Guid.NewGuid()}{extension}";
                var filePath = Path.Combine(rootFolder, uniqueName);

                Console.WriteLine($"[FileService] Saving image to: {filePath}");
                Console.WriteLine($"[FileService] File size: {file.Length} bytes, FileName: {file.FileName}");

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                    await stream.FlushAsync();
                }

                Console.WriteLine($"[FileService] Image saved successfully: /{folderName}/{uniqueName}");
                return $"/{folderName}/{uniqueName}";
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[FileService] ERROR saving image: {ex.GetType().Name}: {ex.Message}");
                Console.WriteLine(ex.StackTrace);
                throw;
            }
        }

        public async Task DeleteImageAsync(string imageUrl, string folderName)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(imageUrl))
                {
                    Console.WriteLine($"[FileService] No image to delete (imageUrl is empty)");
                    return;
                }

                var fileName = Path.GetFileName(imageUrl);
                var filePath = Path.Combine(_env.WebRootPath, folderName, fileName);

                Console.WriteLine($"[FileService] Attempting to delete: {filePath}");

                if (File.Exists(filePath))
                {
                    await Task.Run(() => File.Delete(filePath));
                    Console.WriteLine($"[FileService] Deleted: {filePath}");
                }
                else
                {
                    Console.WriteLine($"[FileService] File not found (skipping): {filePath}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[FileService] ERROR deleting image: {ex.GetType().Name}: {ex.Message}");
                Console.WriteLine(ex.StackTrace);
                // Don't rethrow — failing to delete the old image shouldn't block the update
            }
        }
    }
}
