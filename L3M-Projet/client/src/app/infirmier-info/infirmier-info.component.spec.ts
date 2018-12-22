import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfirmierInfoComponent } from './infirmier-info.component';

describe('InfirmierInfoComponent', () => {
  let component: InfirmierInfoComponent;
  let fixture: ComponentFixture<InfirmierInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfirmierInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfirmierInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
