import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Character } from '@/types/api';

export const getCharacters = (): Promise<Character[]> => {
  return api.get(`/characters`, {});
};

export const getCharactersQueryOptions = ({
  locale = 'en',
}: { locale?: string } = {}) => {
  return queryOptions({
    queryKey: ['characters', { locale }],
    queryFn: () => getCharacters(),
  });
};

type UseCharactersOptions = {
  locale: string;
  queryConfig?: QueryConfig<typeof getCharactersQueryOptions>;
};

export const useCharacters = ({
  queryConfig,
  locale,
}: UseCharactersOptions) => {
  return useQuery({
    ...getCharactersQueryOptions({ locale }),
    ...queryConfig,
  });
};
