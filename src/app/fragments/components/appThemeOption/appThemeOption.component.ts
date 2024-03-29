import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-theme-option',
  templateUrl: './appThemeOption.component.html',
  styleUrls: ['appThemeOption.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ThemeOptionComponent {
  @Input() darkMode: boolean;
  @ViewChild('toggleOption') toggleOption: ElementRef;
  @Output() themeToggleDark: EventEmitter<boolean> = new EventEmitter();
  @Input() label: string;

  toggle() {
    (this.toggleOption.nativeElement as HTMLInputElement).blur();
    this.themeToggleDark.emit();
  }
}
