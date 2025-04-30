'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCharacterSkill } from '../api/get-character-skill';

export const CharacterSkillView = ({
  characterSkillId,
}: {
  characterSkillId: string;
}) => {
  const characterSkillQuery = useCharacterSkill({ characterSkillId });

  if (characterSkillQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">HELLO</div>
    );
  }

  const characterSkill = characterSkillQuery.data;
  console.log(characterSkill);
  if (!characterSkill) return null;
  const skill1 = characterSkill.skill1;
  const skill2 = characterSkill.skill2;
  const burstSkill = characterSkill.burstSkill;
  return (
    <div className="">
      <div className=" p-2 font-bold text-lg">SKILLS</div>
      <Tabs defaultValue="skill1">
        <TabsList className="text-center">
          <TabsTrigger value="skill1">Skill 1</TabsTrigger>
          <TabsTrigger value="skill2">Skill 2</TabsTrigger>
          <TabsTrigger value="burstSkill">Burst Skill</TabsTrigger>
        </TabsList>
        <TabsContent value="skill1">
          <div className="text-center bg-black/30 dark:bg-white/60 p-6 rounded shadow-md">
            <div className="text-white dark:text-background lg:text-lg font-bold text-shadow-sm">
              {skill1[0].name}
            </div>
            <div className="text-white dark:text-background p-2 text-shadow-sm">
              {skill1[0].description}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="skill2">
          <div className="text-center bg-black/30 dark:bg-white/60 p-6 rounded shadow-md">
            <div className="text-white dark:text-background lg:text-lg font-bold text-shadow-sm">
              {skill2[0].name}
            </div>
            <div className="text-white dark:text-background p-2 text-shadow-sm">
              {skill2[0].description}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="burstSkill">
          <div className="text-center bg-black/30 dark:bg-white/60 p-6 rounded shadow-md">
            <div className="text-white dark:text-background lg:text-lg font-bold text-shadow-sm">
              {burstSkill[0].name}
            </div>
            <div className="text-white dark:text-background p-2 text-shadow-sm">
              {burstSkill[0].description}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
