import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadQuizzComponent } from './load-quizz.component';

describe('LoadQuizzComponent', () => {
  let component: LoadQuizzComponent;
  let fixture: ComponentFixture<LoadQuizzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadQuizzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
