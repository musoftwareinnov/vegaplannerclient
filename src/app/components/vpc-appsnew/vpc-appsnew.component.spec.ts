import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpcAppsnewComponent } from './vpc-appsnew.component';

describe('VpcAppsnewComponent', () => {
  let component: VpcAppsnewComponent;
  let fixture: ComponentFixture<VpcAppsnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpcAppsnewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpcAppsnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
