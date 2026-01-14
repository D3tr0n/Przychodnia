public class Kartoteka
{
    public int Id { get; set; }
    public string Pesel { get; set; }
    public string Temat { get; set; }
    public string Opis { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
}
