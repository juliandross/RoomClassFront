/** example        "id": 2,
        "password": "1234",
        "last_login": null,
        "email": "profesor2@ejemplo.com",
        "first_name": "Luis",
        "last_name": "Martínez",
        "is_active": true,
        "is_staff": false,
        "rol": "DOCENTE",
        "is_superuser": false,
        "teaType": "Asociado",
        "teaTypeId": "T002",
        "teaRecentTitle": "Maestría en Física",
        "groups": [],
        "user_permissions": [] */
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
