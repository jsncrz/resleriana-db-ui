import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { CharacterResist } from '@/types/api';

export const getCharacterResist = ({
  characterResistId,
}: {
  characterResistId: string;
}): Promise<CharacterResist> => {
  return api.get(`/characters/${characterResistId}/resist`);
};

export const getCharacterResistQueryOptions = (characterResistId: string) => {
  return queryOptions({
    queryKey: ['characterResist', characterResistId],
    queryFn: () => getCharacterResist({ characterResistId }),
  });
};

type UseCharacterResistOptions = {
  characterResistId: string;
  queryConfig?: QueryConfig<typeof getCharacterResistQueryOptions>;
};

export const useCharacterResist = ({
  queryConfig,
  characterResistId,
}: UseCharacterResistOptions) => {
  return useQuery({
    ...getCharacterResistQueryOptions(characterResistId),
    ...queryConfig,
  });
};
