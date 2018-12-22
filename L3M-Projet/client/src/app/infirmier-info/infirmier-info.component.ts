import { Component, OnInit , Input } from '@angular/core';
import {InfirmierInterface} from '../dataInterfaces/infirmier';
import { ActivatedRoute} from '@angular/router';
import {CabinetMedicalService} from '../cabinet-medical.service';
import {CabinetInterface} from '../dataInterfaces/cabinet';
import {PatientInterface} from '../dataInterfaces/patient';
import {Adresse} from '../dataInterfaces/adresse';
import {MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-infirmier-info',
  templateUrl: './infirmier-info.component.html',
  styleUrls: ['./infirmier-info.component.scss']
})
export class InfirmierInfoComponent implements OnInit {
  @Input() private i: InfirmierInterface;
  selectedValue: string;
  private infirmier: InfirmierInterface;
  private cabinet: CabinetInterface;
  private infirmiers: InfirmierInterface[];
  private patients: PatientInterface[];
  private patientsAffectees: PatientInterface[];
  data;
  constructor(private route: ActivatedRoute, private service: CabinetMedicalService) {

  }
  displayedColumns: string[] = ['id', 'prenom', 'nom'];

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
  affectation(pat: PatientInterface, id: string) {
    this.service.affectation(pat, id);
    console.log(this.searchInf(id));
    location.reload(true);
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
