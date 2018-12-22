import { Component, OnInit, Input } from '@angular/core';
import {InfirmierInterface} from '../dataInterfaces/infirmier';
import { ActivatedRoute} from '@angular/router';
import {CabinetMedicalService} from '../cabinet-medical.service';
import {CabinetInterface} from '../dataInterfaces/cabinet';
import {PatientInterface} from '../dataInterfaces/patient';
import {Adresse} from '../dataInterfaces/adresse';
@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent implements OnInit {
  @Input() private p: PatientInterface;
  private patient: PatientInterface;
  private cabinet: CabinetInterface;
  private infirmiers: InfirmierInterface[];
  private patients: PatientInterface[];
  constructor(private route: ActivatedRoute, private service: CabinetMedicalService) { }

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
  searchPat(nir): PatientInterface {
    return this.service.searchPat(nir, this.cabinet);
  }
  getAdresse (ad: Adresse): String {
    return ad.etage + ' ' + ad.numero + ' ' + ad.rue + ' ' + ad.ville + ' ' + ad.codePostal;
  }
}
