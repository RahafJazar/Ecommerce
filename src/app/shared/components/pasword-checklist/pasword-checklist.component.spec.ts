import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaswordChecklistComponent } from './pasword-checklist.component';

describe('PaswordChecklistComponent', () => {
  let component: PaswordChecklistComponent;
  let fixture: ComponentFixture<PaswordChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaswordChecklistComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaswordChecklistComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
