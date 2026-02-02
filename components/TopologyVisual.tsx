import React from 'react';
import { TopologyType } from '../types';

interface Props {
  type: TopologyType;
  className?: string;
}

export const TopologyVisual: React.FC<Props> = ({ type, className = "w-64 h-64" }) => {
  const commonClasses = "stroke-white stroke-2 fill-game-primary";
  const lineClasses = "stroke-white stroke-2";

  if (type === 'star') {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <line x1="100" y1="100" x2="100" y2="20" className={lineClasses} />
        <line x1="100" y1="100" x2="180" y2="100" className={lineClasses} />
        <line x1="100" y1="100" x2="100" y2="180" className={lineClasses} />
        <line x1="100" y1="100" x2="20" y2="100" className={lineClasses} />
        {/* Hub */}
        <rect x="80" y="80" width="40" height="40" rx="4" className="fill-game-accent stroke-none" />
        {/* Nodes */}
        <circle cx="100" cy="20" r="15" className={commonClasses} />
        <circle cx="180" cy="100" r="15" className={commonClasses} />
        <circle cx="100" cy="180" r="15" className={commonClasses} />
        <circle cx="20" cy="100" r="15" className={commonClasses} />
      </svg>
    );
  }

  if (type === 'bus') {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        {/* Backbone */}
        <line x1="10" y1="100" x2="190" y2="100" className="stroke-game-accent stroke-4" strokeWidth="4" />
        {/* Drops */}
        <line x1="40" y1="100" x2="40" y2="60" className={lineClasses} />
        <line x1="90" y1="100" x2="90" y2="140" className={lineClasses} />
        <line x1="140" y1="100" x2="140" y2="60" className={lineClasses} />
        {/* Nodes */}
        <rect x="25" y="30" width="30" height="30" className={commonClasses} />
        <rect x="75" y="140" width="30" height="30" className={commonClasses} />
        <rect x="125" y="30" width="30" height="30" className={commonClasses} />
      </svg>
    );
  }

  if (type === 'ring') {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="70" className="stroke-game-accent fill-none stroke-2" />
        {/* Nodes */}
        <circle cx="100" cy="30" r="15" className={commonClasses} />
        <circle cx="170" cy="100" r="15" className={commonClasses} />
        <circle cx="100" cy="170" r="15" className={commonClasses} />
        <circle cx="30" cy="100" r="15" className={commonClasses} />
      </svg>
    );
  }

  if (type === 'mesh') {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        {/* Connections */}
        <line x1="50" y1="50" x2="150" y2="50" className="stroke-white/30 stroke-1" />
        <line x1="150" y1="50" x2="150" y2="150" className="stroke-white/30 stroke-1" />
        <line x1="150" y1="150" x2="50" y2="150" className="stroke-white/30 stroke-1" />
        <line x1="50" y1="150" x2="50" y2="50" className="stroke-white/30 stroke-1" />
        <line x1="50" y1="50" x2="150" y2="150" className="stroke-white/30 stroke-1" />
        <line x1="150" y1="50" x2="50" y2="150" className="stroke-white/30 stroke-1" />
        
        {/* Nodes */}
        <circle cx="50" cy="50" r="15" className={commonClasses} />
        <circle cx="150" cy="50" r="15" className={commonClasses} />
        <circle cx="150" cy="150" r="15" className={commonClasses} />
        <circle cx="50" cy="150" r="15" className={commonClasses} />
      </svg>
    );
  }

  return null;
};