'use client';

import { Ability } from '@/types/api';

export const MemoriaAbilityView = ({ abilities }: { abilities: Ability[] }) => {
  if (abilities.length === 0) {
    return <div>HELLO</div>;
  }
  const abilityValues = abilities
    .map((a) => a.abilityEffects[0].value)
    .sort((x, y) => x - y);
  const ability = abilities[0];
  const percentages = abilityValues
    .map((value) => (value / 100).toFixed(0))
    .join('/');
  const abilityDescriptions: string[] = ability.description.split('{0}');
  return (
    <div className="text-center bg-black/30 dark:bg-white/60 p-6 rounded shadow-md">
      <div className="text-white dark:text-background lg:text-lg font-bold text-shadow-sm">
        {ability.name}
      </div>
      <div className="text-white dark:text-background p-2 text-shadow-sm">
        {abilityDescriptions[0]}
        <span className="font-bold">{percentages}</span>
        {abilityDescriptions?.[1]}
      </div>
    </div>
  );
};
