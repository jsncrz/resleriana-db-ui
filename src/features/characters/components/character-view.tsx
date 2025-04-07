'use client';

import { env } from '@/config/env';
import { useCharacter } from '../api/get-character';
import { CharacterStatView } from '@/features/character-stat/components/character-stat-view';

export const CharacterView = ({ characterId }: { characterId: string }) => {
  const characterQuery = useCharacter({ characterId });
  const imgUrl = env.IMAGE_URL;

  if (characterQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">HELLO</div>
    );
  }

  const character = characterQuery.data;

  if (!character) return null;

  return (
    <div className="bg-white/60 dark:bg-black/20 grid grid-flow-row grid-cols-2 gap-4 p-6 md:grid-cols-3">
      <div className="size-full row-span-6 col-span-2 md:col-span-1">
        <img
          className="border-2 border-foreground rounded-xl saturate-125 bg-background/80"
          src={imgUrl + /*character.id*/ '43107' + '_full.png'}
        ></img>
      </div>
      <div className="flex flex-col row-span-1 col-span-2 gap-6">
        <div className="flex flex-col gap-4 bg-foreground/45 p-6 items-center md:flex-row border-b-2 justify-items-stretch">
          <div className="flex-2 flex gap-2 justify-self-start">
            <div className="flex-none content-center">
              <img
                className="size-[50px]"
                src={'/assets/role/' + character.role.toLowerCase() + '.png'}
              ></img>
            </div>
            <div className="flex-none content-center">
              <img
                className="size-[50px]"
                src={
                  '/assets/elements/' +
                  character.attackAttribute.toLowerCase() +
                  '.png'
                }
              ></img>
            </div>
            <div className="flex-none">
              <p className="font-bold text-2xl text-background text-shadow-(--text-shadow-reverse-custom) ">
                {character.name}
              </p>
              <p className="font-medium text-xl text-background text-shadow-(--text-shadow-reverse-custom) ">
                {character.anotherName}
              </p>
            </div>
          </div>
          <div className="flex-1 flex gap-6 justify-self-start">
            <div className="flex-none content-center">
              <p className="italic font-bold text-2xl text-shadow-(--text-shadow-custom)">
                {character.fullName}
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 text-center bg-foreground/45 p-6 border-y-2">
          <p className="text-lg italic text-background">
            {character.acquisitionText}
          </p>
        </div>
        <div className="flex-1 p-6 border-y-2">
          <p className="text-2xl italic text-center mb-4">PROFILE</p>
          <p className="text-lg italic">{character.description}</p>
        </div>
        <div className="flex-1 flex flex-col p-6 border-y-2 lg:flex-row">
          <CharacterStatView characterStatId={characterId}></CharacterStatView>
          <div className='flex-1'></div>
        </div>
      </div>
    </div>
  );
};
