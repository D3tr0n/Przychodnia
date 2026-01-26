using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Data;
using api.Mappers;
using api.Dtos.Patient;
using api.Dtos.Account;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using api.Models;
using Microsoft.AspNetCore.Authorization;

namespace api.Controllers
{
    [Route("api/patient")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public PatientController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet("by-pesel")]
        public IActionResult GetByPesel([FromQuery] string pesel)
        {
            var patient = _context.Patients
                .Where(p => p.Pesel == pesel)
                .Select(p => new PatientDto
                {
                    FirstName = p.FirstName,
                    LastName = p.LastName,
                    Pesel = p.Pesel,
                    PhoneNumber = p.PhoneNumber
                })
                .FirstOrDefault();

            if (patient == null) return NotFound();
            return Ok(patient);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var patients = _context.Patients.ToList().Select(p => p.ToPatientDto());
            return Ok(patients);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var patient = _context.Patients.Find(id);
            if (patient == null) return NotFound();
            return Ok(patient.ToPatientDto());
        }

        [HttpGet("doctors")]
        public async Task<IActionResult> GetDoctors([FromQuery] string spec)
        {
            var doctors = await _context.Doctors
                .Where(d => d.Specialization.ToLower() == spec.ToLower())
                .Select(d => new {
                    Id = d.AccountId, 
                    d.FirstName,
                    d.LastName,
                    d.Specialization
                })
                .ToListAsync();

            return Ok(doctors);
        }

        [HttpGet("available-slots")]
        public async Task<IActionResult> GetAvailableSlots(string doctorId, DateTime date)
        {
            var baseSchedule = await _context.Availabilities
                .Where(a => a.DoctorId == doctorId) 
                .ToListAsync();

            var bookedTimes = await _context.Appointments
                .Where(a => a.DoctorId == doctorId && a.Date.Date == date.Date)
                .Select(a => a.Time)
                .ToListAsync();

            var freeSlots = baseSchedule
                .Where(s => !bookedTimes.Contains(s.StartTime))
                .Select(s => new { s.StartTime, s.EndTime })
                .OrderBy(s => s.StartTime)
                .ToList();

            return Ok(freeSlots);
        }

        [HttpPost("book-appointment")]
        [Authorize]
        public async Task<IActionResult> Book([FromBody] api.Dtos.Booking.BookAppointmentDto dto)
        {
            var patientId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(patientId)) return Unauthorized();

            if (!DateTime.TryParse(dto.Date, out DateTime appDate))
                return BadRequest("Zły format daty");

            var appointment = new Appointment
            {
                DoctorId = dto.DoctorId,
                PatientId = patientId,
                Date = appDate,
                Time = dto.Time,
                Status = "Zaplanowana"
            };

            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Zarezerwowano!" });
        }
    }
}