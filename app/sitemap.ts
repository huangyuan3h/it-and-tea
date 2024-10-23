import { DOMAIN_URL } from "@/config/domain";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let sitemaps: MetadataRoute.Sitemap = [
    {
      url: `${DOMAIN_URL}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: `${DOMAIN_URL}en`,
          fr: `${DOMAIN_URL}fr`,
          zh: `${DOMAIN_URL}zh`,
        },
      },
    },
    {
      url: `${DOMAIN_URL}/policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: `${DOMAIN_URL}en/policy`,
          fr: `${DOMAIN_URL}fr/policy`,
          zh: `${DOMAIN_URL}zh/policy`,
        },
      },
    },
    {
      url: `${DOMAIN_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: `${DOMAIN_URL}en/about`,
          fr: `${DOMAIN_URL}fr/about`,
          zh: `${DOMAIN_URL}zh/about`,
        },
      },
    },
  ];

  return sitemaps;
}
