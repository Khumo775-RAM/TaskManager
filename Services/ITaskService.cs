using TaskManagerAPI.DTOs;

namespace TaskManagerAPI.Services
{
    public interface ITaskService
    {
        Task<List<TaskResponseDto>> GetAll(int userId);
        Task<TaskResponseDto?> GetById(int id, int userId);
        Task<TaskResponseDto> Create(CreateTaskDto dto, int userId);
        Task<TaskResponseDto?> Update(int id, CreateTaskDto dto, int userId);
        Task<bool> Delete(int id, int userId);
    }
}
