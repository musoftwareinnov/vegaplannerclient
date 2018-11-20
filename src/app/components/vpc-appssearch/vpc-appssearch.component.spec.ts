import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpcAppssearchComponent } from './vpc-appssearch.component';

describe('VpcAppssearchComponent', () => {
  let component: VpcAppssearchComponent;
  let fixture: ComponentFixture<VpcAppssearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpcAppssearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpcAppssearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
