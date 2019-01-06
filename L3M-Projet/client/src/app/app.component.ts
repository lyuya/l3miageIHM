import { Component, OnInit} from '@angular/core';
import {CabinetInterface} from './dataInterfaces/cabinet';
import {CabinetMedicalService} from './cabinet-medical.service';
import {InfirmierInterface} from './dataInterfaces/infirmier';
import {PatientInterface} from './dataInterfaces/patient';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';
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
  searchInf (id): InfirmierInterface {
    return this.service.searchInf(id, this.cabinet);
  }
  searchPat (nir): PatientInterface {
    return this.service.searchPat(nir, this.cabinet);
  }
  affectation(pat: PatientInterface, idINF: string) {
    this.service.affectation(pat, idINF);
    console.log(this.searchInf(idINF));
    //location.reload(true);
  }
}
