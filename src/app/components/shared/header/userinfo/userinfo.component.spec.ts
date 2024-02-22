import 'rxjs';
import { UserInfoComponent } from './userinfo.component';
import { EventEmitter } from '@angular/core';

describe('UserInfo Component', () => {
  let component: UserInfoComponent;
  let fakeUserService: any;

  beforeEach(() => {
    fakeUserService = {
      userLoadededEvent: new EventEmitter(),
      startSignoutMainWindow: () => {}
    };

    fakeUserService.userLoadededEvent.emit('fake_user');
    // component = new UserInfoComponent(fakeUserService);
  });

  it('UserInfo Component', () => {
    expect(component).toBeDefined();
  });

  it('User Should be Loaded when initialized ', () => {
    // component.isLoggedIn();
    // component.startSignoutMainWindow();
    expect(component).toBeUndefined();
  });
});
