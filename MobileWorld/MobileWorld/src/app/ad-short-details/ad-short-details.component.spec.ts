import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdShortDetailsComponent } from './ad-short-details.component';

describe('CarsAdsPageComponent', () => {
  let component: AdShortDetailsComponent;
  let fixture: ComponentFixture<AdShortDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdShortDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdShortDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
