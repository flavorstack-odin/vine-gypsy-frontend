import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerDetailsPageComponent } from './dealer-details-page.component';

describe('DealerDetailsPageComponent', () => {
  let component: DealerDetailsPageComponent;
  let fixture: ComponentFixture<DealerDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealerDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
