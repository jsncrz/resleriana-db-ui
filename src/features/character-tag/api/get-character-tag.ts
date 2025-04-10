import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { CharacterTag } from '@/types/api';

export const getCharacterTag = (
  { characterTagId }: { characterTagId: string }
): Promise<CharacterTag[]> => {
  return api.get(`/characters/${characterTagId}/tags`);
};

export const getCharacterTagQueryOptions = (characterTagId: string, locale: string) => {
  return queryOptions({
    queryKey: ['characterTag', { characterTagId, locale }],
    queryFn: () => getCharacterTag({ characterTagId })
  });
};

type UseCharacterTagOptions = {
  characterTagId: string;
  locale: string;
  queryConfig?: QueryConfig<typeof getCharacterTagQueryOptions>;
};

export const useCharacterTag = ({
  queryConfig,
  characterTagId,
  locale,
}: UseCharacterTagOptions) => {
  return useQuery({
    ...getCharacterTagQueryOptions(characterTagId, locale),
    ...queryConfig,
  });
};
