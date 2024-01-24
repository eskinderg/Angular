import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MynotesComponent } from './mynotes.component';

describe('MynotesComponent', () => {
  let component: MynotesComponent;
  let fixture: ComponentFixture<MynotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MynotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MynotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
