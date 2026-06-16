import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

const MONO = "'SF Mono', 'JetBrains Mono', 'Menlo', 'Consolas', monospace";
const SANS = "'Manrope', 'Inter', system-ui, -apple-system, sans-serif";

type Seg = { value: string; field: string; meaning: string; color: string };

const SEGMENTS: Seg[] = [
  { value: "AI-TV", field: "Product", meaning: "The product or brand — AI-TV App course.", color: "#38bdf8" },
  { value: "LF", field: "Series Code", meaning: "The course series — e.g. LF = Long-Form.", color: "#fbbf24" },
  { value: "EP12", field: "Episode", meaning: "Episode number — EP12 = episode 12.", color: "#34d399" },
  { value: "AI-Agents", field: "Short Title", meaning: "Short title of the video topic.", color: "#a78bfa" },
  { value: "v3", field: "Version", meaning: "Version — v3 = third revision. Use _FINAL for the locked cut.", color: "#f472b6" },
];

const INTRO_END = 84;
const BUILD_START = 96;
const SEG_FRAMES = 56;
const BUILD_END = BUILD_START + SEGMENTS.length * SEG_FRAMES; // 376
const OUTRO_START = BUILD_END + 6;

const bezier = Easing.bezier(0.16, 1, 0.3, 1);

const Eyebrow: React.FC<{ opacity: number }> = ({ opacity }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14, opacity }}>
    <span
      style={{
        width: 8,
        height: 30,
        borderRadius: 8,
        background: "linear-gradient(180deg,#38bdf8,#34d399)",
      }}
    />
    <span
      style={{
        fontFamily: SANS,
        fontSize: 26,
        letterSpacing: 6,
        fontWeight: 700,
        textTransform: "uppercase",
        color: "#9aa3af",
      }}
    >
      File Naming Convention · Course Videos
    </span>
  </div>
);

