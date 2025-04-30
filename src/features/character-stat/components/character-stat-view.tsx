'use client';

import { useCharacterStat } from '../api/get-character-stat';

type StatEntryProps = {
  label: string;
  value: number;
};

const StatEntry = ({ label, value }: StatEntryProps) => (
  <div className="row-span-1 col-span-1 min-w-full bg-black/30 py-1 px-2 text-white font-light content-center text-lg">
    <div className="flex justify-item-stretch">
      <div className="flex-auto justify-self-start">{label}</div>
      <p className="flex-auto justify-self-end text-end"> {value}</p>
    </div>
  </div>
);
export const CharacterStatView = ({
  characterStatId,
}: {
  characterStatId: string;
}) => {
  const characterStatQuery = useCharacterStat({ characterStatId });

  if (characterStatQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">HELLO</div>
    );
  }

  const characterStat = characterStatQuery.data;

  if (!characterStat) return null;

  return (
    <div className="flex-1 grid grid-flow-col grid-cols-2 grid-rows-4 gap-2">
      <div className="row-span-1 col-span-3 p-2 font-bold text-lg">STATUS</div>
      <StatEntry label="HP" value={characterStat.hp}></StatEntry>
      <StatEntry label="P.ATK" value={characterStat.attack}></StatEntry>
      <StatEntry label="M.ATK" value={characterStat.magic}></StatEntry>
      <StatEntry label="SPD" value={characterStat.speed}></StatEntry>
      <StatEntry label="P.DEF" value={characterStat.defense}></StatEntry>
      <StatEntry label="M.DEF" value={characterStat.mental}></StatEntry>
    </div>
  );
};
