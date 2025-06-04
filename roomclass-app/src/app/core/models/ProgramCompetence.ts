import { RAProgram } from "./RAProgram";

export interface ProgramCompetence {
  id: number;
  proCompDescription: string;
  proCompLevel: string;
}
export interface ProgramCompetenceRAResponse {
  competenceProgram: ProgramCompetence;
  RA_Program: RAProgram[];
}