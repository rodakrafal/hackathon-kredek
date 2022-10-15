namespace Application.Dtos;

public class GeoJson
{
    public string Type { get; set; } = default!;

    public List<Feature> Features { get; set; } = default!;
}
