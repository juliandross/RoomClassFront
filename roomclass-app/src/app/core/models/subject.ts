export interface Subject {
    id: number;
    subjectName :string;
    subjectDescription :string;
    subjectCredits :number;
    subjectSemester :number;
    is_active :boolean;
}
export interface SubjectCompetence {
    id:number;
    compDescription : string;
    compLevel : string;
    programCompetence : number;
    subjectTeacherPeriod : number;    
}
export interface SubjectCompetenceWrapper {
    SubjectCompetence: SubjectCompetence;
    SubjectRA: SubjectRA[];
}
export interface SubjectRA {
    id : number;
    raDescription : string;
    subjectCompetence : number;
}
