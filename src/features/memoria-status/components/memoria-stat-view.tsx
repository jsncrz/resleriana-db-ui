'use client';

import { Label } from '@radix-ui/react-label';
import { useState } from 'react';

import { Slider } from '@/components/ui/slider';

import { useMemoriaStatus } from '../api/get-memoria-status';

type StatEntryProps = {
  label: string;
  value: number;
};

const StatEntry = ({ label, value }: StatEntryProps) => (
  <>
    <div className="font-bold border-b-1 border-foreground bg-black/30 py-1 px-2 text-white ">
      {label}
    </div>
    <div className="bg-black/30 py-1 px-2 text-white ">
      {(value / 100).toFixed(2)}%
    </div>
  </>
);
export const MemoriaStatusView = ({ memoriaId }: { memoriaId: number }) => {
  const memoriaStatusQuery = useMemoriaStatus({ memoriaId });
  const [level, setLevel] = useState(30);

  if (memoriaStatusQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">HELLO</div>
    );
  }

  const memoriaStatus = memoriaStatusQuery.data;

  if (!memoriaStatus) return null;

  return (
    <>
      <div className="flex gap-2 p-4">
        <Label className="flex-2" htmlFor="level-slider">
          Level
        </Label>
        <Slider
          className="flex-5"
          id="level-slider"
          defaultValue={[level]}
          max={30}
          step={1}
          min={1}
          onValueChange={(e) => setLevel(e[0])}
        />
        <span className="flex-1"> {level}</span>
      </div>

      <div className="grid grid-flow-col grid-cols-6 grid-rows-2 w-90 lg:w-120 rounded-sm overflow-hidden shadow-sm">
        <StatEntry
          label="HP"
          value={memoriaStatus.hp[level - 1].value}
        ></StatEntry>
        <StatEntry
          label="P.ATK"
          value={memoriaStatus.attack[level - 1].value}
        ></StatEntry>
        <StatEntry
          label="M.ATK"
          value={memoriaStatus.magic[level - 1].value}
        ></StatEntry>
        <StatEntry
          label="SPD"
          value={memoriaStatus.speed[level - 1].value}
        ></StatEntry>
        <StatEntry
          label="P.DEF"
          value={memoriaStatus.defense[level - 1].value}
        ></StatEntry>
        <StatEntry
          label="M.DEF"
          value={memoriaStatus.mental[level - 1].value}
        ></StatEntry>
      </div>
    </>
  );
};
