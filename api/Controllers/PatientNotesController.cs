using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Data;
using api.Dtos.PatientNotes;
using api.Mappers;
using api.Models;




namespace api.Controllers
{
    [Route("api/patientnotes")]
    [ApiController]
    public class PatientNotesController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public PatientNotesController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var patientnotes = _context.PatientNotes.ToList();

            return Ok(patientnotes);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var patientnote = _context.PatientNotes.Find(id);

            if (patientnote == null)
            {
                return NotFound();
            }

            return Ok(patientnote);
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreatePatientNotesRequestDto patientnoteDto)
        {
            var patientnoteModel = patientnoteDto.ToPatientNotesFromCreateDto();
            _context.PatientNotes.Add(patientnoteModel);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = patientnoteModel.Id }, patientnoteModel.ToPatientNotesDto());
        }
    }
}