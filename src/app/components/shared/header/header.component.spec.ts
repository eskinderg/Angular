import { Observable } from 'rxjs';
import { HeaderComponent } from './header.component';
import { EventEmitter } from '@angular/core';

describe('Header Component', () => {

  let component: HeaderComponent;
  let fakeUserService: any;

  beforeEach (() => {
    fakeUserService = {
      userLoadededEvent: new EventEmitter()
    };

    component = new HeaderComponent(fakeUserService);
    fakeUserService.userLoadededEvent.emit('fake_user');
  });

  it('Header Component', () => {
    expect(component).toBeDefined();
    expect(component.isExpanded).toEqual(false);
    expect(component.isExpanded).toBeFalsy();
  });

  it('User Should be Loaded when initialized ', () => {
    component.ngOnInit();
    expect(component._user).toBeUndefined();
  });

});
