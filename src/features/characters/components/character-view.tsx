'use client';

import { env } from '@/config/env';
import { useCharacter } from '../api/get-character';
import { CharacterStatView } from '@/features/character-stat/components/character-stat-view';
import { CharacterResistView } from '@/features/character-resist/components/character-resist-view';
import { useLocaleStore } from '@/hooks/use-locale';
import { CharacterTagList } from '@/features/character-tag/components/character-tag-list';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const CharacterView = ({ characterId }: { characterId: string }) => {
  const { locale } = useLocaleStore();
  const characterQuery = useCharacter({ characterId, locale });
  const imgUrl = env.IMAGE_URL;

  if (characterQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">HELLO</div>
    );
  }

  const character = characterQuery.data;

  if (!character) return null;

  return (
    <div className="bg-foreground/10 drop-shadow-xl rounded-md grid grid-flow-row grid-cols-2 gap-4 p-6 md:grid-cols-3">
      <div className="size-full row-span-6 col-span-2 md:col-span-1 md:border-r-2">
        <div className="m-auto max-w-full min-w-1/2 bg-white/60 dark:bg-black/20 ring-3 rounded rounded-t-4xl lg:w-1/2 overflow-hidden">
          <img
            className="w-full filter-(--profile-filters)"
            src={imgUrl + character.id + '_profile.png'}
          ></img>
        </div>
      </div>
      <div className="flex flex-col row-span-1 col-span-2">
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger className='hover:none text-xl'>
              Profile
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4 bg-black/20 dark:bg-white/60 p-6 items-center md:flex-row border-b-2 rounded shadow-md justify-items-stretch">
                  {/* START OF NAME  */}
                  <div className="flex-none flex content-center">
                    <img
                      className="size-[50px]"
                      src={
                        '/assets/role/' + character.role.toLowerCase() + '.png'
                      }
                    ></img>
                    <img
                      className="size-[50px]"
                      src={
                        '/assets/elements/' +
                        character.attackAttribute.toLowerCase() +
                        '.png'
                      }
                    ></img>
                  </div>
                  <div className="flex-2 gap-2 justify-self-start">
                    <div className="flex-1">
                      <p className="font-bold text-2xl text-white dark:text-background text-shadow-(--text-shadow-custom) ">
                        {character.name}
                      </p>
                      <p className="font-medium text-xl text-white dark:text-background text-shadow-(--text-shadow-custom) ">
                        {character.anotherName}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 flex gap-6 justify-self-start">
                    <p className="italic font-bold text-2xl text-shadow-(--text-shadow-custom)">
                      {character.fullName}
                    </p>
                  </div>
                  {/* END OF NAME */}
                </div>
                <div className="flex">
                  <CharacterTagList
                    characterTagId={characterId}
                  ></CharacterTagList>
                </div>
                <div className="flex-1 text-center bg-black/20 dark:bg-white/60 p-6 border-y-2 rounded shadow-md">
                  <p className="text-lg italic text-white  dark:text-background">
                    {character.acquisitionText}
                  </p>
                </div>
                <div className="flex-1 p-6 border-y-2 ">
                  <p className="text-2xl italic text-center mb-4">PROFILE</p>
                  <p className="text-lg">{character.description}</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex-1 flex flex-col p-6 border-y-2 lg:flex-row">
          <CharacterStatView characterStatId={characterId}></CharacterStatView>
          <CharacterResistView
            characterResistId={characterId}
          ></CharacterResistView>
        </div>
      </div>
    </div>
  );
};
