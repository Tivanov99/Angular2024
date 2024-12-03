import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAdsPageComponent } from './cars-ads-page.component';

describe('CarsAdsPageComponent', () => {
  let component: CarsAdsPageComponent;
  let fixture: ComponentFixture<CarsAdsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarsAdsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarsAdsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
