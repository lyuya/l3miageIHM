import { Component, OnInit, Input, Inject } from '@angular/core';
import {InfirmierInterface} from '../dataInterfaces/infirmier';
import {CabinetMedicalService} from '../cabinet-medical.service';
import {CabinetInterface} from '../dataInterfaces/cabinet';
import {PatientInterface} from '../dataInterfaces/patient';
import {Adresse} from '../dataInterfaces/adresse';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatSnackBar} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

export interface DialogData {
  nir: string;
  confirme: boolean;
}
@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})

export class PatientInfoComponent implements OnInit {
  @Input() private p: PatientInterface;
  toDelete: string;
  toConfirme: boolean;
  private patient: PatientInterface;
  private cabinet: CabinetInterface;
  private infirmiers: InfirmierInterface[];
  private patients: PatientInterface[];
  constructor(private route: ActivatedRoute, private service: CabinetMedicalService, public dialog: MatDialog,
              public snackBar: MatSnackBar ) {
    route.params.subscribe(val => {
      if (this.p === undefined) {
        const nir = val.nir;
        this.service.getData('/data/cabinetInfirmier.xml').then((c) => {
          this.cabinet = c;
          this.infirmiers = c.infirmiers;
          this.patients = c.patientsNonAffectes;
          this.patient = this.searchPat(nir);
        });
      } else {
        this.patient = this.p;
      }
    });
  }
  openDialog(pat: PatientInterface): void {
    const dialogRef = this.dialog.open(DialogDeletePatientInfoComponent, {
      width: '250px',
      data: {nir: this.toDelete, confirme: this.toConfirme}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.toConfirme = result;
      console.log('openDialog:', result);
      if (this.toConfirme === true) {
        console.log('deletePatient:', this.toConfirme);
        this.service.deletePatient(pat.numeroSecuriteSociale);
        this.openSnackBar('Supprimé !!!', 'ok' );
        // location.reload(true);
      }
    });
  }
  ngOnInit() {
    if (this.p === undefined) {
      const nir = this.route.snapshot.params['nir'];
      this.service.getData('/data/cabinetInfirmier.xml').then((c) => {
        this.cabinet = c;
        this.infirmiers = c.infirmiers;
        this.patients = c.patientsNonAffectes;
        this.patient = this.searchPat(nir);
      });
    } else {
      this.patient = this.p;
    }
  }
  openSnackBar(message: string, action: string ) {
    this.snackBar.openFromComponent(ReloadComponent, {
      duration: 2000,
    });
  }
  searchPat(nir): PatientInterface {
    return this.service.searchPat(nir, this.cabinet);
  }
  getAdresse (ad: Adresse): String {
    return ad.etage + ' ' + ad.numero + ' ' + ad.rue + ' ' + ad.ville + ' ' + ad.codePostal;
  }
  deletePatient (pat: PatientInterface) {
    this.toDelete = pat.numeroSecuriteSociale; // data envoyé à dialog
    this.openDialog(pat);
  }
}
@Component({
  selector: 'app-dialog-delete-patient-info',
  templateUrl: 'DialogDeletePatientInfo.html',
})
export class DialogDeletePatientInfoComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogDeletePatientInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}

@Component({
  selector: 'app-reload',
  templateUrl: 'reloadAfterDelete.html',
})
export class ReloadComponent {
  constructor(private router: Router) {
  }
}

