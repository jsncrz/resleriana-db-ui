import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Character } from '@/types/api';

export const getCharacter = (
  { characterId }: { characterId: string }
): Promise<Character> => {
  return api.get(`/characters/${characterId}`);
};

export const getCharacterQueryOptions = (characterId: string) => {
  return queryOptions({
    queryKey: ['character', characterId],
    queryFn: () => getCharacter({ characterId })
  });
};

type UseCharacterOptions = {
  characterId: string;
  queryConfig?: QueryConfig<typeof getCharacterQueryOptions>;
};

export const useCharacter = ({
  queryConfig,
  characterId,
}: UseCharacterOptions) => {
  return useQuery({
    ...getCharacterQueryOptions(characterId),
    ...queryConfig,
  });
};
