import {Component, Input, OnInit} from '@angular/core';
import {InfirmierInterface} from '../dataInterfaces/infirmier';
import { Router} from '@angular/router';

@Component({
  selector: 'app-infirmier',
  templateUrl: './infirmier.component.html',
  styleUrls: ['./infirmier.component.scss']
})
export class InfirmierComponent implements OnInit {
  @Input() private infirmier: InfirmierInterface;
  constructor(private router: Router) {

  }
  ngOnInit() {
  }
  getAdresse (): String {
    return this.infirmier.adresse.etage + ' ' + this.infirmier.adresse.numero + ' ' + this.infirmier.adresse.rue + ' ' + this.infirmier.adresse.ville + ' ' + this.infirmier.adresse.codePostal;
  }
  onSelect(inf: InfirmierInterface) {
    this.router.navigate(['/infirmierInfo', inf.id]);
    location.reload(true);
  }
}
