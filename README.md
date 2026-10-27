# CanisAR homepage

A buildless, responsive Japanese / English homepage with Vision, Research, and Contact sections.

- `index.html`: content and bilingual copy (`data-ja` / `data-en`).
- `styles.css`: layout, visual design, and mobile styles.
- `site.js`: language switching, saved language preference, and section navigation.
- `assets/`: original SVG illustrations and favicon. No external fonts or JavaScript dependencies.

Serve the directory with any static HTTP server, for example `python3 -m http.server 4173`, then open `http://localhost:4173`. No build or installation is required.

Japanese is the default language. `?lang=en` and `?lang=ja` create language-specific links; the language buttons remember the visitor’s choice when browser storage is available.

The existing GitHub Pages setup (`CNAME` and `.nojekyll`) is preserved. All source files are served directly from the repository root.

Research data is attributed to [InterPet4D, arXiv:2607.10287](https://arxiv.org/abs/2607.10287). The diagrams are original conceptual illustrations, not dataset captures or product screenshots.

The Contact section is awaiting a confirmed public email address.
