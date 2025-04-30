import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Memoria } from '@/types/api';

export const getMemoria = ({
  memoriaId,
}: {
  memoriaId: string;
}): Promise<Memoria> => {
  return api.get(`/memorias/${memoriaId}`);
};

export const getMemoriaQueryOptions = (memoriaId: string, locale: string) => {
  return queryOptions({
    queryKey: ['memoria', { memoriaId, locale }],
    queryFn: () => getMemoria({ memoriaId }),
  });
};

type UseMemoriaOptions = {
  memoriaId: string;
  locale: string;
  queryConfig?: QueryConfig<typeof getMemoriaQueryOptions>;
};

export const useMemoria = ({
  queryConfig,
  memoriaId,
  locale,
}: UseMemoriaOptions) => {
  return useQuery({
    ...getMemoriaQueryOptions(memoriaId, locale),
    ...queryConfig,
  });
};
