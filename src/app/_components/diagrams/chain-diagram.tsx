// src/app/_components/diagrams/chain-diagram.tsx
// ※ "use client" は不要（フック未使用のためRSCでOK）

type Props = {
  /** 図のキャプション（上部に表示） */
  title?: string;
  /** 上から順に表示するノード名（商流） */
  nodes: string[];
  /** 図の右下に薄く入れる注釈（任意） */
  note?: string;
  /** 実働層として強調するノードindex（0始まり） */
  activeIndexes?: number[];
  /** 中抜き層として薄色にするノードindex（0始まり） */
  mutedIndexes?: number[];
  /** 図の横幅（px）。省略時は親に追従（100%） */
  width?: number;
};

export default function ChainDiagram({
  title = "商流図",
  nodes,
  note = "",
  activeIndexes = [],
  mutedIndexes = [],
  width,
}: Props) {
  const boxWidth = 520;
  const boxHeight = 40;
  const gap = 24;
  const padding = 16;
  const innerW = boxWidth + padding * 2;
  const innerH = nodes.length * (boxHeight + gap) + padding * 2 - gap;

  const yOf = (i: number) => padding + i * (boxHeight + gap);
  const isActive = (i: number) => activeIndexes.includes(i);
  const isMuted = (i: number) => mutedIndexes.includes(i);

  const fillOf = (i: number) =>
    isActive(i) ? "#d1fae5" : isMuted(i) ? "#f3f4f6" : "#e0f2fe"; // active=緑, muted=灰, 通常=水色
  const strokeOf = (i: number) =>
    isActive(i) ? "#10b981" : isMuted(i) ? "#9ca3af" : "#38bdf8";

  return (
    <figure className="my-6">
      {title && <figcaption className="text-sm text-gray-600 mb-2">{title}</figcaption>}

      <svg
        width={width ? `${width}px` : "100%"}
        viewBox={`0 0 ${innerW} ${innerH}`}
        role="img"
        aria-label={title}
      >
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" />
          </marker>
        </defs>

        {nodes.map((label, i) => {
          const x = padding;
          const y = yOf(i);
          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={boxWidth}
                height={boxHeight}
                rx={8}
                fill={fillOf(i)}
                stroke={strokeOf(i)}
              />
              <text
                x={x + 12}
                y={y + 26}
                fontSize={14}
                style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}
              >
                {label}
              </text>

              {i < nodes.length - 1 && (
                <line
                  x1={x + boxWidth / 2}
                  y1={y + boxHeight}
                  x2={x + boxWidth / 2}
                  y2={y + boxHeight + gap - 6}
                  stroke="#6b7280"
                  strokeWidth={1.5}
                  markerEnd="url(#arrow)"
                />
              )}
            </g>
          );
        })}

        {note && (
          <text
            x={padding}
            y={innerH - 6}
            fontSize={12}
            fill="#6b7280"
            style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}
          >
            {note}
          </text>
        )}
      </svg>

      <div className="mt-2 flex items-center gap-4 text-xs text-gray-600">
        <span className="inline-flex items-center gap-1">
          <span
            className="inline-block w-3 h-3 rounded border"
            style={{ background: "#d1fae5", borderColor: "#10b981" }}
          />
          実働層
        </span>
        <span className="inline-flex items-center gap-1">
          <span
            className="inline-block w-3 h-3 rounded border"
            style={{ background: "#f3f4f6", borderColor: "#9ca3af" }}
          />
          中間層
        </span>
        <span className="inline-flex items-center gap-1">
          <span
            className="inline-block w-3 h-3 rounded border"
            style={{ background: "#e0f2fe", borderColor: "#38bdf8" }}
          />
          発注者
        </span>
      </div>
    </figure>
  );
}
