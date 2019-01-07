import { Component, OnInit , Input, ViewChild, Inject } from '@angular/core';
import {InfirmierInterface} from '../dataInterfaces/infirmier';
import {CabinetInterface} from '../dataInterfaces/cabinet';
import {CabinetMedicalService} from '../cabinet-medical.service';
import {PatientInterface} from '../dataInterfaces/patient';
import {ActivatedRoute} from '@angular/router';
import {Adresse} from '../dataInterfaces/adresse';
import {MatTable} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  id: string;
  confirme: boolean;
}
@Component({
  selector: 'app-infirmier-dash',
  templateUrl: './infirmier-dash.component.html',
  styleUrls: ['./infirmier-dash.component.scss']
})
export class InfirmierDashComponent implements OnInit {
  private cabinet: CabinetInterface;
  private infirmiers: InfirmierInterface[];
  private patients: PatientInterface[];
  @ViewChild(MatTable) table: MatTable<any>;
  dataSource;
  toDelete: string;
  toConfirme: boolean;
  constructor(private route: ActivatedRoute, private service: CabinetMedicalService, public dialog: MatDialog) {
    const id = this.route.snapshot.params['id'];
    service.getData('/data/cabinetInfirmier.xml').then((c) => {
      this.cabinet = c;
      this.infirmiers = c.infirmiers;
      this.patients = c.patientsNonAffectes;
      this.dataSource = this.infirmiers;
    });
  }
  displayedColumns: string[] = ['id', 'prenom', 'nom', 'adresse', 'actions' ];


  openDialog(inf: InfirmierInterface): void {
    const dialogRef = this.dialog.open(DialogDeleteInfComponent, {
      width: '250px',
      data: {id: this.toDelete, confirme: this.toConfirme}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.toConfirme = result;
      console.log('openDialog:', result);
      if (this.toConfirme === true) {
        console.log('deleteInfirmier:', this.toConfirme);
        this.service.deleteInfirmier(inf.id);
        const indiceInf = this.infirmiers.indexOf(inf);
        this.infirmiers.splice(indiceInf, 1 );
        console.log(this.infirmiers);
        this.table.renderRows();
      }
    });
  }
  ngOnInit() {
  }

  getAdresse (ad: Adresse): string {
    return ad.etage + ' ' + ad.numero + ' ' + ad.rue + ' ' + ad.ville + ' ' + ad.codePostal;
  }
  deleteInfirmier (inf: InfirmierInterface) {
    this.toDelete = inf.id; // data envoyé à dialog
    this.openDialog(inf);
  }
}

@Component({
  selector: 'app-dialog-deleteinf',
  templateUrl: 'DialogDeleteInf.html',
})
export class DialogDeleteInfComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteInfComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
