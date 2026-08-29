// A thin, repeating vine-and-lotus-bud motif inspired by Nakshi Kantha
// embroidery borders (culturally neutral running-stitch style, not a
// religious symbol), rendered in the site's amber accent. Kept subtle —
// low opacity, no photos, just a quiet transition between sections.
const MOTIF_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='32' viewBox='0 0 60 32'>
  <path d='M0 16 Q 15 4 30 16 T 60 16' fill='none' stroke='#d97706' stroke-width='1.5' opacity='0.55'/>
  <path d='M30 11 Q 34 16 30 21 Q 26 16 30 11 Z' fill='#d97706' opacity='0.5'/>
  <circle cx='2' cy='16' r='1.8' fill='#d97706' opacity='0.4'/>
  <circle cx='58' cy='16' r='1.8' fill='#d97706' opacity='0.4'/>
</svg>`;

export function NakshiDivider() {
  return (
    <div
      aria-hidden
      role="presentation"
      className="h-8 w-full sm:h-10"
      style={{
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(MOTIF_SVG)}")`,
        backgroundRepeat: "repeat-x",
        backgroundPosition: "center",
      }}
    />
  );
}
