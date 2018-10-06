
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpcDashboardComponent } from './vpc-dashboard.component';

describe('VpcDashboardComponent', () => {
  let component: VpcDashboardComponent;
  let fixture: ComponentFixture<VpcDashboardComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VpcDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VpcDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
