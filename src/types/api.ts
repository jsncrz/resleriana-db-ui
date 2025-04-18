export type BaseEntity = {
  extId: string;
  id: number;
  createDate: Date;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type Page = { 
  number: number | null 
  size: number | null
  totalElements: number | null
  totalPages: number | null
}
/*
-------------------------- CHARACTERS --------------------------
*/
export type Character = Entity<{
  name: string;
  anotherName: string;
  fullName: string;
  acquisitionText: string;
  description: string;
  alchemist: string;
  attackAttribute: string;
  role: string;
  initialRarity: number;
}>;

export type CharacterStat = Entity<{
  name: string;
  attack: number;
  defense: number;
  hp: number;
  magic: number;
  mental: number;
  speed: number;
}>;

export type CharacterResist = Entity<{
  fire: number;
  ice: number;
  bolt: number;
  air: number;
  slash: number;
  strike: number;
  stab: number;
}>;


export type CharacterTag = Entity<{
  id: number;
  name: string;
}>;

/*
-------------------------- MEMORIAS --------------------------
*/

export type Memoria = Entity<{
  name: string;
  description: string;
  rarity: string;
}>;

export type MemoriaGrowth = {
  level: number;
  value: number
}

export type MemoriaStat = Entity<{
  attack: MemoriaGrowth[];
  defense: MemoriaGrowth[];
  hp: MemoriaGrowth[];
  magic: MemoriaGrowth[];
  mental: MemoriaGrowth[];
  speed: MemoriaGrowth[];
}>;
