using Microsoft.EntityFrameworkCore;
using TaskManagerAPI.Data;
using TaskManagerAPI.DTOs;
using TaskManagerAPI.Models;

namespace TaskManagerAPI.Services
{
    public class TaskService : ITaskService
    {
        private readonly AppDbContext _context;

        public TaskService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<TaskResponseDto>> GetAll(int userId)
        {
            return await _context.Tasks
                .Where(t => t.UserId == userId)
                .Select(t => new TaskResponseDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    Priority = t.Priority,
                    DueDate = t.DueDate,
                    IsCompleted = t.IsCompleted,
                    CreatedAt = t.CreatedAt,
                    UserId = t.UserId
                })
                .ToListAsync();
        }

        public async Task<TaskResponseDto?> GetById(int id, int userId)
        {
            return await _context.Tasks
                .Where(t => t.Id == id && t.UserId == userId)
                .Select(t => new TaskResponseDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    Priority = t.Priority,
                    DueDate = t.DueDate,
                    IsCompleted = t.IsCompleted,
                    CreatedAt = t.CreatedAt,
                    UserId = t.UserId
                })
                .FirstOrDefaultAsync();
        }

        public async Task<TaskResponseDto> Create(CreateTaskDto dto, int userId)
        {
            var task = new TaskItem
            {
                Title = dto.Title,
                Description = dto.Description,
                Priority = dto.Priority,
                DueDate = dto.DueDate,
                UserId = userId
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return new TaskResponseDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                Priority = task.Priority,
                DueDate = task.DueDate,
                IsCompleted = task.IsCompleted,
                CreatedAt = task.CreatedAt,
                UserId = task.UserId
            };
        }

        public async Task<TaskResponseDto?> Update(int id, CreateTaskDto dto, int userId)
        {
            var task = await _context.Tasks
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (task == null) return null;

            task.Title = dto.Title;
            task.Description = dto.Description;
            task.Priority = dto.Priority;
            task.DueDate = dto.DueDate;
            task.IsCompleted = dto.IsCompleted;

            await _context.SaveChangesAsync();

            return new TaskResponseDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                Priority = task.Priority,
                DueDate = task.DueDate,
                IsCompleted = task.IsCompleted,
                CreatedAt = task.CreatedAt,
                UserId = task.UserId
            };
        }

        public async Task<bool> Delete(int id, int userId)
        {
            var task = await _context.Tasks
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (task == null) return false;

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}