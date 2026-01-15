using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using System.Security.Claims;

[Route("api/appointment")]
[ApiController]
[Authorize]
public class AppointmentController : ControllerBase
{
    private readonly ApplicationDBContext _context;

    public AppointmentController(ApplicationDBContext context)
    {
        _context = context;
    }

    [HttpGet("my-appointments")]
    public async Task<IActionResult> GetMyAppointments()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var role = User.FindFirstValue(ClaimTypes.Role);

        var query = _context.Appointments.AsQueryable();

        if (role == "Doctor") {
            query = query.Where(a => a.DoctorId == userId);
        } else {
            query = query.Where(a => a.PatientId == userId);
        }

        var result = await query
            .Select(a => new {
                a.Id,
                a.Date,
                a.Time,
                a.Status,
                PatientFirstName = _context.Patients.Where(p => p.AccountId == a.PatientId).Select(p => p.FirstName).FirstOrDefault(),
                PatientLastName = _context.Patients.Where(p => p.AccountId == a.PatientId).Select(p => p.LastName).FirstOrDefault(),
                DoctorFirstName = _context.Doctors.Where(d => d.AccountId == a.DoctorId).Select(d => d.FirstName).FirstOrDefault(),
                DoctorLastName = _context.Doctors.Where(d => d.AccountId == a.DoctorId).Select(d => d.LastName).FirstOrDefault(),
            })
            .ToListAsync();

        return Ok(result);
    }

    [HttpPost("update-status")]
    public async Task<IActionResult> UpdateStatus([FromBody] UpdateStatusDto dto)
    {
        var appointment = await _context.Appointments.FindAsync(dto.AppointmentId);
        if (appointment == null) return NotFound();

        appointment.Status = dto.Status;
        await _context.SaveChangesAsync();
        return Ok();
    }
}

public class UpdateStatusDto {
    public int AppointmentId { get; set; }
    public string Status { get; set; }
}