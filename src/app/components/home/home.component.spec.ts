import { FormsModule } from '@angular/forms';
import { async, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

export function main() {
    describe('Home component', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule, HomeComponent]
            });
        });

        it('should work', async(() => {
            TestBed.compileComponents().then(() => {
                // let fixture = TestBed.createComponent(HomeComponent);
                // let homeInstance = fixture.debugElement.componentInstance;
                // let homeDOMEl = fixture.debugElement.nativeElement;

                fixture.detectChanges();
            });
        }));
    });
}
