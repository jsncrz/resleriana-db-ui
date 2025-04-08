'use client';

import { env } from '@/config/env';
import { useCharacter } from '../api/get-character';
import { CharacterStatView } from '@/features/character-stat/components/character-stat-view';
import { CharacterResistView } from '@/features/character-resist/components/character-resist-view';

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
    <div className="border-2 border-black dark:border-white rounded-2xl grid grid-flow-row grid-cols-2 gap-4 p-6 md:grid-cols-3">
      <div className="size-full row-span-6 col-span-2 md:col-span-1">
        <img
          className="m-auto max-w-full min-w-1/2 border-2 border-foreground rounded filter-(--profile-filters) lg:w-1/2"
          src={imgUrl + character.id + '_profile.png'}
        ></img>
      </div>
      <div className="flex flex-col row-span-1 col-span-2 gap-6">
        <div className="flex flex-col gap-4 bg-black/20 dark:bg-white/60 p-6 items-center md:flex-row border-b-2 rounded justify-items-stretch">
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
              <p className="font-bold text-2xl text-white dark:text-background text-shadow-(--text-shadow-reverse-custom) ">
                {character.name}
              </p>
              <p className="font-medium text-xl text-white dark:text-background text-shadow-(--text-shadow-reverse-custom) ">
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
        <div className="flex-1 text-center bg-black/20 dark:bg-white/60 p-6 border-y-2 rounded">
          <p className="text-lg italic text-white  dark:text-background">
            {character.acquisitionText}
          </p>
        </div>
        <div className="flex-1 p-6 border-y-2 ">
          <p className="text-2xl italic text-center mb-4">PROFILE</p>
          <p className="text-lg">{character.description}</p>
        </div>
        <div className="flex-1 flex flex-col p-6 border-y-2 lg:flex-row">
          <CharacterStatView characterStatId={characterId}></CharacterStatView>
          <CharacterResistView characterResistId={characterId}></CharacterResistView>
        </div>
      </div>
    </div>
  );
};
