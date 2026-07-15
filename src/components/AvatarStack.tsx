// src/components/AvatarStack.tsx
const COLORS = ["#2F5233", "#C98A2B", "#3F6478", "#8B5E83"];

function colorFor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
}

export function AvatarStack({ people, max = 4 }: { people: { id: string; username: string }[]; max?: number }) {
  const shown = people.slice(0, max);
  const overflow = people.length - shown.length;

  return (
    <div className="flex items-center">
      {shown.map((p, i) => (
        <div
          key={p.id}
          className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-semibold border-2"
          style={{
            backgroundColor: colorFor(p.id),
            borderColor: "#FFFFFF",
            marginLeft: i === 0 ? 0 : -8,
          }}
          title={p.username}
        >
          {p.username.charAt(0).toUpperCase()}
        </div>
      ))}
      {overflow > 0 && (
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold border-2"
          style={{ backgroundColor: "#E0E3D6", color: "#5A6558", borderColor: "#FFFFFF", marginLeft: -8 }}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}