import {MatButtonModule, MatStepperModule, MatCheckboxModule, MatNativeDateModule,
  MatTabsModule, MatDialogModule, MatSnackBarModule,
MatExpansionModule, MatGridListModule, MatCardModule, MatChipsModule, MatDatepickerModule,
MatSidenavModule, MatIconModule, MatTableModule, MatListModule,   MatButtonToggleModule
, MatInputModule, MatMenuModule,   MatRadioModule} from '@angular/material';
import {NgModule} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
@NgModule({
  exports: [
MatRadioModule, MatStepperModule, MatButtonModule, MatMenuModule, MatInputModule, MatDatepickerModule,
    MatTabsModule, MatDialogModule, MatSnackBarModule,
MatSelectModule, MatFormFieldModule, MatCheckboxModule, MatExpansionModule, MatGridListModule, MatNativeDateModule,
MatCardModule, MatChipsModule, MatSidenavModule, MatIconModule, MatTableModule, MatListModule,   MatButtonToggleModule,
  ]
})
export class MaterialModule {}


