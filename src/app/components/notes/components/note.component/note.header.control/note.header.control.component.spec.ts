import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteHeaderControlComponent } from './note.header.control.component';

describe('NoteHeaderControlComponent', () => {
  let component: NoteHeaderControlComponent;
  let fixture: ComponentFixture<NoteHeaderControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteHeaderControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoteHeaderControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
