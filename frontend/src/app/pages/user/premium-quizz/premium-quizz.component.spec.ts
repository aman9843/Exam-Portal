import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumQuizzComponent } from './premium-quizz.component';

describe('PremiumQuizzComponent', () => {
  let component: PremiumQuizzComponent;
  let fixture: ComponentFixture<PremiumQuizzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PremiumQuizzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
