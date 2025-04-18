import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { MemoriaStat } from '@/types/api';

export const getMemoriaStat = (
  { memoriaId }: { memoriaId: number }
): Promise<MemoriaStat> => {
  return api.get(`/memorias/${memoriaId}/status`);
};

export const getMemoriaStatQueryOptions = (memoriaId: number) => {
  return queryOptions({
    queryKey: ['memoriaStat', memoriaId],
    queryFn: () => getMemoriaStat({ memoriaId })
  });
};

type UseMemoriaStatOptions = {
  memoriaId: number;
  queryConfig?: QueryConfig<typeof getMemoriaStatQueryOptions>;
};

export const useMemoriaStatus = ({
  queryConfig,
  memoriaId,
}: UseMemoriaStatOptions) => {
  return useQuery({
    ...getMemoriaStatQueryOptions(memoriaId),
    ...queryConfig,
  });
};
