import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpcAppscompletedComponent } from './vpc-appscompleted.component';

describe('VpcAppscompletedComponent', () => {
  let component: VpcAppscompletedComponent;
  let fixture: ComponentFixture<VpcAppscompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpcAppscompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpcAppscompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
