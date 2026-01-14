using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        
        [Required]
        public string DoctorId { get; set; }
        
        [Required]
        public string PatientId { get; set; }
        
        [Required]
        public DateTime Date { get; set; }
        
        [Required]
        public string Time { get; set; }
        
        public string Status { get; set; } = "Zaplanowana";
    }
}