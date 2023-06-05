import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidItemsComponent } from './bid-items.component';

describe('BidItemsComponent', () => {
  let component: BidItemsComponent;
  let fixture: ComponentFixture<BidItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BidItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BidItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
