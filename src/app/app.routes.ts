import { RedirectCommand, Routes } from '@angular/router';
import { ConsultationComponent } from './components/consultation/consultation.component';
import { RegistrationComponent } from './components/registration/registration.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'cadastro'},
    {path: 'clientes', component: ConsultationComponent},
    {path: 'cadastro', component: RegistrationComponent},
];
