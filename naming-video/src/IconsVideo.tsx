import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

const SANS = "'Manrope', 'Inter', system-ui, -apple-system, sans-serif";
const bezier = Easing.bezier(0.16, 1, 0.3, 1);

const PATHS = {
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  heart:
    "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.49 4.04 3 5.5l7 7Z",
  bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9 M10.3 21a1.9 1.9 0 0 0 3.4 0",
  zap: "M13 2 4.3 12.5a1 1 0 0 0 .77 1.6H11l-1 8 8.7-10.5a1 1 0 0 0-.77-1.6H12l1-8Z",
};

type Variant = "outline" | "filled" | "gradient" | "lineal" | "hand" | "flat";

const StyledIcon: React.FC<{ d: string; variant: Variant; size?: number }> = ({
  d,
  variant,
  size = 96,
}) => {
  const common = { strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  if (variant === "flat") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <rect x="1" y="1" width="22" height="22" rx="5" fill="#22d3ee" />
        <path d={d} fill="#072b33" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <defs>
        <linearGradient id="iconGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#34d399" />
        </linearGradient>
      </defs>
      {variant === "outline" && (
        <path d={d} fill="none" stroke="#f5f6f7" strokeWidth={2} {...common} />
      )}
      {variant === "filled" && <path d={d} fill="#f5f6f7" />}
      {variant === "gradient" && <path d={d} fill="url(#iconGrad)" />}
      {variant === "lineal" && (
        <>
          <path d={d} fill="#f472b6" fillOpacity={0.45} />
          <path d={d} fill="none" stroke="#38bdf8" strokeWidth={2} {...common} />
        </>
      )}
      {variant === "hand" && (
        <g transform="rotate(-4 12 12)">
          <path d={d} fill="none" stroke="#f5f6f7" strokeWidth={2.4} strokeDasharray="3 2.4" {...common} />
        </g>
      )}
    </svg>
  );
};

// 0 -> 1 -> 0 envelope for a scene window
const band = (frame: number, start: number, end: number, fade = 12) => {
  if (frame < start || frame > end) return 0;
  return Math.min(
    interpolate(frame, [start, start + fade], [0, 1], { extrapolateRight: "clamp", easing: bezier }),
    interpolate(frame, [end - fade, end], [1, 0], { extrapolateLeft: "clamp" }),
  );
};

const Eyebrow: React.FC = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
    <span style={{ width: 8, height: 30, borderRadius: 8, background: "linear-gradient(180deg,#a855f7,#38bdf8)" }} />
    <span style={{ fontSize: 26, letterSpacing: 6, fontWeight: 700, textTransform: "uppercase", color: "#9aa3af" }}>
      Editing Guidelines · Icons
    </span>
  </div>
);

const Card: React.FC<{
  ok: boolean;
  label: string;
  children: React.ReactNode;
}> = ({ ok, label, children }) => (
  <div
    style={{
      flex: 1,
      border: `1px solid ${ok ? "rgba(52,211,153,0.4)" : "rgba(244,114,182,0.4)"}`,
      background: ok ? "rgba(52,211,153,0.06)" : "rgba(244,114,182,0.06)",
      borderRadius: 20,
      padding: "34px 30px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 22,
    }}
  >
    <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: 2, color: ok ? "#34d399" : "#f472b6" }}>
      {ok ? "✓ " : "✕ "}
      {label}
    </div>
    <div style={{ display: "flex", gap: 30, alignItems: "center" }}>{children}</div>
  </div>
);

