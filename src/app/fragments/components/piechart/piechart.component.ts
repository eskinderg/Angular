import { Component, OnInit, ElementRef, viewChild, ChangeDetectionStrategy } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-piechart',
    templateUrl: './piechart.component.html',
    styleUrls: ['./piechart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class PieChartComponent implements OnInit {
    chartContainer = viewChild.required<ElementRef>('chart');

    private margin: any = { top: 10, bottom: 10, left: 0, right: 0 };
    private width: number;
    private height: number;
    private data: any;
    private path: any;
    private arc: any;
    private _currentData: any[] = [];

    constructor() {}

    ngOnInit() {
        this.data = this.generateSampleData();
        this.createChart(this.data);
    }

    generateSampleData() {
        return [
            { apples: 53245, oranges: 200 },
            { apples: 28479, oranges: 200 },
            { apples: 19697, oranges: 200 },
            { apples: 24037, oranges: 200 },
            { apples: 40245, oranges: 200 }
        ];
    }

    createChart(data: Array<any>) {
        const element = this.chartContainer().nativeElement;
        this.width = element.offsetWidth - this.margin.left - this.margin.right;
        this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
        const outerRadius = this.height / 2 - 10;
        const innerRadius = outerRadius * 0.75;
        const color = d3.scaleOrdinal(d3.schemeObservable10);

        const svg = d3
            .select(element)
            .append('svg')
            .attr('viewBox', [-this.width / 2, -this.height / 2, this.width, this.height]);

        this.arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

        const pie = d3
            .pie()
            .sort(null)
            .value((d) => d['apples']);

        this.path = svg
            .datum(data)
            .selectAll('path')
            .data(pie)
            .join('path')
            .attr('fill', (_d, i) => color(i.toString()))
            .attr('d', this.arc)
            .each((d, i) => {
                this._currentData[i] = d;
            }); // store the initial angles
    }

    change(value: string) {
        const pie = d3
            .pie()
            .sort(null)
            .value((d) => (d as any)[value]);

        // Update the path data and transition
        this.path.data(pie(this.data));
        this.path.transition().duration(750).attrTween('d', this.arcTween());
    }

    arcTween() {
        return (d: any, i: number) => {
            // Interpolate from the stored data to the new data `d`
            const interpolate = d3.interpolate(this._currentData[i], d);
            // Update the stored data with the new data
            this._currentData[i] = d;
            // Return the function that will be called by D3 to generate the path
            return (t: any) => {
                return d3
                    .arc()
                    .innerRadius(this.height / 2 - 10)
                    .outerRadius((this.height / 2 - 10) * 0.75)(interpolate(t));
            };
        };
    }
}
