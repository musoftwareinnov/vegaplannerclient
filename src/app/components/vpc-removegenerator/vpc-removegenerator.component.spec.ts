import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpcRemovegeneratorComponent } from './vpc-removegenerator.component';

describe('VpcRemovegeneratorComponent', () => {
  let component: VpcRemovegeneratorComponent;
  let fixture: ComponentFixture<VpcRemovegeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpcRemovegeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpcRemovegeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
