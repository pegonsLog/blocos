
export interface Blocos extends Array<Bloco>{}

export interface Bloco {
  id: number;
  name: string;
  region: string;
  linkDOT: string;
  linkMyMaps: string;
}

export interface BirthdaysAPI{
  birthdays: Blocos;
}
