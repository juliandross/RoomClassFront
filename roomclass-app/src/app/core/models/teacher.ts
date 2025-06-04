
export interface Teacher {
    id: number;
    last_login: Date | null;
    email: string;
    identification: number;
    first_name: string;
    last_name: string;
    is_active: boolean;
    is_staff: boolean;
    rol: string; 
    is_superuser: boolean;
    teaType?: string; 
    teaTypeId?: string; 
    teaRecentTitle?: string;
    groups?: any[]; 
    user_permissions?: any[];
}

export interface TeacherShowable {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    identification: number;
    teaType?: string; 
    teaTypeId?: string; 
    teaRecentTitle?: string;
}

export interface TeacherInfo{
    email: string,
    identificacion: string,
    Nombres: string,
    Apellidos: string,
    Tipo_de_identificacion:  string,
    tipo_de_docente: string,
    Titulo_mas_reciente: string,
}