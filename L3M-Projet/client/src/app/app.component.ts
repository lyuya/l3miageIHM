import { Component, OnInit} from '@angular/core';
import {CabinetInterface} from './dataInterfaces/cabinet';
import {CabinetMedicalService} from './cabinet-medical.service';
import {InfirmierInterface} from './dataInterfaces/infirmier';
import {PatientInterface} from './dataInterfaces/patient';
import {Adresse} from './dataInterfaces/adresse';

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
}
