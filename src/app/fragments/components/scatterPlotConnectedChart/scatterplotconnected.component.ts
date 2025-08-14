import { Component, OnInit, ElementRef, viewChild, ChangeDetectionStrategy } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-scatterconnectedchart',
    templateUrl: './scatterplotconnected.component.html',
    styleUrls: ['./scatterplotconnected.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class ScatterPlotConnectedChartComponent implements OnInit {
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
        return [
            { side: 'left', year: 1956, miles: 3683.6965, gas: 2.3829 },
            { side: 'right', year: 1957, miles: 3722.7648, gas: 2.4026 },
            { side: 'bottom', year: 1958, miles: 3776.8595, gas: 2.2539 },
            { side: 'top', year: 1959, miles: 3912.0962, gas: 2.3079 },
            { side: 'right', year: 1960, miles: 3942.1488, gas: 2.2658 },
            { side: 'bottom', year: 1961, miles: 3984.2224, gas: 2.2526 },
            { side: 'right', year: 1962, miles: 4089.4064, gas: 2.2158 },
            { side: 'bottom', year: 1963, miles: 4230.6536, gas: 2.1237 },
            { side: 'bottom', year: 1964, miles: 4383.9219, gas: 2.1039 },
            { side: 'bottom', year: 1965, miles: 4546.2059, gas: 2.1368 },
            { side: 'top', year: 1966, miles: 4681.4425, gas: 2.1421 }
        ];
    }

    createChart(data: Array<any>) {
        const element = this.chartContainer().nativeElement;
        this.width = element.offsetWidth - this.margin.left - this.margin.right;
        this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
        // Declare the positional encodings.
        const x = d3
            .scaleLinear()
            .domain(d3.extent(data, (d) => d.miles))
            .nice()
            .range([this.margin.left, this.width - this.margin.right]);

        const y = d3
            .scaleLinear()
            .domain(d3.extent(data, (d) => d.gas))
            .nice()
            .range([this.height - this.margin.bottom, this.margin.top]);

        const line = d3
            .line<IData>()
            .curve(d3.curveCatmullRom)
            .x((d) => x(d.miles))
            .y((d) => y(d.gas));

        const svg = d3
            .select(element)
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('viewBox', [0, 0, this.width, this.height])
            .attr('style', 'max-width: 100%; height: auto;');

        const l = this.length(line(data));

        svg.append('g')
            .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
            .call(d3.axisBottom(x).ticks(this.width / 80))
            .call((g) => g.select('.domain').remove())
            .call((g) =>
                g.selectAll('.tick line').clone().attr('y2', -this.height).attr('stroke-opacity', 0.1)
            )
            .call((g) =>
                g
                    .append('text')
                    .attr('x', this.width - 4)
                    .attr('y', -4)
                    .attr('font-weight', 'bold')
                    .attr('text-anchor', 'end')
                    .attr('fill', 'currentColor')
                    .text('Miles per person per year')
            );

        svg.append('g')
            .attr('transform', `translate(${this.margin.left},0)`)
            .call(d3.axisLeft(y).ticks(null, '$.2f'))
            .call((g) => g.select('.domain').remove())
            .call((g) => g.selectAll('.tick line').clone().attr('x2', this.width).attr('stroke-opacity', 0.1))
            .call((g) =>
                g
                    .select('.tick:last-of-type text')
                    .clone()
                    .attr('x', 4)
                    .attr('text-anchor', 'start')
                    .attr('font-weight', 'bold')
                    .text('Cost per gallon')
            );

        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-width', 2.5)
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .attr('stroke-dasharray', `0,${l}`)
            .attr('d', line)
            .transition()
            .duration(5000)
            .ease(d3.easeLinear)
            .attr('stroke-dasharray', `${l},${l}`);

        svg.append('g')
            .attr('fill', 'white')
            .attr('stroke', 'black')
            .attr('stroke-width', 2)
            .selectAll('circle')
            .data(data)
            .join('circle')
            .attr('cx', (d) => x(d.miles))
            .attr('cy', (d) => y(d.gas))
            .attr('r', 3);

        const label = svg
            .append('g')
            .attr('font-family', 'sans-serif')
            .attr('font-size', 10)
            .selectAll()
            .data(data)
            .join('text')
            .attr('transform', (d) => `translate(${x(d.miles)},${y(d.gas)})`)
            .attr('fill-opacity', 0)
            .text((d) => d.year)
            .attr('stroke', 'white')
            .attr('paint-order', 'stroke')
            .attr('fill', 'currentColor')
            .each(function (d) {
                const t = d3.select(this);
                switch (d.side) {
                    case 'top':
                        t.attr('text-anchor', 'middle').attr('dy', '-0.7em');
                        break;
                    case 'right':
                        t.attr('dx', '0.5em').attr('dy', '0.32em').attr('text-anchor', 'start');
                        break;
                    case 'bottom':
                        t.attr('text-anchor', 'middle').attr('dy', '1.4em');
                        break;
                    case 'left':
                        t.attr('dx', '-0.5em').attr('dy', '0.32em').attr('text-anchor', 'end');
                        break;
                }
            });

        label
            .transition()
            .delay((_d, i) => (this.length(line(data.slice(0, i + 1))) / l) * (5000 - 125))
            .attr('fill-opacity', 1);
    }

    length(pathData: any) {
        const pathElement: SVGPathElement = d3
            .create('svg:path')
            .attr('d', pathData)
            .node() as SVGPathElement;

        const totalLength: number = pathElement.getTotalLength();

        return totalLength;
    }
}

interface IData {
    side: string;
    year: number;
    miles: number;
    gas: number;
}
