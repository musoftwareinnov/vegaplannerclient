import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpcCustomerappslistComponent } from './vpc-customerappslist.component';

describe('VpcCustomerappslistComponent', () => {
  let component: VpcCustomerappslistComponent;
  let fixture: ComponentFixture<VpcCustomerappslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpcCustomerappslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpcCustomerappslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
