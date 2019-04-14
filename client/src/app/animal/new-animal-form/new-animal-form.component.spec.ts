import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAnimalFormComponent } from './new-animal-form.component';

describe('NewAnimalFormComponent', () => {
  let component: NewAnimalFormComponent;
  let fixture: ComponentFixture<NewAnimalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAnimalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAnimalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
