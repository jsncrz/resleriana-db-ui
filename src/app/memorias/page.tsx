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

const MemoriasPage = async ({
  searchParams,
}: {
  searchParams: {
    rarity: number | undefined;
    page: string | null;
    sort: string | null;
    size: number | undefined;
  };
}) => {
  const queryClient = new QueryClient();
  searchParams = await searchParams;

  await queryClient.prefetchQuery(
    getMemoriasQueryOptions({
      rarity: searchParams.rarity,
      page: searchParams.page ? Number(searchParams.page) : 1,
      size: searchParams.size ? Number(searchParams.size) : 30,
      sort: searchParams.sort || 'releaseDate,desc',
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
