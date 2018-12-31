import { Component, OnInit , EventEmitter, Output, ViewChild, Inject } from '@angular/core';
import {InfirmierInterface} from '../dataInterfaces/infirmier';
import {CabinetInterface} from '../dataInterfaces/cabinet';
import {CabinetMedicalService} from '../cabinet-medical.service';
import {PatientInterface} from '../dataInterfaces/patient';
import {ActivatedRoute} from '@angular/router';
import {Adresse} from '../dataInterfaces/adresse';
import {MatTable} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  nir: string;
  confirme: boolean;
}

@Component({
  selector: 'app-patient-dash',
  templateUrl: './patient-dash.component.html',
  styleUrls: ['./patient-dash.component.scss']
})
export class PatientDashComponent implements OnInit {
  private cabinet: CabinetInterface;
  private infirmiers: InfirmierInterface[];
  // @Output() patDel = new EventEmitter<boolean>();
  @ViewChild(MatTable) table: MatTable<any>;
  private patients: PatientInterface[];
  dataSource;
  toDelete: string;
  toConfirme: boolean;
  constructor(private route: ActivatedRoute, private service: CabinetMedicalService, public dialog: MatDialog) {
    const id = this.route.snapshot.params['id'];
    service.getData('/data/cabinetInfirmier.xml').then((c) => {
      this.cabinet = c;
      this.infirmiers = c.infirmiers;
      this.patients = c.patientsNonAffectes;
      this.dataSource = this.patients;
    });
  }
  displayedColumns: string[] = ['nir', 'prenom', 'nom', 'intervenant', 'sexe', 'adresse', 'actions'];
  openDialog(pat: PatientInterface): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
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
        const indicePat = this.patients.indexOf(pat);
        this.patients.splice(indicePat, 1 );
        console.log(this.patients);
        this.table.renderRows();
      }
    });
  }
  ngOnInit() {
  }

  getAdresse (ad: Adresse): string {
    return ad.etage + ' ' + ad.numero + ' ' + ad.rue + ' ' + ad.ville + ' ' + ad.codePostal;
  }
  signalFromDialog(sig: boolean) {

  }
  deletePatient (pat: PatientInterface) {
    this.toDelete = pat.numeroSecuriteSociale; // data envoyé à dialog
    this.openDialog(pat);
  }
}

@Component({
  selector: 'app-dialog-delete',
  templateUrl: 'DialogDelete.html',
})
export class DialogDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
