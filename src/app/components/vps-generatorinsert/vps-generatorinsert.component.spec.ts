import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpsGeneratorinsertComponent } from './vps-generatorinsert.component';

describe('VpsGeneratorinsertComponent', () => {
  let component: VpsGeneratorinsertComponent;
  let fixture: ComponentFixture<VpsGeneratorinsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpsGeneratorinsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpsGeneratorinsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
