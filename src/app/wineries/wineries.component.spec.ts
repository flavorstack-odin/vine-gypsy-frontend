import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineriesComponent } from './wineries.component';

describe('WineriesComponent', () => {
  let component: WineriesComponent;
  let fixture: ComponentFixture<WineriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WineriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WineriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
