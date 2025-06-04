
export interface Teacher {
    id: number;
    last_login: Date | null;
    email: string;
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
