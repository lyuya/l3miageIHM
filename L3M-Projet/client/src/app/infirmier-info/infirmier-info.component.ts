import { Component, OnInit , Input, Inject, ViewChild} from '@angular/core';
import {InfirmierInterface} from '../dataInterfaces/infirmier';
import { ActivatedRoute} from '@angular/router';
import {CabinetMedicalService} from '../cabinet-medical.service';
import {CabinetInterface} from '../dataInterfaces/cabinet';
import {PatientInterface} from '../dataInterfaces/patient';
import {Adresse} from '../dataInterfaces/adresse';
import {MatSort, MatTableDataSource } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatTable} from '@angular/material';

export interface DialogData {
  nir: string;
  confirme: boolean;
}
@Component({
  selector: 'app-infirmier-info',
  templateUrl: './infirmier-info.component.html',
  styleUrls: ['./infirmier-info.component.scss']
})
export class InfirmierInfoComponent implements OnInit {
  @Input() private i: InfirmierInterface;
  @ViewChild(MatTable) table: MatTable<any>;
  selectedValue: string;
  toAffecter: string;
  toDesaffecter: string;
  toConfirme: boolean;
  private infirmier: InfirmierInterface;
  private cabinet: CabinetInterface;
  private infirmiers: InfirmierInterface[];
  private patients: PatientInterface[];
  private patientsAffectees: PatientInterface[];
  data;
  constructor(private route: ActivatedRoute, private service: CabinetMedicalService, public dialog: MatDialog) {

  }
  displayedColumns: string[] = ['id', 'prenom', 'nom'];
  // alert pour confirmer la affectation
  openDialog(pat: PatientInterface): void {
    const dialogRef = this.dialog.open(DialogAffecterComponent, {
      width: '250px',
      data: {nir: this.toAffecter, confirme: this.toConfirme}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.toConfirme = result;
      console.log('openDialog:', result);
      if (this.toConfirme === true) {
        console.log('affectation:', this.toConfirme);
        this.service.affectation(pat, this.infirmier.id);
        const indicePat = this.patients.indexOf(pat);
        this.patientsAffectees.push( pat );
        console.log(this.patients);
        this.table.renderRows();
      }
    });
  }
  // alert pour confirmer la desaffectation
  openDialog2(pat: PatientInterface): void {
    const dialogRef = this.dialog.open(DialogDesaffecterComponent, {
      width: '250px',
      data: {nir: this.toDesaffecter, confirme: this.toConfirme}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.toConfirme = result;
      console.log('openDialog:', result);
      if (this.toConfirme === true) {
        console.log('affectation:', this.toConfirme);
        this.service.desaffectation(pat);
        const indicePat = this.patients.indexOf(pat);
        this.patientsAffectees.splice(this.patientsAffectees.indexOf(pat), 1 );
        console.log(this.patients);
        this.table.renderRows();
      }
    });
  }
  ngOnInit() {
    if (this.i === undefined) {
      const id = this.route.snapshot.params['id'];
      this.service.getData('/data/cabinetInfirmier.xml').then((c) => {
        this.cabinet = c;
        this.infirmiers = c.infirmiers;
        this.patients = c.patientsNonAffectes;
        this.infirmier = this.searchInf(id);
        this.patientsAffectees = this.getPatientsAffectes(id);
        this.data = new MatTableDataSource(this.patientsAffectees);

      });
    } else {
      this.infirmier = this.i;
    }

  }
  searchInf(id): InfirmierInterface {
    return this.service.searchInf(id, this.cabinet);
  }
  getAdresse (ad: Adresse): String {
    return ad.etage + ' ' + ad.numero + ' ' + ad.rue + ' ' + ad.ville + ' ' + ad.codePostal;
  }
  affectation(pat: PatientInterface) {
    this.toAffecter = pat.numeroSecuriteSociale;
    // this.service.affectation(pat, this.infirmier.id);
    // location.reload(true);
    this.openDialog(pat);
  }
  desaffectation(pat: PatientInterface) {
    this.toDesaffecter = pat.numeroSecuriteSociale;
    // location.reload(true);
    this.openDialog2(pat);
  }
  searchPat(nir: string): PatientInterface {
    return this.service.searchPat(nir, this.cabinet);
  }
  getPatientsAffectes (id: string): PatientInterface[] {
    return this.service.getPatAffectes(id, this.cabinet);
  }
}


@Component({
  selector: 'app-dialog-affecter',
  templateUrl: 'DialogAffecter.html',
})
export class DialogAffecterComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogAffecterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
@Component({
  selector: 'app-dialog-desaffecter',
  templateUrl: 'DialogDesaffecter.html',
})
export class DialogDesaffecterComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogDesaffecterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
