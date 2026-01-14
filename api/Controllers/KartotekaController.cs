using Microsoft.AspNetCore.Mvc;
using api.Data;
using api.Dtos;
using api.Models;
using System.Threading.Tasks;

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
