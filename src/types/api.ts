export type BaseEntity = {
  extId: string;
  id: number;
  createDate: Date;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

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
