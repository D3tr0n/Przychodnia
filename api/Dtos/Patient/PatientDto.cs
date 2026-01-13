using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Patient
{
    public class PatientDto
    {
         public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;

        public string Pesel { get; set; } = string.Empty;

        public string PhoneNumber { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }

    }
}