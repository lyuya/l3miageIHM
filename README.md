# Projet Cabinet Medicale IHM
#
##### This project was generated with Angular CLI version 7.0.4.
#
### Tech

* Angular 7
* node.js
* Express.js
### Dependancies:

* Angular Material
* alx-dragdrop

#### Get my project in github:
```sh
$git clone https://github.com/lyuya/l3miageIHM.git
```
### Installation:
##### run the server:
#
```sh
$cd /l3miageIHM/L3M-Projet/serveur
$npm start
```
###### Then navigate to `http://localhost:8090/` for the page of server.
#
##### run the client:
#
```sh
$cd ../client
$npm start
```
###### Then navigate to `http://localhost:4200/` for the page of client.
#
### The components
#
    AppComponent,
    SecretaryComponent (unused),
    PatientComponent ,
    InfirmierComponent,
    AjouterPatientComponent,
    PatientInfoComponent,
    InfirmierInfoComponent,
    InfirmierDashComponent,
    AjouterInfirmierComponent,
    PatientDashComponent,
    DialogComponent,
    DialogDeleteComponent,
    DialogAffecterComponent,
    DialogDesaffecterComponent,
    DialogDeleteInfComponent,
    BienvenueComponent
#
### Routing
```
const routes: Routes = [
  { path: 'ajouterPatient', component: AjouterPatientComponent },
  { path: 'ajouterInfirmier', component: AjouterInfirmierComponent },
  { path: 'patientInfo/:nir', component: PatientInfoComponent },
  { path: 'infirmierInfo/:id', component: InfirmierInfoComponent},
  { path: 'infirmierDash', component: InfirmierDashComponent},
  { path: 'patientDash', component: PatientDashComponent},
  { path: '', component: BienvenueComponent }
];
```
### Function:
In all the pages, you can check a list of patient and a list of infirmier in the left side which is built with component PatientComponent and InfirmierComponent.

Click `Patients`, enter routing `/patientDash` see the liste of all the patients, and we can delete them.

Click `Infirmiers`, enter routing `/infirmierDash` see the list of all the infirmiers, and we can delete them.

In the right there are a symbol which you can open a small nav to choose add a new patient/infirmier
#
![2019-01-07 03 28 35](https://user-images.githubusercontent.com/37207110/50747261-47475500-1233-11e9-8b7a-b1dbc3481300.png)
#
Click some patient or infirmier you can enter a routing and see the detail profile.
#
In the routing `/infirmierInfo/(infirmierID)`, you can:
#
1. affect a patient with a select list, or drag-drop
2. desaffect a patient with a select list
#
##### In the select list, the patients are divided to 3 differents colors:
#
1. red: not yet affected (only affect button)
2. black: affected to the other nurse (only affect button)
3. green: already affected to this nurse (only desaffect button)
#
### The funtions unrealized:
1. Modification of the data.
2. Upload the photo of the infirmiers.(In the creation of the new infirmier, we can add the new infirmier in the first step by clicking button `prochain` , but for the second step, i made the interface to upload, but it doesn't work.)
#
### Reference:
1. https://codepen.io/miroot/pen/rnvkG
2. https://material.angular.io
3. https://github.com/AlexDmr/alx-dragdrop#readme


