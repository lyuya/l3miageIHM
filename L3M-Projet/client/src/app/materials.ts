import {MatButtonModule, MatStepperModule, MatCheckboxModule, MatNativeDateModule,
  MatTabsModule, MatSort,
MatExpansionModule, MatGridListModule, MatCardModule, MatChipsModule, MatDatepickerModule,
MatSidenavModule, MatIconModule, MatTableModule, MatListModule,   MatButtonToggleModule
, MatInputModule, MatMenuModule,   MatRadioModule} from '@angular/material';
import {NgModule} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
@NgModule({
  imports: [
MatButtonModule, MatStepperModule, MatRadioModule, MatMenuModule, MatInputModule, MatNativeDateModule,
MatSelectModule, MatFormFieldModule, MatCheckboxModule, MatExpansionModule, MatDatepickerModule, MatTableModule,
    MatTabsModule,
MatGridListModule, MatCardModule, MatChipsModule, MatSidenavModule, MatIconModule, MatListModule,   MatButtonToggleModule,
  ],
  exports: [
MatRadioModule, MatStepperModule, MatButtonModule, MatMenuModule, MatInputModule, MatDatepickerModule,
    MatTabsModule,
MatSelectModule, MatFormFieldModule, MatCheckboxModule, MatExpansionModule, MatGridListModule, MatNativeDateModule,
MatCardModule, MatChipsModule, MatSidenavModule, MatIconModule, MatTableModule, MatListModule,   MatButtonToggleModule,
  ]
})
export class MaterialModule {}


