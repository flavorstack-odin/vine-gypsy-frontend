import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapDealerListComponent } from './scrap-dealer-list.component';

describe('ScrapDealerListComponent', () => {
  let component: ScrapDealerListComponent;
  let fixture: ComponentFixture<ScrapDealerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrapDealerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrapDealerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
