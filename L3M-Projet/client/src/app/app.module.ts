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
import { AjouterPatientComponent } from './ajouter-patient/ajouter-patient.component';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { InfirmierInfoComponent } from './infirmier-info/infirmier-info.component';
import { InfirmierDashComponent } from './infirmier-dash/infirmier-dash.component';
import { AjouterInfirmierComponent } from './ajouter-infirmier/ajouter-infirmier.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PatientDashComponent } from './patient-dash/patient-dash.component';

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
    PatientDashComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }