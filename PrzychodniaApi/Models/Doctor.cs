using System.Text.Json.Serialization;
public class Doctor
{
    public int Id { get; set;}
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string Specialization { get; set; } = null!;
    

    [JsonIgnore]
    public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
}