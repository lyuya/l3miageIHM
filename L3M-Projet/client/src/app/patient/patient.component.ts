import { Component, OnInit, Input} from '@angular/core';
import {PatientInterface} from '../dataInterfaces/patient';
import { Router} from '@angular/router';
import {Adresse} from "../dataInterfaces/adresse";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  @Input() private patient: PatientInterface;

  constructor(private router: Router) { }

  ngOnInit() {
  }
  getAdresse (ad: Adresse): String {
    return ad.etage + ' ' + ad.numero + ' ' + ad.rue + ' ' + ad.ville + ' ' + ad.codePostal;
  }
  onSelect(pat: PatientInterface) {
    this.router.navigate(['/patientInfo', pat.numeroSecuriteSociale]);
    location.reload(true);
  }
}
