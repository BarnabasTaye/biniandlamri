import React, { useMemo } from 'react';

interface PetalsOverlayProps {
  enabled: boolean;
}

interface PetalItem {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  type: 'petal' | 'jasmine' | 'sparkle' | 'rose';
  color: string;
}

export const PetalsOverlay: React.FC<PetalsOverlayProps> = ({ enabled }) => {
  const petals = useMemo<PetalItem[]>(() => {
    const list: PetalItem[] = [];
    const colors = ['#f4c2cf', '#fcedf1', '#e8a0b4', '#d6b368', '#f8ebd1'];
    const count = 24;

    for (let i = 0; i < count; i++) {
      const isEmoji = i % 4 === 0;
      list.push({
        id: i,
        left: Math.random() * 98,
        size: isEmoji ? 16 + Math.random() * 8 : 10 + Math.random() * 12,
        duration: 12 + Math.random() * 14,
        delay: -Math.random() * 20,
        driftX: (Math.random() * 160) - 80,
        type: isEmoji ? (i % 8 === 0 ? 'jasmine' : 'rose') : (i % 6 === 0 ? 'sparkle' : 'petal'),
        color: colors[i % colors.length],
      });
    }
    return list;
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none"
    >
      {petals.map((p) => {
        if (p.type === 'jasmine') {
          return (
            <span
              key={p.id}
              className="absolute -top-12 animate-petal text-base opacity-75"
              style={{
                left: `${p.left}%`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                ['--drift-x' as string]: `${p.driftX}px`,
                fontSize: `${p.size}px`,
              }}
            >
              🌸
            </span>
          );
        }
        if (p.type === 'rose') {
          return (
            <span
              key={p.id}
              className="absolute -top-12 animate-petal text-sm opacity-70"
              style={{
                left: `${p.left}%`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                ['--drift-x' as string]: `${p.driftX}px`,
                fontSize: `${p.size}px`,
              }}
            >
              🌼
            </span>
          );
        }

        return (
          <div
            key={p.id}
            className="absolute -top-12 animate-petal rounded-[80%_0_80%_0] opacity-65"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size * 1.3}px`,
              backgroundColor: p.color,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              ['--drift-x' as string]: `${p.driftX}px`,
              boxShadow: p.type === 'sparkle' ? '0 0 6px rgba(214,179,104,0.6)' : 'none',
            }}
          />
        );
      })}
    </div>
  );
};
