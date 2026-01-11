using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

[Authorize]
[ApiController]
[Route("api/[controller]")]

public class DoctorsController : ControllerBase
{
    private readonly AppDbContext _db;

    public DoctorsController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Doctor>>> Get() =>
        await _db.Doctors.ToListAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<Doctor>> Get(int id)
    {
        var doctor = await _db.Doctors.FindAsync(id);
        if (doctor == null) return NotFound();
        return doctor;
    }

    [HttpPost]
    public async Task<ActionResult<Doctor>> Post(Doctor doctor)
    {
        _db.Doctors.Add(doctor);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = doctor.Id }, doctor);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, Doctor doctor)
    {
        if (id != doctor.Id) return BadRequest();
        _db.Entry(doctor).State = EntityState.Modified;
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var doctor = await _db.Doctors.FindAsync(id);
        if (doctor == null) return NotFound();
        _db.Doctors.Remove(doctor);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}