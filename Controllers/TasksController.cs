using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskManagerAPI.DTOs;
using TaskManagerAPI.Services;

namespace TaskManagerAPI.Controllers
{
    [ApiController]
    [Route("api/tasks")]
    [Authorize]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;
        
        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        private int GetUserId()
        {
            return int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        }

        [HttpGet]      
        public async Task<IActionResult> GetAll()
        {
            var tasks = await _taskService.GetAll(GetUserId());
            return Ok(tasks);
        }  

        [HttpGet("{id}")]      
        public async Task<IActionResult> GetById(int id)
        {
            var task = await _taskService.GetById(id, GetUserId());
            if(task == null) return NotFound();
            return Ok(task);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateTaskDto dto)
        {
            var task = await _taskService.Create(dto, GetUserId());
            return CreatedAtAction(nameof(GetById), new { id = task.Id }, task);
        }     

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, CreateTaskDto dto)
        {
            var task = await _taskService.Update(id, dto, GetUserId());
            if(task == null) return NotFound();
            return Ok(task);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _taskService.Delete(id, GetUserId());
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
