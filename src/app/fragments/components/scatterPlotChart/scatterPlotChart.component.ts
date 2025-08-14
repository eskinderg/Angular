import { Component, OnInit, ElementRef, viewChild, ChangeDetectionStrategy } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-scatterchart',
    templateUrl: './scatterPlotChart.component.html',
    styleUrls: ['./scatterPlotChart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class ScatterPlotChartComponent implements OnInit {
    chartContainer = viewChild.required<ElementRef>('chart');

    private margin: any = { top: 20, bottom: 20, left: 20, right: 20 };
    private width: number;
    private height: number;

    constructor() {}

    ngOnInit() {
        const data = this.generateSampleData();
        this.createChart(data);
    }

    generateSampleData() {
        const values: Array<any> = [];

        for (let i = 0; i < 8 + Math.floor(Math.random() * 10); i++) {
            values.push({
                Miles_per_Gallon: Math.floor(Math.random() * 100),
                Horsepower: Math.floor(Math.random() * 100),
                field: `Index ${i}`,
                frequency: Math.floor(Math.random() * 100)
            });
        }

        return values;
    }

    createChart(data: Array<any>) {
        const element = this.chartContainer().nativeElement;
        this.width = element.offsetWidth - this.margin.left - this.margin.right;
        this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

        const x = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d['Miles_per_Gallon'])])
            .nice()
            .range([this.margin.left, this.width - this.margin.right])
            .unknown(this.margin.left);

        // Create the vertical (y) scale, positioning N/A values on the bottom margin.
        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d['Horsepower'])])
            .nice()
            .range([this.height - this.margin.bottom, this.margin.top])
            .unknown(this.height - this.margin.bottom);

        // Create the SVG container.
        const svg = d3
            .select(element)
            .append('svg')
            .attr('width', this.width)
            .attr('viewBox', [0, 0, this.width, this.height])
            .property('value', []);

        // Append the axes.
        svg.append('g')
            .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
            .call(d3.axisBottom(x))
            .call((g) => g.select('.domain').remove())
            .call((g) =>
                g
                    .append('text')
                    .attr('x', this.width - this.margin.right)
                    .attr('y', -4)
                    .attr('fill', '#000')
                    .attr('font-weight', 'bold')
                    .attr('text-anchor', 'end')
                    .text('Miles per Gallon')
            );

        svg.append('g')
            .attr('transform', `translate(${this.margin.left},0)`)
            .call(d3.axisLeft(y))
            .call((g) => g.select('.domain').remove())
            .call((g) =>
                g
                    .select('.tick:last-of-type text')
                    .clone()
                    .attr('x', 4)
                    .attr('text-anchor', 'start')
                    .attr('font-weight', 'bold')
                    .text('Horsepower')
            );

        // Append the dots.
        const dot = svg
            .append('g')
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 1.5)
            .selectAll('circle')
            .data(data)
            .join('circle')
            .attr('transform', (d) => `translate(${x(d['Miles_per_Gallon'])},${y(d['Horsepower'])})`)
            .attr('r', 3);

        // Create the brush behavior.
        svg.call(
            d3.brush().on('start brush end', ({ selection }) => {
                let value = [];
                if (selection) {
                    const [[x0, y0], [x1, y1]] = selection;
                    value = dot
                        .style('stroke', 'gray')
                        .filter(
                            (d) =>
                                x0 <= x(d['Miles_per_Gallon']) &&
                                x(d['Miles_per_Gallon']) < x1 &&
                                y0 <= y(d['Horsepower']) &&
                                y(d['Horsepower']) < y1
                        )
                        .style('stroke', 'steelblue')
                        .data();
                } else {
                    dot.style('stroke', 'steelblue');
                }

                // Inform downstream cells that the selection has changed.
                svg.property('value', value).dispatch('input');
            })
        );
    }
}
