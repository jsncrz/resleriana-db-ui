'use client';

import { useCharacter } from '@/features/characters/api/get-character';
import { CharacterView } from '@/features/characters/components/character-view';

const Character = ({ characterId }: { characterId: string }) => {
  const character = useCharacter({ characterId });

  return (
    <div>
      <CharacterView characterId={characterId} />
    </div>
  );
};
export default Character;
