namespace BusinessLogiclayer.Entities
{
    public class FleetFeature
    {
        public int Id { get; set; }

        public string TitleEn { get; set; } = string.Empty;
        public string TitleAr { get; set; } = string.Empty;

        public string DescriptionEn { get; set; } = string.Empty;
        public string DescriptionAr { get; set; } = string.Empty;

        public int FleetId { get; set; }
    }
}
