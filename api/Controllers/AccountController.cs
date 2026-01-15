using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Account;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using api.Interfaces;
using Microsoft.EntityFrameworkCore;
using api.Data;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using api.Mappers;

namespace api.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ApplicationDBContext _context;

        public AccountController(
            UserManager<AppUser> userManager, 
            ITokenService tokenService, 
            SignInManager<AppUser> signInManager, 
            ApplicationDBContext context)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.Username);

            if (user == null) return Unauthorized("Niepoprawna nazwa użytkownika!");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized("Nazwa użytkownika lub hasło są niepoprawne!");

            var roles = await _userManager.GetRolesAsync(user);
            
            // Pobieramy PESEL dla pacjenta, jeśli istnieje
            var patient = await _context.Patients.FirstOrDefaultAsync(p => p.AccountId == user.Id);
            string userPesel = patient?.Pesel ?? "";

            return Ok(new NewUserDto
            {
                Username = user.UserName,
                Email = user.Email,
                Roles = roles.ToList(),
                Token = _tokenService.CreateToken(user, roles, userPesel)
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);

                var appUser = new AppUser
                {
                    UserName = registerDto.Username,
                    Email = registerDto.Email,
                };

                var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

                if (createdUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(appUser, "Patient");
                    if (roleResult.Succeeded)
                    {
                        var patient = new Patient 
                        {
                            AccountId = appUser.Id,
                            FirstName = registerDto.FirstName,
                            LastName = registerDto.LastName,
                            Pesel = registerDto.Pesel,
                            PhoneNumber = registerDto.PhoneNumber,
                            DateOfBirth = DateTime.Now // Możesz dodać pole w DTO dla daty urodzenia
                        };

                        _context.Patients.Add(patient);
                        await _context.SaveChangesAsync();

                        var roles = await _userManager.GetRolesAsync(appUser);

                        return Ok(new NewUserDto
                        {
                            Username = appUser.UserName,
                            Email = appUser.Email,
                            Roles = roles.ToList(),
                            Token = _tokenService.CreateToken(appUser, roles, registerDto.Pesel)
                        });
                    }
                    return StatusCode(500, roleResult.Errors);
                }
                return StatusCode(500, createdUser.Errors);
            }
            catch (Exception e)
            {
                return StatusCode(500, new { message = e.Message });
            }
        }

        [HttpPost("register/doctor")]
        public async Task<IActionResult> RegisterDoctor([FromBody] RegisterDoctorDto registerDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var appUser = new AppUser
            {
                UserName = registerDto.Username,
                Email = registerDto.Email
            };

            var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password!);

            if (createdUser.Succeeded)
            {
                await _userManager.AddToRoleAsync(appUser, "Doctor");

                var doctorModel = registerDto.ToDoctorFromRegisterDto(appUser.Id);

                await _context.Doctors.AddAsync(doctorModel);
                await _context.SaveChangesAsync();

                var roles = new List<string> { "Doctor" };

                return Ok(new NewUserDto
                {
                    Username = appUser.UserName,
                    Email = appUser.Email,
                    Roles = roles,
                    Token = _tokenService.CreateToken(appUser, roles, "")
                });
            }
            return BadRequest(createdUser.Errors);
        }

        [HttpGet("profile")]
        [Authorize]
        public async Task<IActionResult> GetProfile()
        {
            // Pobieramy ID ze standardowego NameIdentifier ustawionego w TokenService
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId)) return Unauthorized("Brak ID użytkownika w tokenie.");

            var patient = await _context.Patients
                .FirstOrDefaultAsync(p => p.AccountId == userId);

            if (patient == null) return NotFound("Nie znaleziono danych pacjenta.");

            return Ok(new
            {
                firstName = patient.FirstName,
                lastName = patient.LastName,
                email = User.FindFirstValue(ClaimTypes.Email), 
                dateOfBirth = patient.DateOfBirth,
                phoneNumber = patient.PhoneNumber,
                pesel = patient.Pesel
            });
        }

        [HttpGet("doctor-profile")]
        [Authorize(Roles = "Doctor")]
        public async Task<IActionResult> GetDoctorProfile()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId)) return Unauthorized("Brak ID użytkownika w tokenie.");

            var doctor = await _context.Doctors
                .Include(d => d.Account) 
                .FirstOrDefaultAsync(d => d.AccountId == userId);

            if (doctor == null) return NotFound("Nie znaleziono danych lekarza.");

            return Ok(new 
            {
                firstName = doctor.FirstName,
                lastName = doctor.LastName,
                specialization = doctor.Specialization,
                email = doctor.Account?.Email
            });
        }
    }
}