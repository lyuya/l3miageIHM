import { Component, OnInit } from '@angular/core';
import {CabinetMedicalService} from '../cabinet-medical.service';
import {CabinetInterface} from '../dataInterfaces/cabinet';
import {InfirmierInterface} from '../dataInterfaces/infirmier';
import {PatientInterface} from '../dataInterfaces/patient';
import {sexeEnum} from '../dataInterfaces/sexe';
import {Adresse} from '../dataInterfaces/adresse';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-ajouter-patient',
  templateUrl: './ajouter-patient.component.html',
  styleUrls: ['./ajouter-patient.component.scss']
})
export class AjouterPatientComponent implements OnInit {
private sexe: sexeEnum;
checked = 'Mr';
date = '';
  cabinet: CabinetInterface;
  private infirmiers: InfirmierInterface[];
  private patient: PatientInterface;

  constructor(private service: CabinetMedicalService, _http: HttpClient) {

    // this.initCabinet(service);
    // this.initCabinet(service);
    // service.getData('/data/cabinetInfirmier.xml').then((c) => {
    //   this.cabinet = c;
    //   this.infirmiers = c.infirmiers;
    //   this.patients = c.patientsNonAffectes;
    // });
  }
  ngOnInit() {
  }
  optionSexe(): sexeEnum {
    if (this.checked === 'Mm') {
      return sexeEnum.F;
    } else {
      return sexeEnum.M;
    }
  }
  formatDate(date): String {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }

  ajouterPatient(prenom: string, nom: string, sexe: string, date: string,
  numeroSecuriteSociale: string, etage: string, numRue: string, nomRue: string, ville: string, codePostale: string): PatientInterface {
    const patient: PatientInterface = {
      nom: nom,
      prenom: prenom,
      numeroSecuriteSociale: numeroSecuriteSociale,
      sexe: sexe === 'Mm' ? sexeEnum.F : sexeEnum.M ,
      naissance: date,
      adresse: {
      etage : etage,
      codePostal : + codePostale,
      ville : ville,
      rue : nomRue,
      numero : numRue
    },
      intervenant: ''
    }
    console.log(patient);
    this.service.addPatient(patient);
    return patient;
  }
  private onDate(event): void {
    this.date = '' + event;
    console.log(this.date);
  }
}
