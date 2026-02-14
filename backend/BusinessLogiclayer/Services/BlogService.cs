using AutoMapper;
using BusinessLogiclayer.Dtos;
using BusinessLogiclayer.Entities;
using BusinessLogiclayer.RepoContracts;
using BusinessLogiclayer.ServicesContracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogiclayer.Services
{
    public class BlogService : IBlogService
    {
        private readonly IGenericRepo<Blog> _repo;
        private readonly IMapper _mapper;
        private readonly FileService _fileService;

        public BlogService(
            IGenericRepo<Blog> repo,
            IMapper mapper,
            FileService fileService)
        {
            _repo = repo;
            _mapper = mapper;
            _fileService = fileService;
        }
        public async Task<int?> CreateAsync(CreateUpdateBlogDto dto)
        {
            var blog = _mapper.Map<Blog>(dto);

            if (dto.Image != null)
                blog.ImageUrl = await _fileService.SaveImageAsync(dto.Image, "blogs");

            var rows = await _repo.AddAsync(blog);
            return rows == 0 ? null : rows;
        }

        public async Task<int?> DeleteAsync(int id)
        {
            var blog = await _repo.GetByIdAsync(id);
            if (blog == null) return null;

            await _fileService.DeleteImageAsync(blog.ImageUrl, "blogs");

            var rows = await _repo.RemoveAsync(id);
            return rows == 0 ? null : rows;
        }

        public async Task<IEnumerable<BlogDto>> GetAllAsync()
        {
            var blogs = await _repo.GetAllAsync();
            return _mapper.Map<IEnumerable<BlogDto>>(blogs);
        }

        public async Task<BlogDetailedDto?> GetByIdAsync(int id)
        {
            var blog = await _repo.GetByIdAsync(id);
            return blog == null ? null : _mapper.Map<BlogDetailedDto>(blog);
        }

        public async Task<int?> UpdateAsync(int id, CreateUpdateBlogDto dto)
        {
            var blog = await _repo.GetByIdAsync(id);
            if (blog == null) return null;

            // Save old image URL BEFORE mapper runs
            var oldImageUrl = blog.ImageUrl;
            Console.WriteLine($"[BlogService] Updating blog {id}, old ImageUrl: '{oldImageUrl}'");

            _mapper.Map(dto, blog);

            Console.WriteLine($"[BlogService] After mapper, ImageUrl: '{blog.ImageUrl}', has new image: {dto.Image != null}");

            if (dto.Image != null)
            {
                // Use the saved old URL for deletion (defensive)
                await _fileService.DeleteImageAsync(oldImageUrl, "blogs");
                blog.ImageUrl = await _fileService.SaveImageAsync(dto.Image, "blogs");
                Console.WriteLine($"[BlogService] New ImageUrl: '{blog.ImageUrl}'");
            }

            try
            {
                var rows = await _repo.UpdateAsync(blog);
                Console.WriteLine($"[BlogService] Update completed, rows affected: {rows}");
                return rows == 0 ? null : rows;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[BlogService] ERROR during UpdateAsync: {ex.GetType().Name}: {ex.Message}");
                Console.WriteLine(ex.StackTrace);
                throw;
            }
        }
    }
}
