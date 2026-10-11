import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgtPasswordComponent } from './forgt-password.component';

describe('ForgtPasswordComponent', () => {
  let component: ForgtPasswordComponent;
  let fixture: ComponentFixture<ForgtPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgtPasswordComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgtPasswordComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
