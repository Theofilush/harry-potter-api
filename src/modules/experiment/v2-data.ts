export type House = "Gryffindor" | "Slytherin" | "Hufflepuff" | "Ravenclaw" | null;

export type Gender = "male" | "female" | "nonbinary" | string;

export type Species = "human" | "ghost" | "half-giant" | "werewolf" | "goblin" | "house-elf" | string;

export type Ancestry = "pure-blood" | "half-blood" | "muggleborn" | "squib" | null;

export type Wand = {
  wood: string | null;
  core: string | null;
  length: number | null;
};

export type Character = {
  id: string;
  name: string;
  alternate_names: string[];
  species: Species;
  gender: Gender;
  house: House;
  dateOfBirth: string | null; // format dd-mm-yyyy
  yearOfBirth: number | null;
  wizard: boolean;
  ancestry: Ancestry;
  eyeColour: string | null;
  hairColour: string | null;
  wand: Wand;
  patronus: string | null;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
  actor: string;
  alternate_actors: string[];
  alive: boolean;
  imageUrl: string;
};

export type Characters = Character[];
