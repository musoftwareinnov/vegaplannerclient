import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpsGeneratorremoveComponent } from './vpc-removegenerator.component';

describe('VpsGeneratorremoveComponent', () => {
  let component: VpsGeneratorremoveComponent;
  let fixture: ComponentFixture<VpsGeneratorremoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpsGeneratorremoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpsGeneratorremoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
