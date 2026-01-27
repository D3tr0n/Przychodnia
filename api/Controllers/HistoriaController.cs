using Microsoft.AspNetCore.Mvc;
using api.Data;
using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace api.Controllers
{
    [Route("api/[controller]")] 
    [ApiController]
    [Authorize]
    public class HistoriaController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public HistoriaController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet("by-pesel")]
        public async Task<IActionResult> GetByPesel([FromQuery] string pesel)
        {
            if (string.IsNullOrWhiteSpace(pesel))
                return BadRequest(new { message = "PESEL jest wymagany" });

            var historia = await _context.Kartoteki
                .Where(k => k.Pesel == pesel.Trim())
                .OrderByDescending(k => k.CreatedAt)
                .ToListAsync();

            return Ok(historia); 
        }
    }
}