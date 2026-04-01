using TaskManagerAPI.Models;

namespace TaskManagerAPI.DTOs
{
    public class CreateTaskDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime? DueDate { get; set; }
        public Priority Priority { get; set; } = Priority.Low;
        public bool IsCompleted { get; set; }
    }
}
