import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpcCustomerlistComponent } from './vpc-customerlist.component';

describe('VpcCustomerlistComponent', () => {
  let component: VpcCustomerlistComponent;
  let fixture: ComponentFixture<VpcCustomerlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpcCustomerlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpcCustomerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
