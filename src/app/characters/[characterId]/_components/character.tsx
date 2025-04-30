'use client';

import { CharacterView } from '@/features/characters/components/character-view';

const Character = ({ characterId }: { characterId: string }) => {
  return (
    <div>
      <CharacterView characterId={characterId} />
    </div>
  );
};
export default Character;
