import { Component, OnInit , Input, Inject } from '@angular/core';
import {InfirmierInterface} from '../dataInterfaces/infirmier';
import { ActivatedRoute} from '@angular/router';
import {CabinetMedicalService} from '../cabinet-medical.service';
import {CabinetInterface} from '../dataInterfaces/cabinet';
import {PatientInterface} from '../dataInterfaces/patient';
import {Adresse} from '../dataInterfaces/adresse';
import {MatSort, MatTableDataSource } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-infirmier-info',
  templateUrl: './infirmier-info.component.html',
  styleUrls: ['./infirmier-info.component.scss']
})
export class InfirmierInfoComponent implements OnInit {
  @Input() private i: InfirmierInterface;
  selectedValue: string;
  toDelete: string;
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
    this.service.affectation(pat, this.infirmier.id);
    console.log(this.searchInf(this.infirmier.id));
    //location.reload(true);
  }
  desaffectation(pat: PatientInterface) {
    this.service.desaffectation(pat);
    location.reload(true);
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
export class DialogDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteComponent>) {}
}
