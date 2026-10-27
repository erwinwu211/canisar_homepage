# CanisAR homepage

A buildless, responsive Japanese / English website with Vision and Research on the homepage and a separate Contact / Team page.

- `index.html`: homepage with Vision, Research, and bilingual copy (`data-ja` / `data-en`).
- `contact.html`: standalone Contact page with the team, roles, and responsibilities.
- `styles.css`: layout, visual design, and mobile styles.
- `site.js`: language switching, saved language preference, section navigation, and Gaussian background playback controls.
- `assets/`: original SVG illustrations, favicon, locally hosted team photos, and research videos. No external fonts or JavaScript dependencies.

Serve the directory with any static HTTP server, for example `python3 -m http.server 4173`, then open `http://localhost:4173`. No build or installation is required.

Japanese is the default language. `?lang=en` and `?lang=ja` create language-specific links on both pages; cross-page navigation preserves the selected language through the URL, and the language buttons remember the visitor’s choice when browser storage is available.

The existing GitHub Pages setup (`CNAME` and `.nojekyll`) is preserved. All source files are served directly from the repository root.

Research data is attributed to [InterPet4D, arXiv:2607.10287](https://arxiv.org/abs/2607.10287). The diagrams are original conceptual illustrations, not dataset captures or product screenshots.

The Research section also includes owner-provided videos with Japanese / English captions. The multi-view capture has a dedicated, larger player; the application prototype keeps its native playback and fullscreen controls. Both use posters and `preload="none"` to load video on demand.

The two Gaussian samples play as muted, translucent backgrounds in a separate showcase, with links to view each complete video clearly. Background playback starts when the showcase enters the viewport and pauses when it leaves or the page is hidden. A bilingual pause/play button is available; visitors who prefer reduced motion initially see static posters and can opt into playback.

| Published video in `assets/video/web/` | Local source | Content |
| --- | --- | --- |
| `interpet-data-sample.mp4` | `assets/video/interpet_sample.mp4` | Full multi-view interaction sample |
| `gaussian-sample-01.mp4` | `assets/video/gaussian1.mp4` | Full first SMAL / Gaussian Splatting sample |
| `gaussian-sample-02.mp4` | `assets/video/gaussian2.mp4` | Full second SMAL / Gaussian Splatting sample |
| `application-prototype.mp4` | `assets/video/intarpet.mp4` | Only 2:52–3:24 (32 seconds) |

Web copies are H.264 MP4 with fast-start metadata and AAC audio where present. Multi-view capture and the prototype are 1920 pixels wide; the Gaussian samples are 1280 pixels wide. Each `.jpg` poster is a frame from its corresponding video. Original source videos are retained locally and ignored by Git; only the optimized copies and posters are deployed.

The Contact page is awaiting a confirmed public email address.

Team photos on the Contact page (roles supplied by the site owner):

| Person | Role | Photo source |
| --- | --- | --- |
| Erwin Wu | CEO | [Personal homepage](https://erwinwu.com/), [original photo](https://erwinwu.com/images/erwin.png) |
| Chen-Chieh Liao | COO | [Personal homepage](https://liaochenchieh.com/), [original photo](https://liaochenchieh.com/assets/img/prof_pic.jpg) |
| Yichen Peng | CTO | Owner-provided `pengyichen.jpg` |

Photos retrieved on 2026-10-27. Source images are preserved; consistent cropping and grayscale presentation are applied through CSS, with original color on hover for pointer devices.
