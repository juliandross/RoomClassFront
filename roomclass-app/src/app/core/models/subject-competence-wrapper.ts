import { SubjectCompetence } from './subject-competence';
import { SubjectRA } from './subject-ra';

export interface SubjectCompetenceWrapper {
    SubjectCompetence: SubjectCompetence;
    SubjectRA: SubjectRA[];
}
