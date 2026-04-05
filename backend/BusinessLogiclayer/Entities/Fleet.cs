namespace BusinessLogiclayer.Entities
{
        public class Fleet
        {
                public int Id { get; set; }

                public string NameEn { get; set; } = string.Empty;
                public string NameAr { get; set; } = string.Empty;

                public string DescriptionEn { get; set; } = string.Empty;
                public string DescriptionAr { get; set; } = string.Empty;

                public string DetailedDescriptionEn { get; set; } = string.Empty;
                public string DetailedDescriptionAr { get; set; } = string.Empty;

                public string ImageUrl { get; set; } = string.Empty;
                public string Model3DUrl { get; set; } = string.Empty;
        }
}

