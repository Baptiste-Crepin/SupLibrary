import { useQuery } from "@tanstack/react-query";

export type WikipediaPage = {
  type: string;
  title: string;
  displaytitle: string;
  namespace: {
    id: number;
    text: string;
  };
  wikibase_item: string;
  titles: {
    canonical: string;
    normalized: string;
    display: string;
  };
  pageid: number;
  thumbnail: {
    source: string;
    width: number;
    height: number;
  };
  originalimage: {
    source: string;
    width: number;
    height: number;
  };
  lang: string;
  dir: string;
  revision: string;
  tid: string;
  timestamp: string;
  description: string;
  description_source: string;
  content_urls: {
    desktop: {
      page: string;
      revisions: string;
      edit: string;
      talk: string;
    };
    mobile: {
      page: string;
      revisions: string;
      edit: string;
      talk: string;
    };
  };
  extract: string;
  extract_html: string;
};

const wikipediaBaseUrl = "https://en.wikipedia.org/api/rest_v1/page/summary";
// https://en.wikipedia.org/api/rest_v1/page/summary/L%27Étranger?format=json

export function useWikipedia(url: string) {
  const parsedUrl = new URL(url);
  const title = parsedUrl.pathname.split('/').pop();
  return useQuery<WikipediaPage, Error>({
    queryKey: ["WikipediaPage", url],
    queryFn: async () => {
      const res = await fetch(`${wikipediaBaseUrl}/${title}?format=json`);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    enabled: !!url,
    gcTime: 1000 * 60 * 60 * 24 * 7,
    staleTime: 1000 * 60 * 60 * 24 * 7,
  });
}