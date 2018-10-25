import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpcAppdetailsComponent } from './vpc-appdetails.component';

describe('VpcAppdetailsComponent', () => {
  let component: VpcAppdetailsComponent;
  let fixture: ComponentFixture<VpcAppdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpcAppdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpcAppdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
