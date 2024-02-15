import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NguardComponent } from './nguard.component';

describe('NguardComponent', () => {
  let component: NguardComponent;
  let fixture: ComponentFixture<NguardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NguardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NguardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
