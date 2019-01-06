import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import {AjouterPatientComponent} from './ajouter-patient/ajouter-patient.component';
import {PatientInfoComponent} from './patient-info/patient-info.component';
import {InfirmierInfoComponent} from './infirmier-info/infirmier-info.component';
import {InfirmierDashComponent} from './infirmier-dash/infirmier-dash.component';
import {AjouterInfirmierComponent} from './ajouter-infirmier/ajouter-infirmier.component';
import {InfirmierComponent} from './infirmier/infirmier.component';
import {SecretaryComponent} from './secretary/secretary.component';
import {PatientComponent} from './patient/patient.component';
import {AppComponent} from './app.component';
import {PatientDashComponent} from './patient-dash/patient-dash.component';
import {BienvenueComponent} from './bienvenue/bienvenue.component';

const routes: Routes = [
  { path: 'ajouterPatient', component: AjouterPatientComponent },
  { path: 'ajouterInfirmier', component: AjouterInfirmierComponent },
  { path: 'patientInfo/:nir', component: PatientInfoComponent },
  { path: 'infirmierInfo/:id', component: InfirmierInfoComponent},
  { path: 'infirmierDash', component: InfirmierDashComponent},
  { path: 'patientDash', component: PatientDashComponent},
  { path: '', component: BienvenueComponent }
  // { path: '', redirectTo: '/', pathMatch: 'full', component: BienvenueComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//export const routingComponents = [InfirmierInfoComponent, Infi]
