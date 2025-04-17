import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Memoria, Page } from '@/types/api';

export const getMemorias = (
  { rarity, page, sort, size }: { rarity?: number, page?: number, sort?: string, size?: number },
): Promise<{
  content: Memoria[];
  page: Page;
}> => {
  page = (page ?? 1) - 1;
  return api.get(`/memorias`, {
    params: {
      rarity,
      page,
      sort,
      size
    },
  })
};

export const getMemoriasQueryOptions = ({
  rarity,
  locale = 'en',
  page = 1,
  sort,
  size = 40
}: { locale?:string, rarity?: number, page?: number, sort?: string, size?: number } = {}) => {
  return queryOptions({
    queryKey: ['memorias', { rarity, locale, page, sort }],
    queryFn: () => getMemorias({ rarity, page, sort, size }),
  });
};

type UseMemoriasOptions = {
  locale?:string;
  rarity?: number; 
  page?: number;
  sort?: string;
  size?: number
  queryConfig?: QueryConfig<typeof getMemoriasQueryOptions>;
};

export const useMemorias = ({
  queryConfig,
  rarity,
  locale,
  page,
  sort,
  size
}: UseMemoriasOptions) => {
  return useQuery({
    ...getMemoriasQueryOptions({ rarity, locale, page, sort, size }),
    ...queryConfig,
  });
};
