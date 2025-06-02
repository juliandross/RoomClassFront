import { Period } from "./period";
import { Subject } from "./subject";
import { Teacher } from "./teacher";

export interface AssignSubject {
    id: number;
    subject: Subject;
    teacher: Teacher;
    period: Period;
    displayName?: string;
}
