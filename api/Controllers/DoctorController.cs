using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data; 
using api.Models;
using System.Security.Claims;
using api.Dtos.Doctor;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DoctorController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public DoctorController(ApplicationDBContext context)
        {
            _context = context;
        }

        
        [HttpGet("my-schedule")]
        public async Task<IActionResult> GetMySchedule()
        {
            
            var doctorId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            
            if (string.IsNullOrEmpty(doctorId)) return Unauthorized();

            var schedule = await _context.Availabilities
                .Where(a => a.DoctorId == doctorId)
                .OrderBy(a => a.StartTime)
                .Select(a => new DoctorAvailabilityDto 
                { 
                    StartTime = a.StartTime, 
                    EndTime = a.EndTime 
                })
                .ToListAsync();

            return Ok(schedule);
        }

        
        [HttpPost("update-schedule")]
        public async Task<IActionResult> UpdateSchedule([FromBody] List<DoctorAvailabilityDto> dtos)
        {
            var doctorId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            
            if (string.IsNullOrEmpty(doctorId)) return Unauthorized();

            var oldSlots = _context.Availabilities.Where(a => a.DoctorId == doctorId);
            _context.Availabilities.RemoveRange(oldSlots);

            var newSlots = dtos.Select(d => new DoctorAvailability
            {
                DoctorId = doctorId,
                StartTime = d.StartTime,
                EndTime = d.EndTime
            }).ToList();

            await _context.Availabilities.AddRangeAsync(newSlots);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Grafik został zaktualizowany" });
        }
    }
}