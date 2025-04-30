import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Character } from '@/types/api';

export const getCharacter = (
  { characterId }: { characterId: string }
): Promise<Character> => {
  return api.get(`/characters/${characterId}`);
};

export const getCharacterQueryOptions = (characterId: string, locale: string) => {
  return queryOptions({
    queryKey: ['character', { characterId, locale }],
    queryFn: () => getCharacter({ characterId })
  });
};

type UseCharacterOptions = {
  characterId: string;
  locale: string;
  queryConfig?: QueryConfig<typeof getCharacterQueryOptions>;
};

export const useCharacter = ({
  queryConfig,
  characterId,
  locale
}: UseCharacterOptions) => {
  return useQuery({
    ...getCharacterQueryOptions(characterId, locale),
    ...queryConfig,
  });
};
