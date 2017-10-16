import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

import { async } from '@angular/core/testing';
import { Route } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { HeaderComponent } from './components/shared/header/header.component';
// import { Todo } from './shared/components/todo/todo.component';

export function main() {

    describe('App component', () => {

        let config: Route[] = [
            { path: '', component: HomeComponent },
            { path: 'about', component: AboutComponent }
        ];
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule, RouterTestingModule.withRoutes(config)],
                declarations: [TestComponent,
                    HeaderComponent, AppComponent,
                    HomeComponent, AboutComponent],
                providers: [
                    { provide: APP_BASE_HREF, useValue: '/' }
                ]
            });
        });

        it('should build without a problem',
            async(() => {
                TestBed
                    .compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        let compiled = fixture.nativeElement;

                        expect(compiled).toBeTruthy();
                    });
            }));
    });
}

@Component({
    selector: 'test-cmp',
    template: '<sd-app></sd-app>'
})

class TestComponent {
}
