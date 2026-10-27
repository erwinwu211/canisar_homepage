# CanisAR homepage

A buildless, responsive Japanese / English homepage with Vision, Research, and Contact sections.

- `index.html`: content and bilingual copy (`data-ja` / `data-en`).
- `styles.css`: layout, visual design, and mobile styles.
- `site.js`: language switching, saved language preference, and section navigation.
- `assets/`: original SVG illustrations, favicon, locally hosted team photos, and research videos. No external fonts or JavaScript dependencies.

Serve the directory with any static HTTP server, for example `python3 -m http.server 4173`, then open `http://localhost:4173`. No build or installation is required.

Japanese is the default language. `?lang=en` and `?lang=ja` create language-specific links; the language buttons remember the visitor’s choice when browser storage is available.

The existing GitHub Pages setup (`CNAME` and `.nojekyll`) is preserved. All source files are served directly from the repository root.

Research data is attributed to [InterPet4D, arXiv:2607.10287](https://arxiv.org/abs/2607.10287). The diagrams are original conceptual illustrations, not dataset captures or product screenshots.

The Research section also includes owner-provided videos with Japanese / English captions. Videos use native playback and fullscreen controls, poster images, and `preload="none"` so the video files are requested when visitors play them.

| Published video in `assets/video/web/` | Local source | Content |
| --- | --- | --- |
| `interpet-data-sample.mp4` | `assets/video/interpet_sample.mp4` | Full multi-view interaction sample |
| `gaussian-sample-01.mp4` | `assets/video/gaussian1.mp4` | Full first SMAL / Gaussian Splatting sample |
| `gaussian-sample-02.mp4` | `assets/video/gaussian2.mp4` | Full second SMAL / Gaussian Splatting sample |
| `application-prototype.mp4` | `assets/video/intarpet.mp4` | Only 2:52–3:24 (32 seconds) |

Web copies are H.264 MP4 with fast-start metadata and AAC audio where present. Multi-view capture and the prototype are 1920 pixels wide; the Gaussian samples are 1280 pixels wide. Each `.jpg` poster is a frame from its corresponding video. Original source videos are retained locally and ignored by Git; only the optimized copies and posters are deployed.

The Contact section is awaiting a confirmed public email address.

Team photos in the Contact section (roles supplied by the site owner):

| Person | Role | Photo source |
| --- | --- | --- |
| Erwin Wu | CEO | [Personal homepage](https://erwinwu.com/), [original photo](https://erwinwu.com/images/erwin.png) |
| Chen-Chieh Liao | CFO | [Personal homepage](https://liaochenchieh.com/), [original photo](https://liaochenchieh.com/assets/img/prof_pic.jpg) |
| Yichen Peng | CTO | Owner-provided `pengyichen.jpg` |

Photos retrieved on 2026-10-27. Source images are preserved; consistent cropping and grayscale presentation are applied through CSS, with original color on hover for pointer devices.
