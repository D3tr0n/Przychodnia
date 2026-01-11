using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;


[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AppointmentsController : ControllerBase
{
    private readonly AppDbContext _db;

    public AppointmentsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<List<Appointment>> GetAll()
    {
        return await _db.Appointments
            .Include(a => a.Patient)
            .Include(a => a.Doctor)
            .ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Appointment>> Create(Appointment appointment)
    {
        appointment.Date = DateTime.SpecifyKind(appointment.Date, DateTimeKind.Utc);
        _db.Appointments.Add(appointment);
        await _db.SaveChangesAsync();
        return Ok(appointment);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var appt = await _db.Appointments.FindAsync(id);
        if (appt == null) return NotFound();

        _db.Appointments.Remove(appt);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
