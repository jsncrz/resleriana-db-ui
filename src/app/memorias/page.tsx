import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { getMemoriasQueryOptions } from '@/features/memorias/api/get-memorias';

import Memorias from './_components/memorias';
export const metadata = {
  title: 'Memorias',
  description: 'Memorias',
};
type Params = Promise<{
    rarity: number | undefined;
    page: string | null;
    sort: string | null;
    size: number | undefined;
  }>;

const MemoriasPage = async ({
  searchParams,
}: {
  searchParams: Params;
}) => {
  const queryClient = new QueryClient();
  const { rarity, page, sort, size } = await searchParams;

  await queryClient.prefetchQuery(
    getMemoriasQueryOptions({
      rarity: rarity,
      page: page ? Number(page) : 1,
      size: size ? Number(size) : 30,
      sort: sort || 'releaseDate,desc',
    }),
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Memorias />
    </HydrationBoundary>
  );
};

export default MemoriasPage;
