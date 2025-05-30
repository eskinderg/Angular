import { FormsModule } from '@angular/forms';
import { async, TestBed } from '@angular/core/testing';

// import { Observable } from 'rxjs';

import { ProfileComponent } from './profile.component';
// import { NameListService } from '../shared/name-list/name-list.service';

export function main() {
    describe('Profile component', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule, ProfileComponent]
            });
        });

        it('should work', async(() => {
            TestBed.compileComponents().then(() => {
                const fixture = TestBed.createComponent(ProfileComponent);
                // const homeInstance = fixture.debugElement.componentInstance;
                // const homeDOMEl = fixture.debugElement.nativeElement;
                // let mockNameListService =
                // fixture.debugElement.injector.get<any>(NameListService) as MockNameListService;
                // let nameListServiceSpy = spyOn(mockNameListService, 'get').and.callThrough();

                // mockNameListService.returnValue = ['1', '2', '3'];

                // fixture.detectChanges();

                // expect(homeInstance.nameListService).toEqual(jasmine.any(MockNameListService));
                // expect(homeDOMEl.querySelectorAll('li').length).toEqual(3);
                // expect(nameListServiceSpy.calls.count()).toBe(1);

                // homeInstance.newName = 'Minko';
                // homeInstance.addName();

                fixture.detectChanges();

                // expect(homeDOMEl.querySelectorAll('li').length).toEqual(4);
                // expect(homeDOMEl.querySelectorAll('li')[3].textContent).toEqual('Minko');
            });
        }));
    });
}

// class MockNameListService {
//   returnValue: string[];

//   get(): Observable<string[]> {
//     return Observable.create((observer: any) => {
//       observer.next(this.returnValue);
//       observer.complete();
//     });
//   }
// }
