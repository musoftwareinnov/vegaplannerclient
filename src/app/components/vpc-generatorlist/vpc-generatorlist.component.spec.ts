import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpcGeneratorlistComponent } from './vpc-generatorlist.component';

describe('VpcGeneratorlistComponent', () => {
  let component: VpcGeneratorlistComponent;
  let fixture: ComponentFixture<VpcGeneratorlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpcGeneratorlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpcGeneratorlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
