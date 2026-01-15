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
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub") ?? User.FindFirstValue("nameid");
        var role = User.FindFirstValue(ClaimTypes.Role) ?? User.FindFirstValue("role");

        Console.WriteLine($"---> API Request: User={userId}, Role={role}");

        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized("Nie udało się rozpoznać użytkownika z tokena.");
        }

        var query = _context.Appointments.AsQueryable();

        if (string.Equals(role, "Doctor", StringComparison.OrdinalIgnoreCase))
        {
            query = query.Where(a => a.DoctorId == userId);
        }
        else
        {
            query = query.Where(a => a.PatientId == userId);
        }

        var result = await query
            .Select(a => new {
                a.Id,
                a.Date,
                a.Time,
                a.Status,
                PatientFirstName = _context.Patients.Where(p => p.AccountId == a.PatientId).Select(p => p.FirstName).FirstOrDefault() ?? "Nieznany",
                PatientLastName = _context.Patients.Where(p => p.AccountId == a.PatientId).Select(p => p.LastName).FirstOrDefault() ?? "Pacjent",
                
                DoctorFirstName = _context.Doctors.Where(d => d.AccountId == a.DoctorId).Select(d => d.FirstName).FirstOrDefault() ?? "Lekarz",
                DoctorLastName = _context.Doctors.Where(d => d.AccountId == a.DoctorId).Select(d => d.LastName).FirstOrDefault() ?? "",
                DoctorSpecialization = _context.Doctors.Where(d => d.AccountId == a.DoctorId).Select(d => d.Specialization).FirstOrDefault() ?? "Brak specjalizacji"
            })
            .ToListAsync();

        return Ok(result);
    }

    [HttpPost("update-status")]
    public async Task<IActionResult> UpdateStatus([FromBody] UpdateStatusDto dto)
    {
        var appointment = await _context.Appointments.FindAsync(dto.AppointmentId);
        if (appointment == null) return NotFound("Nie znaleziono wizyty.");

        if (string.Equals(dto.Status, "Odwołana", StringComparison.OrdinalIgnoreCase))
        {
            _context.Appointments.Remove(appointment);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Wizyta została odwołana i usunięta. Termin jest wolny." });
        }

        appointment.Status = dto.Status;
        await _context.SaveChangesAsync();
        return Ok(new { message = "Status zaktualizowany pomyślnie" });
    }
}

public class UpdateStatusDto {
    public int AppointmentId { get; set; }
    public string Status { get; set; }
}