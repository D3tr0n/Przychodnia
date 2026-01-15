using Microsoft.AspNetCore.Mvc;
using api.Data;
using api.Dtos;
using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace api.Controllers
{
    [Route("api/kartoteka")]
    [ApiController]
    public class KartotekaController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public KartotekaController(ApplicationDBContext context)
        {
            _context = context;
        }


        [HttpGet("moje-badania")]
        [Authorize]
        public async Task<IActionResult> GetMyRecords()
        {
            var userPesel = User.Claims.FirstOrDefault(c => c.Type == "PESEL")?.Value;

            if (string.IsNullOrEmpty(userPesel))
                return Unauthorized("Brak PESEL w tokenie");

            var historia = await _context.Kartoteki
                .Where(k => k.Pesel.Trim() == userPesel.Trim())
                .ToListAsync();

            return Ok(historia);
        }

        [HttpPost]
        public async Task<IActionResult> AddRecord([FromBody] KartotekaDto dto)
        {
            var record = new Kartoteka
            {
                Pesel = dto.Pesel,
                Temat = dto.Temat,
                Opis = dto.Opis,
                CreatedAt = DateTime.Now
            };

            _context.Kartoteki.Add(record);
            await _context.SaveChangesAsync();
            return Ok(record);
        }
    }
}