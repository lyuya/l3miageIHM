import { Component, OnInit, Input} from '@angular/core';
import {PatientInterface} from '../dataInterfaces/patient';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Adresse} from "../dataInterfaces/adresse";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  @Input() private patient: PatientInterface;
  idPat;
  params;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
  }
  getAdresse (ad: Adresse): String {
    return ad.etage + ' ' + ad.numero + ' ' + ad.rue + ' ' + ad.ville + ' ' + ad.codePostal;
  }
  onSelect(pat: PatientInterface) {
     this.router.navigate(['/patientInfo', pat.numeroSecuriteSociale]);
     // this.router.navigateByUrl('/patientInfo/' + pat.numeroSecuriteSociale);

    // location.reload(true);
  }
}
