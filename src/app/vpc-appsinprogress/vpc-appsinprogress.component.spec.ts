
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpcAppsinprogressComponent } from './vpc-appsinprogress.component';

describe('VpcAppsinprogressComponent', () => {
  let component: VpcAppsinprogressComponent;
  let fixture: ComponentFixture<VpcAppsinprogressComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VpcAppsinprogressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VpcAppsinprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
