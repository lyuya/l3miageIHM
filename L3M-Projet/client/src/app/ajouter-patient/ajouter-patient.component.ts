import { Component, OnInit} from '@angular/core';
import {CabinetMedicalService} from '../cabinet-medical.service';
import {CabinetInterface} from '../dataInterfaces/cabinet';
import {InfirmierInterface} from '../dataInterfaces/infirmier';
import {PatientInterface} from '../dataInterfaces/patient';
import {sexeEnum} from '../dataInterfaces/sexe';
import {Adresse} from '../dataInterfaces/adresse';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-ajouter-patient',
  templateUrl: './ajouter-patient.component.html',
  styleUrls: ['./ajouter-patient.component.scss']
})
export class AjouterPatientComponent implements OnInit {
private sexe: sexeEnum;
sexes: string[] = ['Mme', 'Mr'];
checked;
date = '';
  cabinet: CabinetInterface;
  private infirmiers: InfirmierInterface[];
  private patient: PatientInterface;

  constructor(private service: CabinetMedicalService, _http: HttpClient, public dialog: MatDialog) {

    // this.initCabinet(service);
    // this.initCabinet(service);
    // service.getData('/data/cabinetInfirmier.xml').then((c) => {
    //   this.cabinet = c;
    //   this.infirmiers = c.infirmiers;
    //   this.patients = c.patientsNonAffectes;
    // });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
  }
  optionSexe(): sexeEnum {
    if (this.checked === 'Mme') {
      console.log('checked ===', this.checked);
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

  ajouterPatient(prenom: string, nom: string, sexe: sexeEnum, date: string,
  numeroSecuriteSociale: string, etage: string, numRue: string, nomRue: string, ville: string, codePostale: string): PatientInterface {
    const patient: PatientInterface = {
      nom: nom,
      prenom: prenom,
      numeroSecuriteSociale: numeroSecuriteSociale,
      sexe: sexe === sexeEnum.F ? sexeEnum.F : sexeEnum.M ,
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
    this.openDialog();
    return patient;
  }
  private onDate(event): void {
    this.date = '' + event;
    console.log(this.date);
  }
}
@Component({
  selector: 'app-dialog',
  templateUrl: 'DialogOverviewExampleDialog.html',
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
    //location.reload(true);
  }

}
