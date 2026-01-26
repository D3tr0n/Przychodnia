using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class PatientNotes
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;

        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public int? PatientID { get; set; }
        //Navigation Property
        public Patient? Patient { get; set; }

        public int? DoctorID { get; set; }
        //Navigation Property
        public Doctor? Doctor { get; set; }


    }
}