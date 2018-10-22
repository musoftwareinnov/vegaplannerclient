import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpcCustomerformComponent } from './vpc-customerform.component';

describe('VpcCustomerformComponent', () => {
  let component: VpcCustomerformComponent;
  let fixture: ComponentFixture<VpcCustomerformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpcCustomerformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpcCustomerformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
