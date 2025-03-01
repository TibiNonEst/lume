import { merge } from "../core/utils.ts";
import { Page } from "../core/filesystem.ts";
import { stringify } from "../deps/xml.ts";

import type { Data, Site, StaticFile } from "../core.ts";

type ChangeFreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export interface Options {
  /** The sitemap file name */
  filename: string;

  /** The query to search pages included in the sitemap */
  query: string;

  /** The values to sort the sitemap */
  sort: string;

  /** The key to use for the lastmod field or a custom function */
  lastmod?: string | ((data: Data) => Date);

  /** The key to use for the changefreq field or a custom function */
  changefreq?: string | ((data: Data) => ChangeFreq);

  /** The key to use for the priority field or a custom function */
  priority?: string | ((data: Data) => number);
}

// Default options
export const defaults: Options = {
  filename: "/sitemap.xml",
  query: "",
  sort: "url=asc",
  lastmod: "date",
};

/** A plugin to generate a sitemap.xml from page files after build */
export default function (userOptions?: Partial<Options>) {
  const options = merge(defaults, userOptions);

  return (site: Site) => {
    site.addEventListener("afterRender", () => {
      // Create the sitemap.xml page
      const sitemap = Page.create(
        options.filename,
        generateSitemap(site.searcher.pages(options.query, options.sort)),
      );

      // Add to the sitemap page to pages
      site.pages.push(sitemap);

      // Search for the `robots.txt` file
      const robots = site.files.some((file: StaticFile) =>
        file.outputPath === "/robots.txt"
      );

      // If the `robots.txt` file doesn't exist, create it
      if (!robots) {
        const robots = site.pages.find((page: Page) =>
          page.data.url === "/robots.txt"
        );

        if (robots) {
          robots.content += `Sitemap: ${site.url(options.filename, true)}`;
        } else {
          site.pages.push(Page.create(
            "/robots.txt",
            `User-agent: *\nAllow: /\n\nSitemap: ${
              site.url("/sitemap.xml", true)
            }`,
          ));
        }
      }
    });

    function generateSitemap(pages: Data[]): string {
      const sitemap = {
        xml: {
          "@version": "1.0",
          "@encoding": "UTF-8",
        },
        urlset: {
          "@xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9",
          url: pages.map((data) => {
            const node: UrlItem = {
              loc: site.url(data.url as string, true),
            };

            const lastmod = getValue<Date>(data, options.lastmod)
              ?.toISOString();
            if (lastmod) {
              node.lastmod = lastmod;
            }

            const changefreq = getValue<ChangeFreq>(data, options.changefreq);
            if (changefreq) {
              node.changefreq = changefreq;
            }

            const priority = getValue<number>(data, options.priority);
            if (priority) {
              node.priority = priority;
            }
            return node;
          }),
        },
      };

      return stringify(sitemap);
    }
  };
}

interface UrlItem {
  loc: string;
  lastmod?: string;
  changefreq?: ChangeFreq;
  priority?: number;
}

function getValue<T>(
  data: Data,
  key?: string | ((data: Data) => T),
): T | undefined {
  if (!key) {
    return undefined;
  }

  if (typeof key === "function") {
    return key(data);
  }

  return data[key];
}
