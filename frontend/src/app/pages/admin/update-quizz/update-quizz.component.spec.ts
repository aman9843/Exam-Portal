import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQuizzComponent } from './update-quizz.component';

describe('UpdateQuizzComponent', () => {
  let component: UpdateQuizzComponent;
  let fixture: ComponentFixture<UpdateQuizzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateQuizzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
