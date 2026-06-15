import {
  AbsoluteFill,
  Img,
  staticFile,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

const SANS = "'Manrope', 'Inter', system-ui, -apple-system, sans-serif";
const bezier = Easing.bezier(0.16, 1, 0.3, 1);

const PHONE_W = 518;
const PHONE_H = 920;

const band = (frame: number, start: number, end: number, fade = 12) => {
  if (frame < start || frame > end) return 0;
  return Math.min(
    interpolate(frame, [start, start + fade], [0, 1], { extrapolateRight: "clamp", easing: bezier }),
    interpolate(frame, [end - fade, end], [1, 0], { extrapolateLeft: "clamp" }),
  );
};

const Eyebrow: React.FC = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
    <span style={{ width: 8, height: 30, borderRadius: 8, background: "linear-gradient(180deg,#f59e0b,#38bdf8)" }} />
    <span style={{ fontSize: 26, letterSpacing: 6, fontWeight: 700, textTransform: "uppercase", color: "#9aa3af" }}>
      Editing Guidelines · Supers Placement
    </span>
  </div>
);

// A super "chip" placed inside the phone
const Super: React.FC<{ children: React.ReactNode; dashed?: boolean; color?: string }> = ({
  children,
  dashed,
  color = "#f59e0b",
}) => (
  <div
    style={{
      border: `2px ${dashed ? "dashed" : "solid"} ${color}`,
      background: dashed ? "transparent" : "rgba(5,5,7,0.55)",
      color: "#fff",
      borderRadius: 10,
      padding: "10px 16px",
      fontSize: 26,
      fontWeight: 800,
      lineHeight: 1.15,
      textAlign: "center",
      backdropFilter: "blur(2px)",
    }}
  >
    {children}
  </div>
);

const Tag: React.FC<{ x?: number; y?: number; color: string; children: React.ReactNode; right?: boolean }> = ({
  color,
  children,
}) => (
  <span
    style={{
      fontSize: 18,
      fontWeight: 800,
      letterSpacing: 2,
      textTransform: "uppercase",
      color,
    }}
  >
    {children}
  </span>
);

