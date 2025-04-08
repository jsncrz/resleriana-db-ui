'use client';

import { useCharacterResist } from '../api/get-character-resist';

type ResistEntryProps = {
  label: string;
  value: number;
};

const ResistEntry = ({ label, value }: ResistEntryProps) => (
  <div className="row-span-1 col-span-1 min-w-full bg-black/30 px-1 px-2 text-white font-light content-center text-lg">
    <div className="flex justify-item-stretch">
      <div className="flex-auto justify-self-start flex gap-2">
        <img
          className="size-[30px]"
          src={'/assets/elements/' + label + '.png'}
        ></img>
        {label}
      </div>
      <p className="flex-auto justify-self-end text-end"> {value * 10}%</p>
    </div>
  </div>
);
export const CharacterResistView = ({
  characterResistId,
}: {
  characterResistId: string;
}) => {
  const characterResistQuery = useCharacterResist({ characterResistId });

  if (characterResistQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">HELLO</div>
    );
  }

  const characterResist = characterResistQuery.data;

  if (!characterResist) return null;

  return (
    <div className="flex-1 grid grid-flow-col grid-cols-2 grid-rows-5">
      <div className="row-span-1 col-span-3 p-2 font-bold text-lg">RESIST</div>
      <ResistEntry label="Fire" value={characterResist.fire}></ResistEntry>
      <ResistEntry label="Ice" value={characterResist.ice}></ResistEntry>
      <ResistEntry label="Bolt" value={characterResist.bolt}></ResistEntry>
      <ResistEntry label="Air" value={characterResist.air}></ResistEntry>
      <ResistEntry label="Slash" value={characterResist.slash}></ResistEntry>
      <ResistEntry label="Strike" value={characterResist.strike}></ResistEntry>
      <ResistEntry label="Stab" value={characterResist.stab}></ResistEntry>
      <div className="row-span-1 col-span-1 bg-black/30 "></div>

    </div>
  );
};
