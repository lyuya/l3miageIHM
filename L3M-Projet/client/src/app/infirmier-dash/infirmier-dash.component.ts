import { Component, OnInit , Input } from '@angular/core';
import {InfirmierInterface} from '../dataInterfaces/infirmier';
import {CabinetInterface} from '../dataInterfaces/cabinet';
import {CabinetMedicalService} from '../cabinet-medical.service';
import {PatientInterface} from '../dataInterfaces/patient';
import {ActivatedRoute} from '@angular/router';
import {Adresse} from '../dataInterfaces/adresse';

@Component({
  selector: 'app-infirmier-dash',
  templateUrl: './infirmier-dash.component.html',
  styleUrls: ['./infirmier-dash.component.scss']
})
export class InfirmierDashComponent implements OnInit {
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
      this.dataSource = this.infirmiers;
    });
  }
  displayedColumns: string[] = ['id', 'prenom', 'nom'];

  ngOnInit() {
  }
  getAdresse (ad: Adresse): string {
    return ad.etage + ' ' + ad.numero + ' ' + ad.rue + ' ' + ad.ville + ' ' + ad.codePostal;
  }

}
