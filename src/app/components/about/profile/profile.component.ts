import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'sd-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.profileForm = this.fb.group({
      'name': ['', [Validators.required]],
      'email': ['', [Validators.required]],
      'telephone': ['', [Validators.required]],
      'date': ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      alert('profile saved')
    }
  }

}
