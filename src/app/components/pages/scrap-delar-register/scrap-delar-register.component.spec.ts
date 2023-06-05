import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapDelarRegisterComponent } from './scrap-delar-register.component';

describe('ScrapDelarRegisterComponent', () => {
  let component: ScrapDelarRegisterComponent;
  let fixture: ComponentFixture<ScrapDelarRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrapDelarRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrapDelarRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
