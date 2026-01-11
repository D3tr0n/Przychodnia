using System.Text.Json.Serialization;
public class Patient
{
    public int Id { get; set;}
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    
    [JsonIgnore]
    public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
}