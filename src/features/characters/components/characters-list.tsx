'use client';

import { env } from '@/config/env';
import { useCharacters } from '../api/get-characters';
import { useRouter, useSearchParams } from 'next/navigation';
import { Character } from '@/types/api';

export type CharactersListProps = {};

type CharacterEntryProps = {
  imgUrl: string;
  character: Character;
  onClickEvent: () => void;
  gradientColor: string;
};

const CharacterEntry = ({
  imgUrl,
  character,
  onClickEvent,
  gradientColor,
}: CharacterEntryProps) => (
  <div
    onClick={onClickEvent}
    key={character.id}
    className={`h-full content-center cursor-pointer max-w-md rounded-3xl p-5px transition-[scale,box-shadow,border-width] duration-300 
            ease-in-out hover:scale-105 hover:shadow-lg hover:border-4 border-3 border-foreground bg-gradient-to-b ${gradientColor}`}
  >
    <div className={`rounded-[calc(1.5rem-1px)] p-5 items-center text-center`}>
      <img
        className="size-full border-2 border-foreground rounded-xl"
        src={imgUrl + character.id + '_icon.png'}
      ></img>
      <span className="text-md lg:text-lg font-bold antialiased text-shadow-md text-shadow-background/50">
        {character.name}
      </span>
      <br />
      <span className="text-sm lg:text-md antialiased text-shadow-sm text-shadow-background/50">
        {character.anotherName}
      </span>
    </div>
  </div>
);

export const CharactersList = ({}: CharactersListProps) => {
  const router = useRouter();
  const imgUrl = env.IMAGE_URL;
  const searchParams = useSearchParams();
  const locale = searchParams?.get('locale')
    ? String(searchParams.get('locale'))
    : 'en';

  const charactersQuery = useCharacters({
    locale: locale,
  });
  if (charactersQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">HELLO</div>
    );
  }

  const characters = charactersQuery.data;

  if (!characters) return null;

  return (
    <div className="grid grid-cols-3 lg:grid-cols-6 gap-8 items-center">
      {characters.map((chara) => {
        const attributeVariants = {
          fire: 'from-fire-dark/25 to-fire-light/25 hover:shadow-fire-light/20',
          ice: 'from-ice-dark/25 to-ice-light/25 hover:shadow-ice-light/20',
          bolt: 'from-bolt-dark/25 to-bolt-light/25 hover:shadow-bolt-light/20',
          air: 'from-air-dark/25 to-air-light/25 hover:shadow-air-light/20',
          strike:
            'from-strike-dark/25 to-strike-light/25 hover:shadow-strike-light/20',
          slash:
            'from-slash-dark/25 to-slash-light/25 hover:shadow-slash-light/20',
          stab: 'from-stab-dark/25 to-stab-light/25 hover:shadow-stab-light/20',
        };
        const attribute =
          chara.attackAttribute.toLocaleLowerCase() as keyof typeof attributeVariants;
        return (
          <CharacterEntry
            key={chara.id}
            character={chara}
            gradientColor={attributeVariants[attribute]}
            imgUrl={imgUrl}
            onClickEvent={() => router.push(`/characters/${chara.id}`)}
          ></CharacterEntry>
        );
      })}
    </div>
  );
};
