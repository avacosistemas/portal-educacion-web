import { SafeHtml } from '@angular/platform-browser';

export interface ModalHome {
    status: string;
    data: ResponseModalHome;
}


export interface ResponseModalHome {
    id?: number;
    key?: string;
    value: string | SafeHtml;
    descripcion?: string;
}