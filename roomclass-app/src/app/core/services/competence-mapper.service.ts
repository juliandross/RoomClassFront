import { Injectable } from '@angular/core';
import { SubjectCompetenceWrapper, SubjectRA } from '../models/subject';
import { ProgramCompetenceRAResponse } from '../models/ProgramCompetence';

// Define las interfaces de destino en el mismo archivo o en un archivo de modelos separado
export interface Competence {
  id:number;  
  description: string;
}

export interface RA {
  id:number;
  description: string;
}

export interface CompetenceWrapper {
    competence: Competence;
    ras: RA[];
}

@Injectable({
    providedIn: 'root' // Esto hace que el servicio esté disponible en toda la aplicación
})
export class CompetenceMapperService {

    constructor() { }

    /**
     * Mapea una estructura SubjectCompetenceWrapper a CompetenceWrapper.
     * @param subjectCompetenceWrapper El objeto SubjectCompetenceWrapper a mapear.
     * @returns Un objeto CompetenceWrapper mapeado.
     */
    mapSubjectCompetenceToCompetenceWrapper(
        subjectCompetenceWrapper: SubjectCompetenceWrapper
    ): CompetenceWrapper {
        const competence: Competence = {
            id: subjectCompetenceWrapper.SubjectCompetence.id,
            description: subjectCompetenceWrapper.SubjectCompetence.compDescription,
        };

        const ras: RA[] = subjectCompetenceWrapper.SubjectRA.map((subjectRA: SubjectRA) => ({
            id: subjectRA.id,
            description: subjectRA.raDescription,
        }));

        return {
            competence: competence,
            ras: ras,
        };
    }
    mapProgramCompetenceToCompetenceWrapper(
      programCompetence: ProgramCompetenceRAResponse): CompetenceWrapper {
        const competence: Competence = { 
            id: programCompetence.competenceProgram.id,         
            description: programCompetence.competenceProgram.proCompDescription,
        };
        const ras: RA[] = programCompetence.RA_Program.map((ra) => ({
            id: ra.id,
            description: ra.proRADescription,
        }));

        return {
            competence: competence,
            ras: ras,
        };
      }
}
