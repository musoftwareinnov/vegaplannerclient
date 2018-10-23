import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpcGeneratorstatelistComponent } from './vpc-generatorstatelist.component';

describe('VpcGeneratorstatelistComponent', () => {
  let component: VpcGeneratorstatelistComponent;
  let fixture: ComponentFixture<VpcGeneratorstatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpcGeneratorstatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpcGeneratorstatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
