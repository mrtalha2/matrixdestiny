import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/structured-data";
import { getSiteSettings } from "@/lib/settings/site-settings";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSiteSettings();
  const isNoIndex = settings.seo.robotsPolicy.startsWith("noindex");

  return {
    rules: [
      {
        userAgent: "*",
        allow: isNoIndex ? undefined : "/",
        disallow: isNoIndex
          ? ["/"]
          : ["/admin/", "/admin", "/api/", "/design-system"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
