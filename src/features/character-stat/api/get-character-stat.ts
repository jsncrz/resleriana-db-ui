import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { CharacterStat } from '@/types/api';

export const getCharacterStat = (
  { characterStatId }: { characterStatId: string }
): Promise<CharacterStat> => {
  return api.get(`/characters/${characterStatId}/stat`);
};

export const getCharacterStatQueryOptions = (characterStatId: string) => {
  return queryOptions({
    queryKey: ['characterStat', characterStatId],
    queryFn: () => getCharacterStat({ characterStatId })
  });
};

type UseCharacterStatOptions = {
  characterStatId: string;
  queryConfig?: QueryConfig<typeof getCharacterStatQueryOptions>;
};

export const useCharacterStat = ({
  queryConfig,
  characterStatId,
}: UseCharacterStatOptions) => {
  return useQuery({
    ...getCharacterStatQueryOptions(characterStatId),
    ...queryConfig,
  });
};
