"use client"

/**
 * Animated single-line-diagram style backdrop.
 *
 * Orthogonal bus traces draw themselves in, then carry slow-moving current
 * packets past a handful of schematic symbols (motor, transformer, breaker,
 * resistor). Pure SVG + CSS keyframes, so it costs nothing at runtime and
 * honours the global reduced-motion rule.
 */

const traces = [
  "M -40 170 H 250 L 310 230 H 630 L 690 178 H 1010 L 1070 246 H 1480",
  "M -40 726 H 190 L 250 664 H 530 L 590 726 H 910 L 970 662 H 1480",
  "M 132 -40 V 248 L 192 308 V 566 L 132 626 V 940",
  "M 1312 -40 V 306 L 1252 366 V 646 L 1312 706 V 940",
  "M 392 940 V 706 L 452 646 V 424 L 392 364 V 124 L 452 64 V -40",
]

const nodes = [
  { x: 250, y: 170, d: "0s" },
  { x: 690, y: 178, d: "0.7s" },
  { x: 1070, y: 246, d: "1.4s" },
  { x: 190, y: 726, d: "2.1s" },
  { x: 590, y: 726, d: "0.4s" },
  { x: 970, y: 662, d: "1.1s" },
  { x: 192, y: 308, d: "1.8s" },
  { x: 1252, y: 366, d: "2.5s" },
  { x: 452, y: 424, d: "0.9s" },
  { x: 1312, y: 706, d: "1.6s" },
]

export function WireframeBackdrop({
  className = "",
}: {
  className?: string
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Bus traces */}
      <g stroke="#0c0a34" strokeOpacity="0.09" strokeWidth="1.5">
        {traces.map((d, i) => (
          <path
            key={d}
            d={d}
            className="wf-trace"
            style={{ animationDelay: `${i * 0.25}s` }}
          />
        ))}
      </g>

      {/* Current packets travelling the same traces */}
      <g stroke="#1B0F56" strokeOpacity="0.28" strokeWidth="2.5">
        {traces.map((d, i) => (
          <path
            key={d}
            d={d}
            className="wf-packet"
            style={{ animationDelay: `${i * -1.8}s` }}
          />
        ))}
      </g>

      {/* Junction nodes */}
      <g fill="#1B0F56" fillOpacity="0.55">
        {nodes.map((n) => (
          <circle
            key={`${n.x}-${n.y}`}
            cx={n.x}
            cy={n.y}
            r="3.5"
            className="wf-node"
            style={{ animationDelay: n.d }}
          />
        ))}
      </g>

      <g stroke="#0c0a34" strokeOpacity="0.11" strokeWidth="1.5">
        {/* Motor */}
        <g transform="translate(760 460)">
          <circle r="46" />
          <circle
            r="34"
            strokeOpacity="0.55"
            strokeDasharray="6 10"
            className="wf-spin"
          />
          <path d="M -46 0 H -86 M 46 0 H 86 M 0 -46 V -86" />
          <text
            x="0"
            y="8"
            textAnchor="middle"
            fontSize="26"
            fontFamily="ui-monospace, monospace"
            fill="#0c0a34"
            fillOpacity="0.16"
            stroke="none"
          >
            M
          </text>
        </g>

        {/* Transformer */}
        <g transform="translate(300 462)">
          <circle cy="-16" r="26" />
          <circle cy="16" r="26" />
          <path d="M 0 -74 V -42 M 0 42 V 74" />
        </g>

        {/* Breaker */}
        <g transform="translate(1096 620)">
          <rect x="-22" y="-30" width="44" height="60" />
          <path d="M -14 22 L 14 -22 M 0 -30 V -58 M 0 30 V 58" />
        </g>

        {/* Resistor */}
        <g transform="translate(556 236)">
          <path d="M -70 0 H -34 l 7 -13 l 14 26 l 14 -26 l 14 26 l 14 -26 l 7 13 H 70" />
        </g>

        {/* Dimension line */}
        <g strokeOpacity="0.08">
          <path d="M 132 830 H 392 M 132 820 V 840 M 392 820 V 840" />
          <path d="M 1096 118 H 1312 M 1096 108 V 128 M 1312 108 V 128" />
        </g>

        {/* Reticles */}
        <g strokeOpacity="0.08">
          <g transform="translate(1010 178)">
            <circle r="16" />
            <path d="M -26 0 H -6 M 6 0 H 26 M 0 -26 V -6 M 0 6 V 26" />
          </g>
          <g transform="translate(452 646)">
            <circle r="16" />
            <path d="M -26 0 H -6 M 6 0 H 26 M 0 -26 V -6 M 0 6 V 26" />
          </g>
        </g>
      </g>
    </svg>
  )
}
