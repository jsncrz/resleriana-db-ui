'use client';

import { useLocaleStore } from '@/hooks/use-locale';
import { useCharacterTag } from '../api/get-character-tag';

export const CharacterTagList = ({
  characterTagId
}: {
  characterTagId: string;
}) => {
  const { locale } = useLocaleStore();
  const characterTagQuery = useCharacterTag({ characterTagId, locale });

  if (characterTagQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">HELLO</div>
    );
  }

  const characterTag = characterTagQuery.data;

  if (!characterTag) return null;

  return (
    <div className="flex gap-x-4 gap-y-2 flex-wrap">
      {characterTag.map((tag) => {
        return <div key={tag.id} className='shadow-md rounded text-white dark:text-background py-1 px-3 bold bg-black/20 dark:bg-white/60'> {tag.name}</div>;
      })}
    </div>
  );
};