export const IconsVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const intro = spring({ frame, fps, config: { damping: 200 } });
  const introOp = band(frame, 0, 86, 14);
  const sConsistency = band(frame, 92, 206);
  const sUse = band(frame, 212, 332);
  const sAvoid = band(frame, 338, 456);
  const sLibrary = band(frame, 462, 510, 14);

  const fourIcons = [PATHS.star, PATHS.heart, PATHS.bell, PATHS.zap];

  return (
    <AbsoluteFill style={{ backgroundColor: "#050507", fontFamily: SANS, color: "#f5f6f7" }}>
      <AbsoluteFill style={{ background: "radial-gradient(900px 500px at 50% 26%, rgba(168,85,247,0.10), transparent 70%)" }} />

      {/* persistent eyebrow */}
      <div style={{ position: "absolute", top: 72, left: 96 }}>
        <Eyebrow />
      </div>

      {/* INTRO */}
      {introOp > 0 && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: introOp }}>
          <div style={{ textAlign: "center", transform: `translateY(${interpolate(intro, [0, 1], [40, 0])}px)` }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 36, marginBottom: 36 }}>
              <StyledIcon d={PATHS.star} variant="gradient" size={120} />
              <StyledIcon d={PATHS.heart} variant="gradient" size={120} />
              <StyledIcon d={PATHS.bell} variant="gradient" size={120} />
            </div>
            <div style={{ fontSize: 110, fontWeight: 800, letterSpacing: -2 }}>Icons</div>
            <div style={{ marginTop: 18, fontSize: 36, color: "#9aa3af" }}>
              Reinforce a concept at a glance — never decoration.
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* CONSISTENCY */}
      {sConsistency > 0 && (
        <AbsoluteFill style={{ justifyContent: "center", padding: "0 110px", opacity: sConsistency }}>
          <div style={{ fontSize: 56, fontWeight: 800, marginBottom: 40, textAlign: "center" }}>
            One style across the whole video
          </div>
          <div style={{ display: "flex", gap: 40 }}>
            <Card ok label="One consistent style">
              {fourIcons.map((d, i) => (
                <StyledIcon key={i} d={d} variant="outline" size={92} />
              ))}
            </Card>
            <Card ok={false} label="Mixed styles">
              {fourIcons.map((d, i) => (
                <StyledIcon key={i} d={d} variant={i % 2 === 0 ? "filled" : "outline"} size={92} />
              ))}
            </Card>
          </div>
        </AbsoluteFill>
      )}

      {/* USE THESE */}
      {sUse > 0 && (
        <AbsoluteFill style={{ justifyContent: "center", padding: "0 110px", opacity: sUse }}>
          <div style={{ fontSize: 56, fontWeight: 800, marginBottom: 40, textAlign: "center" }}>
            Brand-suggested styles
          </div>
          <div style={{ display: "flex", gap: 32 }}>
            {([["Black outline", "outline"], ["Black filled", "filled"], ["Gradient", "gradient"]] as [string, Variant][]).map(
              ([label, v]) => (
                <Card key={label} ok label={label}>
                  <StyledIcon d={PATHS.star} variant={v} size={120} />
                </Card>
              ),
            )}
          </div>
          <div style={{ marginTop: 34, fontSize: 30, color: "#9aa3af", textAlign: "center" }}>
            Choose one per video and keep it consistent.
          </div>
        </AbsoluteFill>
      )}

      {/* AVOID */}
      {sAvoid > 0 && (
        <AbsoluteFill style={{ justifyContent: "center", padding: "0 110px", opacity: sAvoid }}>
          <div style={{ fontSize: 56, fontWeight: 800, marginBottom: 40, textAlign: "center" }}>Avoid these styles</div>
          <div style={{ display: "flex", gap: 32 }}>
            {([["Lineal colour", "lineal"], ["Hand drawn", "hand"], ["Flat", "flat"]] as [string, Variant][]).map(
              ([label, v]) => (
                <Card key={label} ok={false} label={label}>
                  <StyledIcon d={PATHS.star} variant={v} size={120} />
                </Card>
              ),
            )}
          </div>
        </AbsoluteFill>
      )}

      {/* LIBRARY */}
      {sLibrary > 0 && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: sLibrary }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 40, color: "#9aa3af", fontWeight: 600 }}>Source from one library</div>
            <div
              style={{
                marginTop: 18,
                display: "inline-block",
                fontSize: 96,
                fontWeight: 800,
                padding: "10px 44px",
                borderRadius: 22,
                background: "linear-gradient(90deg,#38bdf8,#34d399)",
                color: "#04121a",
              }}
            >
              Flaticon
            </div>
            <div style={{ marginTop: 28, fontSize: 32, color: "#cbd5e1" }}>
              so weight &amp; proportions stay consistent.
            </div>
          </div>
        </AbsoluteFill>
      )}

      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: 5,
          width: `${(frame / (durationInFrames - 1)) * 100}%`,
          background: "linear-gradient(90deg,#a855f7,#38bdf8,#34d399)",
        }}
      />
    </AbsoluteFill>
  );
};
