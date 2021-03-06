import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecretaryComponent } from './secretary/secretary.component';
import {HttpClientModule} from '@angular/common/http';
import { MaterialModule } from './materials';
import { PatientComponent } from './patient/patient.component';
import { InfirmierComponent } from './infirmier/infirmier.component';
import {
  AjouterPatientComponent, DialogComponent } from './ajouter-patient/ajouter-patient.component';
import {
  DialogDeletePatientInfoComponent, PatientInfoComponent,
  ReloadComponent
} from './patient-info/patient-info.component';
import {
  DialogAffecterComponent, DialogDesaffecterComponent,
  InfirmierInfoComponent
} from './infirmier-info/infirmier-info.component';
import {DialogDeleteInfComponent, InfirmierDashComponent} from './infirmier-dash/infirmier-dash.component';
import { AjouterInfirmierComponent } from './ajouter-infirmier/ajouter-infirmier.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogDeleteComponent, PatientDashComponent} from './patient-dash/patient-dash.component';
import { BienvenueComponent } from './bienvenue/bienvenue.component';
import {DragDropModule} from 'alx-dragdrop';

@NgModule({
  declarations: [
    AppComponent,
    SecretaryComponent,
    PatientComponent,
    InfirmierComponent,
    AjouterPatientComponent,
    PatientInfoComponent,
    InfirmierInfoComponent,
    InfirmierDashComponent,
    AjouterInfirmierComponent,
    PatientDashComponent,
    DialogComponent,
    DialogDeleteComponent,
    DialogAffecterComponent,
    DialogDesaffecterComponent,
    DialogDeleteInfComponent,
    DialogDeletePatientInfoComponent,
    ReloadComponent,
    BienvenueComponent
  ],
  entryComponents: [DialogComponent, DialogDeleteComponent, DialogAffecterComponent, DialogDeletePatientInfoComponent,
    DialogDesaffecterComponent, DialogDeleteInfComponent, ReloadComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
