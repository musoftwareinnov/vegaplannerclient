import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpcGeneratorstateComponent } from './vpc-generatorstate.component';

describe('VpcGeneratorstateComponent', () => {
  let component: VpcGeneratorstateComponent;
  let fixture: ComponentFixture<VpcGeneratorstateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpcGeneratorstateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpcGeneratorstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
