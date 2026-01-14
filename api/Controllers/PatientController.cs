using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Data;
using api.Mappers;
using api.Dtos.Patient;

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

            if (patient == null)
            {
                return NotFound();
            }

            return Ok(patient.ToPatientDto());
        }
    }
}