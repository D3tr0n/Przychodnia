public class Patient
{
    public int Id { get; set;}
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
}