# Projet Cabinet Medicale IHM

This project is a medical cabinet management system, built as a web application with Angular. It enables users to manage patients and nurses (infirmiers), perform CRUD operations, and assign patients to nurses.

**This project was generated with Angular CLI version 7.0.4.**
#
## Tech Stack

- **Frontend:** Angular 7
- **Backend:** Node.js with Express.js
- **UI Components:** Angular Material
- **Additional Libraries:**
  - alx-dragdrop for drag-and-drop functionality.

## Dependancies:

- **Angular Material:** Provides a set of reusable UI components.
- **alx-dragdrop:** Used for drag-and-drop interactions within the app.

## Getting Started

**Clone the Repository**

To get started, clone the project from GitHub:
```sh
$git clone https://github.com/lyuya/l3miageIHM.git
```
## Installation and Setup

### run the server:

The backend server has additional requests to handle the management of patients and nurses. Ensure the server is running locally on port 8090. Here’s how to configure and start it:

```json
  "/deletePatient": {
    "target": "http://localhost:8090",
    "secure": false
  },
  "/addInfirmier": {
    "target": "http://localhost:8090",
    "secure": false
  },
  "/deleteInfirmier": {
    "target": "http://localhost:8090",
    "secure": false
  }
```
Start the server by navigating to the serveur folder and running the server:

```sh
$cd l3miageIHM/L3M-Projet/serveur
$npm install
$npm start
```
After starting the server, you can access the server page at http://localhost:8090/.


### run the client:

Now, start the frontend (Angular) client. Navigate to the client directory and run:

```sh
$cd ../client
$npm install
$npm start
```
Once the client is running, open your browser and navigate to http://localhost:4200/ to access the web application.

## Components Overview

The project is structured around several components:

- AppComponent: The main component that holds the structure of the application.
- SecretaryComponent: (Currently unused)
- PatientComponent: Displays a list of patients.
- InfirmierComponent: Displays a list of nurses (infirmiers).
- AjouterPatientComponent: Adds new patients.
- PatientInfoComponent: Displays detailed information about a patient.
- InfirmierInfoComponent: Displays detailed information about a nurse.
- InfirmierDashComponent: Dashboard for managing nurses.
- AjouterInfirmierComponent: Adds new nurses.
- PatientDashComponent: Dashboard for managing patients.
- DialogComponent, DialogDeleteComponent, DialogAffecterComponent, DialogDesaffecterComponent, DialogDeleteInfComponent: Various dialogs for managing patients and nurses.
- BienvenueComponent: Welcome page component.

## Application Routing

Here is the routing configuration for the application:

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
## Features:

- Left Sidebar: Displays a list of patients and nurses. This list is powered by PatientComponent and InfirmierComponent.
- Patient Dashboard (/patientDash):
  - View a list of all patients.
  - You can delete patients from this page.
- Nurse Dashboard (/infirmierDash):
  - View a list of all nurses.
  - You can delete nurses from this page.
- Floating Action Button (FAB):
  - On the right side, you can click a button to open a small navigation menu, which allows you to add new patients or nurses.

![2019-01-07 03 28 35](https://user-images.githubusercontent.com/37207110/50747261-47475500-1233-11e9-8b7a-b1dbc3481300.png)

- Detail View:
  - Click on a patient or nurse to navigate to their profile page.
- Nurse Information (/infirmierInfo/:id):
  - Assign a patient to a nurse using either a dropdown list or drag-and-drop.
  - Unassign a patient using the dropdown list.
- Patient Assignment Colors:
- Red: The patient is not yet assigned to any nurse (only the assign button is available).
- Black: The patient is assigned to another nurse (only the assign button is available).
- Green: The patient is already assigned to this nurse (only the unassign button is available).

## Unimplemented Features
- Data Modification: Editing patient and nurse details is currently not supported.
- Uploading Nurse Photos: The interface to upload a nurse’s photo is built, but functionality is incomplete. The first step of creating a nurse works, but the second step (photo upload) does not.

## Reference:
1. https://codepen.io/miroot/pen/rnvkG
2. https://material.angular.io
3. https://github.com/AlexDmr/alx-dragdrop#readme


