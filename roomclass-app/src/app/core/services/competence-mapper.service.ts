import { Injectable } from '@angular/core';
import { SubjectCompetenceWrapper, SubjectRA } from '../models/subject';

// Define las interfaces de destino en el mismo archivo o en un archivo de modelos separado
export interface Competence {
    description: string;
}

export interface RA {
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
            description: subjectCompetenceWrapper.SubjectCompetence.compDescription,
        };

        const ras: RA[] = subjectCompetenceWrapper.SubjectRA.map((subjectRA: SubjectRA) => ({
            description: subjectRA.raDescription,
        }));

        return {
            competence: competence,
            ras: ras,
        };
    }
}