export const SupersVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const intro = spring({ frame, fps, config: { damping: 200 } });
  const introOp = band(frame, 0, 86, 14);
  const phoneIn = interpolate(frame, [70, 96], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: bezier });

  const sA = band(frame, 92, 200); // top or bottom
  const sB = band(frame, 206, 314); // no overlap with captions
  const sC = band(frame, 320, 420); // bold keywords
  const sD = band(frame, 426, 510, 14); // all caps CTA

  const showPhone = frame >= 70;
  const phaseText =
    sA > 0
      ? { op: sA, title: "Top or bottom of the safe zone", pts: ["A super sits at the top OR the bottom.", "Runs up to 2 lines (3–4 if centred)."] }
      : sB > 0
        ? { op: sB, title: "Never overlap the caption", pts: ["Super at the top, caption low.", "Supers and captions must never overlap."] }
        : sC > 0
          ? { op: sC, title: "Bold only the keywords", pts: ["Bold the key words in a contrasting colour.", "Never bold a whole sentence — rest in subtitles."] }
          : sD > 0
            ? { op: sD, title: "ALL CAPS — 1–3 words only", pts: ["Caps for a CTA or key emphasis only.", "+2–4% letter-spacing · never full lines."] }
            : { op: 0, title: "", pts: [] };

  return (
    <AbsoluteFill style={{ backgroundColor: "#050507", fontFamily: SANS, color: "#f5f6f7" }}>
      <AbsoluteFill style={{ background: "radial-gradient(900px 520px at 30% 30%, rgba(245,158,11,0.08), transparent 70%)" }} />

      <div style={{ position: "absolute", top: 72, left: 96 }}>
        <Eyebrow />
      </div>

      {/* INTRO */}
      {introOp > 0 && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: introOp, zIndex: 5 }}>
          <div style={{ textAlign: "center", transform: `translateY(${interpolate(intro, [0, 1], [40, 0])}px)` }}>
            <div style={{ fontSize: 104, fontWeight: 800, letterSpacing: -2 }}>Supers Placement</div>
            <div style={{ marginTop: 16, fontSize: 34, color: "#9aa3af" }}>Where on-screen headlines sit on a 9 × 16 ad.</div>
          </div>
        </AbsoluteFill>
      )}

      {/* LEFT TEXT (per scene) */}
      {phaseText.op > 0 && (
        <div style={{ position: "absolute", left: 110, top: 300, width: 760, opacity: phaseText.op }}>
          <div style={{ fontSize: 60, fontWeight: 800, letterSpacing: -1, lineHeight: 1.05 }}>{phaseText.title}</div>
          <ul style={{ marginTop: 28, paddingLeft: 0, listStyle: "none" }}>
            {phaseText.pts.map((p) => (
              <li key={p} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginTop: 16, fontSize: 30, color: "#cbd5e1" }}>
                <span style={{ marginTop: 12, width: 10, height: 10, borderRadius: 10, background: "#f59e0b", flexShrink: 0 }} />
                {p}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* PHONE */}
      {showPhone && (
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 1300,
            width: PHONE_W,
            height: PHONE_H,
            opacity: phoneIn,
            transform: `translateY(${interpolate(phoneIn, [0, 1], [30, 0])}px)`,
            borderRadius: 28,
            overflow: "hidden",
            border: "3px solid rgba(255,255,255,0.18)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
            background: "#000",
          }}
        >
          <Img src={staticFile("supers-subject-cropped.png")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />

          {/* safe zone */}
          <div style={{ position: "absolute", inset: 0 }}>
            <div
              style={{
                position: "absolute",
                left: "7%",
                right: "7%",
                top: "5%",
                bottom: "20%",
                border: "2px dashed rgba(34,211,238,0.7)",
                borderRadius: 8,
              }}
            />
            {/* bottom UI keep-clear band */}
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "18%", background: "linear-gradient(180deg, transparent, rgba(5,5,7,0.85))" }} />
          </div>

          {/* Scene A: top solid + bottom dashed */}
          {sA > 0 && (
            <div style={{ position: "absolute", inset: 0, opacity: sA }}>
              <div style={{ position: "absolute", left: "10%", right: "10%", top: "9%" }}>
                <Super>TOP SUPER</Super>
                <div style={{ marginTop: 6, textAlign: "center" }}><Tag color="#f59e0b">Position 1</Tag></div>
              </div>
              <div style={{ position: "absolute", left: "10%", right: "10%", bottom: "24%" }}>
                <Super dashed>OR BOTTOM</Super>
                <div style={{ marginTop: 6, textAlign: "center" }}><Tag color="#f59e0b">Position 2</Tag></div>
              </div>
            </div>
          )}

          {/* Scene B: super top + caption low, no overlap */}
          {sB > 0 && (
            <div style={{ position: "absolute", inset: 0, opacity: sB }}>
              <div style={{ position: "absolute", left: "10%", right: "10%", top: "9%" }}>
                <Super>SUPER · top</Super>
              </div>
              <div style={{ position: "absolute", left: "14%", right: "14%", bottom: "23%" }}>
                <div style={{ background: "rgba(5,5,7,0.7)", border: "2px solid #a78bfa", borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 22, fontWeight: 700 }}>
                  caption · synced, low
                </div>
              </div>
              <div style={{ position: "absolute", left: "10%", right: "10%", top: "44%", textAlign: "center" }}>
                <Tag color="#34d399">✓ no overlap</Tag>
              </div>
            </div>
          )}

          {/* Scene C: bold keywords */}
          {sC > 0 && (
            <div style={{ position: "absolute", inset: 0, opacity: sC }}>
              <div style={{ position: "absolute", left: "9%", right: "9%", top: "9%" }}>
                <div style={{ background: "rgba(5,5,7,0.6)", border: "2px solid #f59e0b", borderRadius: 10, padding: "12px 14px", textAlign: "center", lineHeight: 1.25 }}>
                  <span style={{ fontSize: 24, color: "#cbd5e1", fontWeight: 600 }}>Land a </span>
                  <span style={{ fontSize: 26, color: "#fbbf24", fontWeight: 900 }}>17 LPA</span>
                  <br />
                  <span style={{ fontSize: 26, color: "#38bdf8", fontWeight: 900 }}>Prompt Engineer</span>
                  <span style={{ fontSize: 24, color: "#cbd5e1", fontWeight: 600 }}> role</span>
                </div>
              </div>
            </div>
          )}

          {/* Scene D: all caps CTA */}
          {sD > 0 && (
            <div style={{ position: "absolute", inset: 0, opacity: sD }}>
              <div style={{ position: "absolute", left: "16%", right: "16%", bottom: "24%" }}>
                <div style={{ background: "linear-gradient(90deg,#f59e0b,#fb7185)", color: "#1a0b00", borderRadius: 12, padding: "12px 14px", textAlign: "center", fontSize: 30, fontWeight: 900, letterSpacing: 2 }}>
                  JOIN NOW
                </div>
                <div style={{ marginTop: 8, textAlign: "center" }}><Tag color="#f59e0b">1–3 words · CTA</Tag></div>
              </div>
            </div>
          )}
        </div>
      )}

      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: 5,
          width: `${(frame / (durationInFrames - 1)) * 100}%`,
          background: "linear-gradient(90deg,#f59e0b,#38bdf8)",
        }}
      />
    </AbsoluteFill>
  );
};
