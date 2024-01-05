import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveBicycleComponent } from './remove-bicycle.component';

describe('RemoveBicycleComponent', () => {
  let component: RemoveBicycleComponent;
  let fixture: ComponentFixture<RemoveBicycleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveBicycleComponent]
    });
    fixture = TestBed.createComponent(RemoveBicycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
