import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpcAppstateformComponent } from './vpc-appstateform.component';

describe('VpcAppstateformComponent', () => {
  let component: VpcAppstateformComponent;
  let fixture: ComponentFixture<VpcAppstateformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpcAppstateformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpcAppstateformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
