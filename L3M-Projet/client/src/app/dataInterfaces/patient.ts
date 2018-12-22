import {sexeEnum} from './sexe';
import {Adresse} from './adresse';

export interface PatientInterface {
  prenom: string;
  nom: string;
  sexe: sexeEnum;
  naissance: string;
  numeroSecuriteSociale: string;
  adresse: Adresse;
  intervenant: string;
}
