import { Component, OnInit } from '@angular/core';
import {CabinetInterface} from '../dataInterfaces/cabinet';
import {InfirmierInterface} from '../dataInterfaces/infirmier';
import {PatientInterface} from '../dataInterfaces/patient';
import {CabinetMedicalService} from '../cabinet-medical.service';


@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.scss']
})
export class SecretaryComponent implements OnInit {
  cabinet: CabinetInterface;
  private infirmiers: InfirmierInterface[];
  private patients: PatientInterface[];
  constructor(private service: CabinetMedicalService) {
    // this.initCabinet(service);
    // this.initCabinet(service);
    service.getData('/data/cabinetInfirmier.xml').then((c) => {
      this.cabinet = c;
      this.infirmiers = c.infirmiers;
      this.patients = c.patientsNonAffectes;
    });
  }
  ngOnInit() {
  }
  /*async initCabinet(cabinetMedicalService) {
    await cabinetMedicalService.getData('/data/cabinetInfirmier.xml').then((c) => {
      this.cabinet = c;
      this.infirmiers = this.service.getInfirmiers(this.cabinet);
      this.patients = this.service.getPatientsNonAffectes(this.cabinet);
    });
    //
  }*/
  getinfirmiers(): InfirmierInterface[] {
    //console.log(this.service.getInfirmiers(this.cabinet));
    return this.infirmiers;
    //return this.service.getInfirmiers(this.cabinet);
    //console.log( 'in getinfirmiers ', this.cabinet.infirmiers);
    // return typeof this.cabinet !== 'undefined' ? this.cabinet.infirmiers : [];
  }
  getpatients(): PatientInterface[] {
    return this.patients;
    //return this.service.getPatientsNonAffectes(this.cabinet);
    // return typeof this.cabinet !== 'undefined' ? this.cabinet.patientsNonAffectes : [];
  }

  ajouterInfirmier() {

  }
}





