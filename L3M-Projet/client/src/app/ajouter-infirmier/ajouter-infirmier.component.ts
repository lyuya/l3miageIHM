import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CabinetMedicalService} from '../cabinet-medical.service';
import {InfirmierInterface} from '../dataInterfaces/infirmier';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-ajouter-infirmier',
  templateUrl: './ajouter-infirmier.component.html',
  styleUrls: ['./ajouter-infirmier.component.scss']
})
export class AjouterInfirmierComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isOptional = false;
  constructor(private service: CabinetMedicalService, private _formBuilder: FormBuilder, public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddInfComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  ajouterInfirmier (prenom: string, nom: string, etage: string, numRue: string,
                    rue: string, code: string, ville: string) {
      const inf: InfirmierInterface = {
        prenom: prenom,
        nom: nom,
        photo: '',
        adresse: {
          etage : etage,
          codePostal : + code,
          ville : ville,
          rue : rue,
          numero : numRue
        }
    };
      this.service.addInfirmier(inf);
  }
}

@Component({
  selector: 'app-dialog-addinf',
  templateUrl: 'DialogAddInf.html',
})
export class DialogAddInfComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogAddInfComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
    // location.reload(true);
  }
}
