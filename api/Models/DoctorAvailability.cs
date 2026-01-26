public class DoctorAvailability
{
    public int Id { get; set; }
    public string DoctorId { get; set; }
    public string StartTime { get; set; }
    public string EndTime { get; set; }
    public bool IsBooked { get; set; } = false;
}