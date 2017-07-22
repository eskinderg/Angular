import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth/auth.service';
import { User } from 'oidc-client';

@Component({
  moduleId: module.id,
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  public user: User;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.user = this.authService.currentUser;
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
