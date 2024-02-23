import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../shared/services/auth/auth.service'; // dependency service
import { Router } from '@angular/router';

import { AuthorizationComponent } from './authorization.component';

// class AuthServiceStub {
//   isLoggedInObs(): boolean {
//     return false;
//   }

// mgr(): () => eskinder{
//    return null;
// }
// }

describe('AuthorizationComponent', () => {
  let component: AuthorizationComponent;
  let fixture: ComponentFixture<AuthorizationComponent>;
  const mockRouter = { navigate: jasmine.createSpy('navigate') };
  // let authserviceSpy = { mgr: jasmine.createSpy('mgr') };
  // let myServiceDependency: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorizationComponent],
      providers: [{ provide: AuthService }, { provide: Router, useValue: mockRouter }]
    }).compileComponents();

    // myServiceDependency = TestBed.get(AuthService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizationComponent);
    component = fixture.componentInstance;
    spyOn(component, 'ngOnInit');
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
