import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsComponent } from './ads.component';

describe('CarsAdsPageComponent', () => {
  let component: AdsComponent;
  let fixture: ComponentFixture<AdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
