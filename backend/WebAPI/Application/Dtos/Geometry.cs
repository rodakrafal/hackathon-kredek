namespace Application.Dtos;

public class Geometry
{
    public string Type { get; set; } = default!;

    public List<List<List<double>>> Coordinates { get; set; } = default!;
}
