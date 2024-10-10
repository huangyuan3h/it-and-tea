import { DOMAIN_URL } from "@/config/domain";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let sitemaps: MetadataRoute.Sitemap = [
    {
      url: `${DOMAIN_URL}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
      alternates: {
        languages: {
          en: `${DOMAIN_URL}\en`,
          fr: `${DOMAIN_URL}\fr`,
          zh: `${DOMAIN_URL}\zh`,
        },
      },
    },
  ];

  return sitemaps;
}
