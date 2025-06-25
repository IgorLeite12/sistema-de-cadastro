import { Routes } from '@angular/router';
import { ConsultationComponent } from './consultation/consultation.component';
import { RegistrationComponent } from './registration/registration.component';

export const routes: Routes = [
    {path: 'clientes', component: ConsultationComponent},
    {path: 'cadastro', component: RegistrationComponent},
];
