import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import Character from './_components/character';
import { getCharacterQueryOptions } from '@/features/characters/api/get-character';
export const metadata = {
  title: 'Character',
  description: 'Character',
};

const preloadData = async (characterId: string) => {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(getCharacterQueryOptions(characterId)),
  ]);
  const dehydratedState = dehydrate(queryClient);
  return {
    dehydratedState,
    queryClient,
  };
};

const CharacterPage = async ({
  params,
}: {
  params: Promise<{
    characterId: string;
  }>;
}) => {
  const characterId = (await params).characterId;

  const { dehydratedState, queryClient } = await preloadData(characterId);

  const character = queryClient.getQueryData(
    getCharacterQueryOptions(characterId).queryKey,
  );
  console.log(character);

  if (!character) return <div>Character Not Found</div>;
  return (
    <HydrationBoundary state={dehydratedState}>
      <Character characterId={characterId} />
    </HydrationBoundary>
  );
};

export default CharacterPage;
