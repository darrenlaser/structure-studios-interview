import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BicycleManagerComponent } from './bicycle-manager.component';

describe('BicycleManagerComponent', () => {
  let component: BicycleManagerComponent;
  let fixture: ComponentFixture<BicycleManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BicycleManagerComponent]
    });
    fixture = TestBed.createComponent(BicycleManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
