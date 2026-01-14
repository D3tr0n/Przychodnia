using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Account
{
    public class RegisterDoctorDto
    {
        [Required]
        public string? Username { get; set; }

        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        public string? Password { get; set; }   

        [Required]
        public string? FirstName { get; set; }

        [Required]
        public string? LastName { get; set; }

        [Required]
        public string? Specialization { get; set; }
            }
}