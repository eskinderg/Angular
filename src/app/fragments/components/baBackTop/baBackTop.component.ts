import {
    Component,
    HostListener,
    Input,
    ElementRef,
    AfterViewInit,
    viewChild,
    ChangeDetectionStrategy
} from '@angular/core';
// import * as jQuery from 'jquery';

@Component({
    selector: 'app-back-top',
    styleUrls: ['./baBackTop.scss'],
    template: ` <i #baBackTop class="fa fa-circle-up back-top ba-back-top" title="Back to Top"></i> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class BaBackTopComponent implements AfterViewInit {
    @Input() position = 400;
    @Input() showSpeed = 500;
    @Input() moveSpeed = 1000;

    _selector = viewChild.required<ElementRef>('baBackTop');

    ngAfterViewInit(): void {
        this._onWindowScroll();
    }

    @HostListener('click')
    _onClick(): boolean {
        // jQuery('html, body').animate({ scrollTop: 0 }, { duration: this.moveSpeed });
        return false;
    }

    @HostListener('window:scroll')
    _onWindowScroll(): void {
        // const el = this._selector().nativeElement;
        // window.scrollY > this.position
        //     ? jQuery(el).fadeIn(this.showSpeed)
        //     : jQuery(el).fadeOut(this.showSpeed);
    }
}
