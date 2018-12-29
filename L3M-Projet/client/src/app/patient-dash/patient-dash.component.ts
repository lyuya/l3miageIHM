import { Component, OnInit } from '@angular/core';
import {InfirmierInterface} from '../dataInterfaces/infirmier';
import {CabinetInterface} from '../dataInterfaces/cabinet';
import {CabinetMedicalService} from '../cabinet-medical.service';
import {PatientInterface} from '../dataInterfaces/patient';
import {ActivatedRoute} from '@angular/router';
import {Adresse} from '../dataInterfaces/adresse';

@Component({
  selector: 'app-patient-dash',
  templateUrl: './patient-dash.component.html',
  styleUrls: ['./patient-dash.component.scss']
})
export class PatientDashComponent implements OnInit {
  private cabinet: CabinetInterface;
  private infirmiers: InfirmierInterface[];
  private patients: PatientInterface[];
  dataSource;
  constructor(private route: ActivatedRoute, private service: CabinetMedicalService) {
    const id = this.route.snapshot.params['id'];
    service.getData('/data/cabinetInfirmier.xml').then((c) => {
      this.cabinet = c;
      this.infirmiers = c.infirmiers;
      this.patients = c.patientsNonAffectes;
      this.dataSource = this.patients;
    });
  }
  displayedColumns: string[] = ['nir', 'prenom', 'nom', 'intervenant', 'sexe', 'adresse', 'actions'];
  ngOnInit() {
  }
  getAdresse (ad: Adresse): string {
    return ad.etage + ' ' + ad.numero + ' ' + ad.rue + ' ' + ad.ville + ' ' + ad.codePostal;
  }
}
