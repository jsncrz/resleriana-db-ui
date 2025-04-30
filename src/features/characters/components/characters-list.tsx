'use client';

import { env } from '@/config/env';
import { useCharacters } from '../api/get-characters';
import { useRouter } from 'next/navigation';
import { Character } from '@/types/api';
import { useLocaleStore } from '@/hooks/use-locale';

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
    className={`overflow-hidden h-full content-center cursor-pointer max-w-md rounded-3xl p-5px drop-shadow-lg/25 transition-[scale,box-shadow] duration-300 
            ease-in-out hover:scale-103 hover:shadow-glow bg-gradient-to-b ${gradientColor}`}
  >
    <img 
      className="size-[50px] absolute top-1 left-0"
      src={
        '/assets/elements/' + character.attackAttribute.toLowerCase() + '.png'
      }
    ></img>
    <img 
      className="size-[45px] absolute top-1 right-0"
      src={
        '/assets/role/' + character.role.toLowerCase() + '_simple.png'
      }
    ></img>
    <img className="w-full bg-white/50 " src={imgUrl + character.id + '_icon.png'}></img>
    <div className="border-t-1 border-foreground rounded-b-3xl p-3 text-center">
      <span className=" text-white text-md lg:text-lg font-bold text-shadow-md">
        {character.name}
      </span>
      <br />
      <span className="text-white text-sm lg:text-md text-shadow-sm">
        {character.anotherName}
      </span>
    </div>
  </div>
);

export const CharactersList = ({}: CharactersListProps) => {
  const router = useRouter();
  const imgUrl = env.IMAGE_URL;
  const { locale } = useLocaleStore();
  const attributeVariants = {
    fire: 'from-fire-dark/45 to-fire-light/45 hover:shadow-fire-light/50',
    ice: 'from-ice-dark/45 to-ice-light/45 hover:shadow-ice-light/50',
    bolt: 'from-bolt-dark/45 to-bolt-light/45 hover:shadow-bolt-light/50',
    air: 'from-air-dark/45 to-air-light/45 hover:shadow-air-light/50',
    strike:
      'from-strike-dark/45 to-strike-light/45 hover:shadow-strike-light/50',
    slash:
      'from-slash-dark/45 to-slash-light/45 hover:shadow-slash-light/50',
    stab: 'from-stab-dark/45 to-stab-light/45 hover:shadow-stab-light/50',
  };

  const charactersQuery = useCharacters({locale});
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
