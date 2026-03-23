using TaskManagerAPI.DTOs;

namespace TaskManagerAPI.Services
{
    public interface IAuthService
    {
        Task<AuthResponseDto> Register(RegisterRequestDto dto);
        Task<AuthResponseDto> Login(LoginRequestDto dto);
    }
}
