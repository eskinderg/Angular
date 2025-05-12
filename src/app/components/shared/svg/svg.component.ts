import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    ElementRef,
    OnChanges,
    SimpleChanges,
    ChangeDetectionStrategy
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-svg-icon',
    template: '',
    host: {
        '[class]': 'class'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgIconComponent implements OnInit, OnChanges {
    @Input() src = '';
    @Input() width = '21';
    @Input() height = '21';
    @Input() stroke = '';
    @Input() fill = '';
    @Input() class = '';

    @Output() clicked = new EventEmitter<Event>();
    @Output() hovered = new EventEmitter<Event>();
    @Output() mouseUp = new EventEmitter<Event>();
    @Output() mouseLeft = new EventEmitter<Event>();

    private svgElement: SVGSVGElement | null = null;

    constructor(
        private http: HttpClient,
        private el: ElementRef
    ) {}

    ngOnInit() {
        this.http.get(this.src, { responseType: 'text' }).subscribe((svg) => {
            const div = document.createElement('div');
            div.innerHTML = svg;
            this.svgElement = div.querySelector('svg');

            if (this.svgElement) {
                // Clean old styles
                this.svgElement.querySelectorAll('[fill]').forEach((el) => el.removeAttribute('fill'));
                this.svgElement.querySelectorAll('[stroke]').forEach((el) => el.removeAttribute('stroke'));

                // Dimensions
                this.svgElement.setAttribute('width', this.width);
                this.svgElement.setAttribute('height', this.height);
                this.svgElement.setAttribute('style', 'display:block;');

                // fill/stroke
                if (this.stroke) this.svgElement.setAttribute('stroke', this.stroke);
                if (this.fill) this.svgElement.setAttribute('fill', this.fill);

                // Initial class
                if (this.class) {
                    this.svgElement.setAttribute('class', this.class);
                }

                // Events
                this.svgElement.addEventListener('click', (event) => this.clicked.emit(event));
                this.svgElement.addEventListener('mouseover', (event) => this.hovered.emit(event));
                this.svgElement.addEventListener('mouseout', (event) => this.mouseLeft.emit(event));
                this.svgElement.addEventListener('mouseup', (event) => this.mouseUp.emit(event));

                // Attach to host
                this.el.nativeElement.appendChild(this.svgElement);
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['class'] && this.svgElement) {
            this.svgElement.setAttribute('class', this.class || '');
        }
    }
}
