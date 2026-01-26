using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Booking
{
    public class BookAppointmentDto
    {
        public string DoctorId { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
    }
}