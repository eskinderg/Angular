import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteArchiveComponent } from './note.archive.component';

describe('NoteArchiveComponent', () => {
  let component: NoteArchiveComponent;
  let fixture: ComponentFixture<NoteArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteArchiveComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NoteArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
