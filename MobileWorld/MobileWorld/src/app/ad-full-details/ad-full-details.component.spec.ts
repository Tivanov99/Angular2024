import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdFullDetailsComponent } from './ad-full-details.component';


describe('AdFullDetailsComponent', () => {
  let component: AdFullDetailsComponent;
  let fixture: ComponentFixture<AdFullDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdFullDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdFullDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
