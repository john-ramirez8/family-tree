export interface Person {
  id: number;
  name: string;
  children: number[];
  gender: string;
  parents: number[];
}

export interface PersonEntity extends Person {
  childrenEntities: PersonEntity[];
}
