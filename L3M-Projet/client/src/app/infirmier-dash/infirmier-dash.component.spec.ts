import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfirmierDashComponent } from './infirmier-dash.component';

describe('InfirmierDashComponent', () => {
  let component: InfirmierDashComponent;
  let fixture: ComponentFixture<InfirmierDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfirmierDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfirmierDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
