import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpcGeneratornewComponent } from './vpc-generatornew.component';

describe('VpcGeneratornewComponent', () => {
  let component: VpcGeneratornewComponent;
  let fixture: ComponentFixture<VpcGeneratornewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpcGeneratornewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpcGeneratornewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
