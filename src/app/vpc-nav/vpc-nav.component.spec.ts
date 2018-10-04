
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { VpcNavComponent } from './vpc-nav.component';

describe('VpcNavComponent', () => {
  let component: VpcNavComponent;
  let fixture: ComponentFixture<VpcNavComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule],
      declarations: [VpcNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VpcNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
