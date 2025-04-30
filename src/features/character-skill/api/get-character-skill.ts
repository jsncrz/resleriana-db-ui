import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { CharacterSkill } from '@/types/api';

export const getCharacterSkill = (
  { characterSkillId }: { characterSkillId: string }
): Promise<CharacterSkill> => {
  return api.get(`/characters/${characterSkillId}/skills`);
};

export const getCharacterSkillQueryOptions = (characterSkillId: string) => {
  return queryOptions({
    queryKey: ['characterSkill', characterSkillId],
    queryFn: () => getCharacterSkill({ characterSkillId })
  });
};

type UseCharacterSkillOptions = {
  characterSkillId: string;
  queryConfig?: QueryConfig<typeof getCharacterSkillQueryOptions>;
};

export const useCharacterSkill = ({
  queryConfig,
  characterSkillId,
}: UseCharacterSkillOptions) => {
  return useQuery({
    ...getCharacterSkillQueryOptions(characterSkillId),
    ...queryConfig,
  });
};