export const CourseNamingVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ---- Intro ----
  const introTitle = spring({ frame, fps, config: { damping: 200 } });
  const introOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const introOut = interpolate(frame, [INTRO_END - 10, INTRO_END], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ---- Main scene fade in ----
  const mainIn = interpolate(frame, [BUILD_START - 12, BUILD_START + 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ---- Outro ----
  const outroIn = interpolate(frame, [OUTRO_START, OUTRO_START + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const inIntro = frame < INTRO_END;
  const inOutro = frame >= OUTRO_START;

  const activeIdx = Math.max(
    0,
    Math.min(SEGMENTS.length - 1, Math.floor((frame - BUILD_START) / SEG_FRAMES)),
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#050507", fontFamily: SANS, color: "#f5f6f7" }}>
      {/* subtle backdrop glow */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(900px 500px at 50% 28%, rgba(56,189,248,0.10), transparent 70%)",
        }}
      />

      {/* ---------- INTRO ---------- */}
      {inIntro && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            opacity: introOpacity * introOut,
          }}
        >
          <div
            style={{
              transform: `translateY(${interpolate(introTitle, [0, 1], [40, 0])}px)`,
              textAlign: "center",
            }}
          >
            <Eyebrow opacity={1} />
            <div
              style={{
                marginTop: 26,
                fontSize: 104,
                fontWeight: 800,
                letterSpacing: -2,
                lineHeight: 1.02,
              }}
            >
              File Naming Convention
            </div>
            <div
              style={{
                marginTop: 22,
                fontSize: 34,
                color: "#9aa3af",
                fontFamily: MONO,
              }}
            >
              AI-TV_[SeriesCode]_[EP##]_[ShortTitle]_v#
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* ---------- BUILD ---------- */}
      {!inIntro && !inOutro && (
        <AbsoluteFill style={{ padding: "90px 110px", opacity: mainIn }}>
          <Eyebrow opacity={1} />

          {/* filename */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontFamily: MONO,
                fontSize: 78,
                fontWeight: 700,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
              }}
            >
              {SEGMENTS.map((s, i) => {
                const start = BUILD_START + i * SEG_FRAMES;
                const appear = interpolate(frame, [start, start + 14], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: bezier,
                });
                const dy = interpolate(appear, [0, 1], [26, 0]);
                const isActive = i === activeIdx;
                const settle = interpolate(
                  frame,
                  [start, start + 14, start + 30],
                  [0, 1, isActive ? 1 : 0],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                );
                return (
                  <span key={i} style={{ display: "inline-flex", alignItems: "baseline" }}>
                    {i > 0 && (
                      <span style={{ color: "#3f4754", opacity: appear }}>_</span>
                    )}
                    <span
                      style={{
                        color: s.color,
                        opacity: appear,
                        transform: `translateY(${dy}px)`,
                        display: "inline-block",
                        textShadow: `0 0 ${24 * settle}px ${s.color}66`,
                      }}
                    >
                      {s.value}
                    </span>
                  </span>
                );
              })}
            </div>

            {/* meaning card */}
            <div style={{ marginTop: 70, minHeight: 150 }}>
              {SEGMENTS.map((s, i) => {
                const start = BUILD_START + i * SEG_FRAMES;
                const cardIn = interpolate(frame, [start, start + 12], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: bezier,
                });
                const cardOut =
                  i === SEGMENTS.length - 1
                    ? 1
                    : interpolate(frame, [start + SEG_FRAMES - 10, start + SEG_FRAMES], [1, 0], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      });
                const op = i === activeIdx ? cardIn * cardOut : 0;
                if (op <= 0.001) return null;
                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      opacity: op,
                      transform: `translateY(${interpolate(op, [0, 1], [18, 0])}px)`,
                      display: "flex",
                      alignItems: "center",
                      gap: 28,
                      border: "1px solid rgba(255,255,255,0.10)",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: 18,
                      padding: "26px 34px",
                      maxWidth: 1500,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: MONO,
                        fontSize: 58,
                        fontWeight: 800,
                        color: s.color,
                        background: `${s.color}1a`,
                        border: `1px solid ${s.color}55`,
                        borderRadius: 14,
                        padding: "8px 26px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {s.value}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 22,
                          letterSpacing: 4,
                          textTransform: "uppercase",
                          color: "#9aa3af",
                          fontWeight: 700,
                        }}
                      >
                        {s.field}
                      </div>
                      <div style={{ marginTop: 8, fontSize: 38, fontWeight: 600 }}>
                        {s.meaning}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* progress dots */}
          <div style={{ display: "flex", gap: 12 }}>
            {SEGMENTS.map((s, i) => (
              <span
                key={i}
                style={{
                  width: i === activeIdx ? 44 : 16,
                  height: 8,
                  borderRadius: 8,
                  background: i <= activeIdx ? s.color : "rgba(255,255,255,0.14)",
                  transition: "none",
                }}
              />
            ))}
          </div>
        </AbsoluteFill>
      )}

      {/* ---------- OUTRO ---------- */}
      {inOutro && (
        <AbsoluteFill
          style={{ justifyContent: "center", alignItems: "center", opacity: outroIn }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 70,
                fontWeight: 700,
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {SEGMENTS.map((s, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "baseline" }}>
                  {i > 0 && <span style={{ color: "#3f4754" }}>_</span>}
                  <span style={{ color: s.color }}>{s.value}</span>
                </span>
              ))}
            </div>
            <div style={{ marginTop: 34, fontSize: 40, fontWeight: 700 }}>
              Append <span style={{ fontFamily: MONO, color: "#34d399" }}>_FINAL</span> and freeze the locked cut.
            </div>
            <div
              style={{
                marginTop: 16,
                fontSize: 24,
                letterSpacing: 5,
                textTransform: "uppercase",
                color: "#9aa3af",
                fontWeight: 700,
              }}
            >
              House of EdTech · Editing Guidelines
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* progress timeline at very bottom */}
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: 5,
          width: `${(frame / (durationInFrames - 1)) * 100}%`,
          background: "linear-gradient(90deg,#38bdf8,#34d399)",
        }}
      />
    </AbsoluteFill>
  );
};
