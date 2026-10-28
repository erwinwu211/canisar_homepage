# InterPet4D research figure

- Asset: `interpet4d-teaser.png` (1672 × 941, RGBA PNG).
- Source: page 1 of the owner-provided `Teaser (1).pdf`, supplied on 2026-10-28.
- Use: the research overview on `pet-interaction.html`.
- Processing: rendered the source PDF, then used the built-in image generation tool in image-editing mode to remove the white canvas and adapt dark labels for the website. This is an adapted presentation graphic; use the source PDF for the original research figure.
- Transparency: the generated alpha channel is preserved. No CSS blend mode or opaque background is applied to the image.

## Final editing prompt

```text
Use case: background-extraction. Edit the supplied InterPet4D scientific teaser figure, not a redesign. Deliver a high-resolution landscape 16:9 PNG with a genuinely transparent alpha background, suitable for a dark blue-black website (#111d24). Remove ONLY the white page/canvas background, including white gaps between all figures and around the logo, and all white matte halos. Preserve exactly the original arrangement, all 12 human-dog interaction groups, all people, the original blurred/anonymized faces, all dogs, their poses, clothes, colors, sizes, and every research example. Preserve the original blue InterPet4D logo and its human/dog silhouettes precisely. Preserve the green contact shadows with soft translucent edges that blend naturally into the dark website. Preserve both rounded photographic insets in full color, preserving their rectangular backgrounds and content. Preserve the bottom human/dog example and the gray 3D mesh example exactly. For legibility on the dark webpage only, change black text labels, the black waveform, and black arrow to light cool gray (#dce9ee); retain all exact text: Multiview Video; Egoview Video; Audio Command; “Ruby, sit down!”; 3D Estimation; Human Body & Hand & Dog’s Pose. Keep typography and text placement. White highlights, white/light clothing and dog fur, and gray 3D meshes are foreground subjects and MUST remain opaque. Do not generate new people, faces, dogs, examples, logos, labels, decorative backgrounds, or any new elements. Do not paint a dark background and do not paint a checkerboard: empty space must be alpha transparency. Preserve the full uncropped figure, original proportions and all edge content, with clean anti-aliased cutout edges.
```
