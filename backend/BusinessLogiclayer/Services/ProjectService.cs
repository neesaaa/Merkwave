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
    public class ProjectService : IProjectService
    {
        private readonly IGenericRepo<Project> _repo;
        private readonly IMapper _mapper;
        private readonly FileService _fileService;
        public ProjectService(IGenericRepo<Project> repo, IMapper _mapper, FileService fileService)
        {
            _repo = repo;
            this._mapper = _mapper;
            _fileService = fileService;
        }
        public async Task<int?> CreateAsync(CreateUpdateDto dto)
        {
            if (dto == null) throw new ArgumentNullException(nameof(dto));
            Project project = _mapper.Map<CreateUpdateDto, Project>(dto);
            if (dto.Image != null)
            {
                project.ImageUrl = await _fileService.SaveImageAsync(dto.Image, "projects");
            }
            int rows = await _repo.AddAsync(project);
            if (rows == 0)
            {
                return null;
            }

            return rows;
        }

        public async Task<int?> DeleteAsync(int id)
        {
            var project = await _repo.GetByIdAsync(id)
              ?? throw new InvalidOperationException($"Project with id {id} not found.");

            await _fileService.DeleteImageAsync(project.ImageUrl, "projects");

            var rows = await _repo.RemoveAsync(id);
            if (rows == 0)
                return null;
            return rows;

        }

        public async Task<IEnumerable<ProjectDto>> GetAllAsync()
        {
            IEnumerable<Project> projects = await _repo.GetAllAsync();
            return _mapper.Map<IEnumerable<ProjectDto>>(projects);
        }

        public async Task<ProjectDto?> GetByIdAsync(int id)
        {
            Project? project = await _repo.GetByIdAsync(id);
            if (project == null)
            {
                return null;
            }

            return _mapper.Map<ProjectDto>(project);


        }

        public async Task<int?> UpdateAsync(int id, CreateUpdateDto dto)
        {
            var project = await _repo.GetByIdAsync(id);
            if (project == null) return null;

            // Save old image URL BEFORE mapper runs
            var oldImageUrl = project.ImageUrl;
            Console.WriteLine($"[ProjectService] Updating project {id}, old ImageUrl: '{oldImageUrl}'");

            _mapper.Map(dto, project);

            Console.WriteLine($"[ProjectService] After mapper, ImageUrl: '{project.ImageUrl}', has new image: {dto.Image != null}");

            if (dto.Image != null)
            {
                // Use the saved old URL for deletion (defensive)
                await _fileService.DeleteImageAsync(oldImageUrl, "projects");
                project.ImageUrl = await _fileService.SaveImageAsync(dto.Image, "projects");
                Console.WriteLine($"[ProjectService] New ImageUrl: '{project.ImageUrl}'");
            }

            try
            {
                var rows = await _repo.UpdateAsync(project);
                Console.WriteLine($"[ProjectService] Update completed, rows affected: {rows}");
                return rows == 0 ? null : rows;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[ProjectService] ERROR during UpdateAsync: {ex.GetType().Name}: {ex.Message}");
                Console.WriteLine(ex.StackTrace);
                throw;
            }
        }
    }
}
