using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Patient
    {
        public int Id { get; set; }

        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }

        public string Pesel { get; set; } = string.Empty;

        public string PhoneNumber { get; set; } = string.Empty;

        public List<PatientNotes> Notes { get; set; } = new List<PatientNotes>();

        public string AccountId { get; set; }
        public AppUser Account { get; set; }
    }
}