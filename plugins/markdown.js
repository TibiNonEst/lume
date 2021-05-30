import {
  markdownIt,
  markdownItAttrs,
  markdownItDeflist,
  markdownItReplaceLinks,
} from "../deps/markdown_it.js";
import loader from "../loaders/text.js";
import Markdown from "../engines/markdown.js";
import { merge } from "../utils.js";

// Default options
const defaults = {
  extensions: [".md"],
  options: {
    html: true,
  },
  plugins: [
    markdownItAttrs,
    markdownItReplaceLinks,
    markdownItDeflist,
  ],
};

export default function (userOptions) {
  const options = merge(defaults, userOptions);

  return function (site) {
    const engine = createMarkdown(site, options);

    site.loadPages(options.extensions, loader, new Markdown(site, engine));
    site.filter("md", filter);

    function filter(string, inline = false) {
      return inline
        ? engine.renderInline(string || "").trim()
        : engine.render(string || "").trim();
    }
  };
}

function createMarkdown(site, options) {
  const markdown = markdownIt({
    replaceLink(link) {
      return site.url(link);
    },
    ...options.options,
  });

  options.plugins.forEach((plugin) => markdown.use(plugin));

  return markdown;
}
