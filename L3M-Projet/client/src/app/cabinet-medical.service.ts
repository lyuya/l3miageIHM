import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { CabinetInterface} from './dataInterfaces/cabinet';
import { Adresse } from './dataInterfaces/adresse';
import {InfirmierInterface} from './dataInterfaces/infirmier';
import {PatientInterface} from './dataInterfaces/patient';
import {sexeEnum} from './dataInterfaces/sexe';


@Injectable({
  providedIn: 'root'
})
export class CabinetMedicalService {
  private _cabinet: CabinetInterface;

  private _http: HttpClient;
  public get http(): HttpClient { return this._http; }
  constructor (http: HttpClient) {
    this._http = http;
  }
  //recuperer le data dans un xml dans serveur=>objets de cabinetInterface
  async getData( url: string ): Promise<CabinetInterface> {
    //get HTTP response as text
    const response = await this.http.get(url, { responseType: 'text' }).toPromise();//renvoie string
    //console.log(response);//parse the response with DOMParser
    const parser = new DOMParser();
    const doc = parser.parseFromString(response, 'application/xml');//renvoie en format xml
    //console.log(doc);
    //if no doc, exit
    if (!doc) {return null; }
    const cabinet: CabinetInterface = {
      infirmiers: this.getInfirmiersFrom(doc.querySelector( 'cabinet' )),
      patientsNonAffectes: this.getPatientsFrom(doc.querySelector('cabinet')),
      adresse: this.getAdresseFrom( doc.querySelector( 'cabinet' ) )
    };
    return cabinet;
    //console.log(cabinet);
    //console.log(doc.querySelector('infirmier').getAttribute('id'));
    //const infirmierXML = doc.querySelector('infirmiers > infirmier');
  }
  private getAdresseFrom(root: Element): Adresse {
    let node: Element;
    return {
      ville       : (node = root.querySelector('adresse > ville')     ) ? node.textContent                    : '',
      codePostal  : (node = root.querySelector('adresse > codePostal')) ? parseInt(node.textContent, 10) : 0,
      rue         : (node = root.querySelector('adresse > rue')       ) ? node.textContent                    : '',
      numero      : (node = root.querySelector('adresse > numéro')    ) ? node.textContent                    : '',
      etage       : (node = root.querySelector('adresse > étage')     ) ? node.textContent                    : '',
    };
  }
  private getInfirmiersFrom(root: Element): InfirmierInterface[] {
    const infirmiersXML = root.querySelector('infirmiers') as HTMLElement;
    const infirmiers: InfirmierInterface[] = [];
    const infirmiersElementNodeList = infirmiersXML.getElementsByTagName('infirmier');
    const infirmiersElements: Element[] = Array.prototype.slice.call(infirmiersElementNodeList);
    //console.log(infirmiersElements);
    for (let i = 0; i < infirmiersElements.length; i++) {
      infirmiers.push(this.getInfirmier(infirmiersElements[i]));
    }//infirmiersElements.forEach(infirmier => infirmiers.push(this.getInfirmier( infirmier)));
    return infirmiers;
  }
  private getInfirmier(root: Element): InfirmierInterface {
    let node: Element;
    //console.log(root.querySelector('nom'));
    return {
      id          : ( node = root.querySelector('infirmier > nom').parentElement) ? node.getAttribute('id') : '',
      prenom      : ( node = root.querySelector('infirmier > prénom'))            ? node.textContent : '',
      nom         : ( node = root.querySelector('infirmier > nom'))               ? node.textContent : '',
      photo       : ( node = root.querySelector('infirmier > photo'))             ? node.textContent : '',
      patients    : ( node = root.querySelector('infirmier > patients'))          ? this.getPatientsFrom( node.parentElement ) : null,
      adresse     : ( node = root.querySelector('infirmier > adresse'))           ? this.getAdresseFrom( node.parentElement ) : null,
    };
  }
  private getPatientsFrom( root: Element): PatientInterface[] {
    const patients: PatientInterface[] = [];
    //const node: Element;
    const patientsXML = root.querySelector('patients') as HTMLElement;
    const patientsNodeList = patientsXML.getElementsByTagName('patient');
    const patientsElements: Element[] = Array.prototype.slice.call(patientsNodeList);
    for (let i = 0; i < patientsElements.length; i++) {
      patients.push(this.getPatient(patientsElements[i]));
    }
    //patientsElements.forEach(patient => patients.push(this.getPatient(patient)));
    return patients;
  }
  private getPatient(root: Element): PatientInterface {
    let node: Element;
    return {
      prenom                : ( node = root.querySelector('patient > prénom')) ? node.textContent : '',
      nom                   : ( node = root.querySelector('patient > nom')) ? node.textContent : '',
      sexe                  : ( node = root.querySelector('patient > sexe')) ? this.toSexe(node.textContent) : null,
      naissance             : ( node = root.querySelector('patient > naissance')) ? node.textContent : '',
      numeroSecuriteSociale : ( node = root.querySelector('patient > numéro')) ? node.textContent : '',
      adresse               : ( node = root.querySelector('patient > adresse')) ? this.getAdresseFrom(node.parentElement) : null,
      intervenant           : ( node = root.querySelector('patient > visite')) ? node.getAttribute('intervenant') : '',

    };
  }
  private toSexe(s: String): sexeEnum {
    if (s === 'F') {
      return sexeEnum.F;
    } else if (s === 'M') {
      return sexeEnum.M;
    } else {
      return null;
    }
  }
  // async initCabinet( cabinet: CabinetInterface) {
  //   cabinet = await this.getData('/data/cabinetInfirmier.xml');
  // }
  getInfirmiers (cabinet: CabinetInterface): InfirmierInterface[] {
    return typeof cabinet !== 'undefined' ? cabinet.infirmiers : [];
    // return typeof this.cabinet !== 'undefined' ? this.cabinet.infirmiers : [];

  }
  getPatientsNonAffectes (cabinet: CabinetInterface): PatientInterface[]  {
    return typeof cabinet !== 'undefined' ? cabinet.patientsNonAffectes : [];
  }
  searchInf(id: string, cabinet: CabinetInterface): InfirmierInterface {
    //const i: InfirmierInterface;
    for (const inf of this.getInfirmiers(cabinet)) {
      if (inf.id === id) {
        return inf;
      }
    }
  }
  searchPat(nir: string, cabinet: CabinetInterface): PatientInterface {
    for (const pat of this.getPatientsNonAffectes(cabinet)) {
      if (pat.numeroSecuriteSociale === nir) {
        return pat;
      }
    }
  }
  public async addPatient(patient: PatientInterface): Promise<PatientInterface> {
    const res = await this._http.post('/addPatient', {
      patientName: patient.nom,
      patientForname: patient.prenom,
      patientNumber: patient.numeroSecuriteSociale,
      patientSex: patient.sexe === sexeEnum.M ? 'M' : 'F',
      patientBirthday: 'AAAA-MM-JJ',
      patientFloor: patient.adresse.etage,
      patientStreetNumber: patient.adresse.numero,
      patientStreet: patient.adresse.rue,
      patientPostalCode: patient.adresse.codePostal,
      patientCity: patient.adresse.ville
    }, {observe: 'response'}).toPromise<HttpResponse<any>>();

    console.log('Add patient renvoie', res);
    if (res.status === 200 && this._cabinet !== undefined) {
      // OK on peut ajouter en local
      this._cabinet.patientsNonAffectes.push( patient );
    }
    return null;
  }
public async affectation(pat: PatientInterface, infID: string): Promise<any> {
  const res = await this._http.post( '/affectation', {
    infirmier: infID,
    patient: pat.numeroSecuriteSociale
  }, {observe: 'response'}).toPromise<HttpResponse<any>>();
  console.log('affecter', res);
}
  public async desaffectation(pat: PatientInterface): Promise<any> {
    const res = await this._http.post( '/affectation', {
      infirmier: 'none',
      patient: pat.numeroSecuriteSociale
    }, {observe: 'response'}).toPromise<HttpResponse<any>>();
    console.log('desaffecter', res);
  }
  public getPatAffectes(id: string, cabinet: CabinetInterface): PatientInterface[] {
    const pats: PatientInterface[] = [];
    for (const pat of this.getPatientsNonAffectes(cabinet)) {
      if (pat.intervenant === id) {
        pats.push(pat);
      }
    }
    return pats;
  }
  // public getPatientsAffectes(id: string): PatientInterface[] {
  //   let node: Element;
  //   let _node: Element;
  //   let idInf;
  //   const patAffectes: PatientInterface[] = [];
  //   const patientsXML = document.querySelector('patients') as HTMLElement;
  //   const patientsNodeList = patientsXML.getElementsByTagName('patient');
  //   const patientsElements: Element[] = Array.prototype.slice.call(patientsNodeList);
  //   for ( const pat of patientsElements) {
  //     if (node = pat.querySelector('visite')) {
  //       idInf = node.getAttribute('intervenant');
  //     }
  //     if (id === idInf) {
  //       const patient: PatientInterface = {
  //         prenom                : ( _node = pat.querySelector('prénom')) ? node.textContent : '',
  //         nom                   : ( _node = pat.querySelector('nom')) ? node.textContent : '',
  //         sexe                  : ( _node = pat.querySelector('sexe')) ? this.toSexe(node.textContent) : null,
  //         naissance             : ( _node = pat.querySelector('naissance')) ? node.textContent : '',
  //         numeroSecuriteSociale : ( _node = pat.querySelector('numéro')) ? node.textContent : '',
  //         adresse               : ( _node = pat.querySelector('adresse')) ? this.getAdresseFrom(node.parentElement) : null,
  //         intervenant           : ( _node = pat.querySelector('visite'))  ? node.getAttribute('intervenant') : '',
  //       };
  //       patAffectes.push(patient);
  //     }
  //   }
  //   return patAffectes;
  // }
}
