import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { getCharactersQueryOptions } from '@/features/characters/api/get-characters';

import Characters from './_components/characters';
export const metadata = {
  title: 'Characters',
  description: 'Characters',
};

const CharactersPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getCharactersQueryOptions({}));
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Characters />
    </HydrationBoundary>
  );
};

export default CharactersPage;
