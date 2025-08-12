import {
    Component,
    OnInit,
    ElementRef,
    Input,
    ViewEncapsulation,
    viewChild,
    ChangeDetectionStrategy
} from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-barchart',
    templateUrl: './barchart.component.html',
    styleUrls: ['./barchart.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class BarchartComponent implements OnInit {
    chartContainer = viewChild.required<ElementRef>('chart');

    @Input() public data: Array<any> = this.generateSampleData();
    @Input() public yHeader: string;
    @Input() public xHeader: string;

    private margin: any = { top: 20, bottom: 20, left: 20, right: 20 };
    private chart: any;
    private width: number;
    private height: number;
    private xScale: any;
    private yScale: any;
    private colors: any;
    private xAxis: any;
    private yAxis: any;

    // height = Math.min(500, this.width / 2);
    // outerRadius = this.height / 2 - 10;
    // innerRadius = this.outerRadius * 0.75;
    // tau = 2 * Math.PI;
    // color = d3.scaleOrdinal(d3.schemeObservable10);

    // svg = d3.create('svg').attr('viewBox', [-this.width / 2, -this.height / 2, this.width, this.height]);

    // arc: any = d3.arc().innerRadius(this.innerRadius).outerRadius(this.outerRadius);

    // _current: any;

    // pie: any = d3
    //     .pie()
    //     .sort(null)
    //     .value((d) => d['apples']);

    // path = this.svg
    //     .datum(this.data)
    //     .selectAll('path')
    //     .data(this.pie)
    //     .join('path')
    //     .attr('fill', (d, i) => this.color(i.toString()))
    //     .attr('d', this.arc)
    //     .each(function (d) {
    //         // this._current = d;
    //         // console.log(this);
    //     }); // store the initial angles

    ngOnInit() {
        if (!this.data) {
            this.createChart(this.generateSampleData());
        } else {
            this.createChart(this.data);
        }
    }

    // ngOnChanges() {
    // if (this.chart) {
    //     this.updateChart();
    // }
    // }

    generateSampleData() {
        const values: Array<any> = [];

        for (let i = 0; i < 8 + Math.floor(Math.random() * 10); i++) {
            values.push({ column: `Column ${i}`, value: Math.round(Math.random() * 100) });
        }

        return values;
    }

    createChart(data: Array<any>) {
        const element = this.chartContainer().nativeElement;
        this.width = element.offsetWidth - this.margin.left - this.margin.right;
        this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

        this.colors = d3
            .scaleLinear()
            .domain([0, data.length])
            .range(<any[]>['#2a6ada', 'white']);

        // const x = d3
        //     .scaleBand()
        //     .domain(d3.sort(data, (d) => -d.value).map((d) => d.column))
        //     .range([this.margin.left, this.width - this.margin.right])
        //     .padding(0.1);

        // this.xAxis = d3.axisBottom(x).tickSizeOuter(0);

        // // Create the vertical scale.
        // const y = d3
        //     .scaleLinear()
        //     .domain([0, d3.max(data, (d) => d.value)])
        //     .nice()
        //     .range([this.height - this.margin.bottom, this.margin.top]);

        // // Create the SVG container and call the zoom behavior.
        // const svg = d3
        //     .select(element)
        //     .append('svg')
        //     .attr('viewBox', [0, 0, this.width, this.height])
        //     .attr('width', this.width)
        //     .attr('height', this.height)
        //     .attr('style', 'max-width: 100%; height: 100%;');
        // // .call(zoom);

        // // Appending the bars.
        // svg.append('g')
        //     .attr('class', 'bars')
        //     .selectAll('rect')
        //     .data(data)
        //     .join('rect')
        //     .attr('x', (d) => x(d.column))
        //     .attr('y', (d) => y(d.value))
        //     .attr('height', (d) => y(0) - y(d.value))
        //     .attr('width', x.bandwidth())
        //     .style('fill', (_d: any, i: any) => this.colors(i));

        // // Append the axes.
        // svg.append('g')
        //     .attr('class', 'x-axis')
        //     .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
        //     .call(this.xAxis);

        // svg.append('g')
        //     .attr('class', 'y-axis')
        //     .attr('transform', `translate(${this.margin.left},0)`)
        //     .call(d3.axisLeft(y))
        //     .call((g) => g.select('.domain').remove());

        const x = d3
            .scaleBand()
            .domain(data.map((d) => d.column))
            .range([this.margin.left, this.width - this.margin.right])
            .padding(0.1);

        // Declare the y (vertical position) scale.
        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.value)])
            .range([this.height - this.margin.bottom, this.margin.top]);

        this.xScale = x;
        this.yScale = y;

        // Create the SVG container.
        const svg = d3
            .select(element)
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('viewBox', [0, 0, this.width, this.height])
            .attr('style', 'max-width: 100%; height: 100%;');

        // Add a rect for each bar.
        svg.append('g')
            .selectAll()
            .data(data)
            .join('rect')
            .attr('x', (d) => x(d.column))
            .attr('y', (d) => y(d.value))
            .attr('height', (d) => y(0) - y(d.value))
            .attr('width', x.bandwidth())
            .style('fill', (_d: any, i: any) => this.colors(i));

        // Add the x-axis and label.
        svg.append('g')
            .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
            .call(d3.axisBottom(x).tickSizeOuter(0))
            .call((g) =>
                g
                    .append('text')
                    .attr('x', this.width / 2)
                    .attr('y', this.margin.bottom + 20)
                    .attr('fill', '#2a6ada')
                    .attr('font-size', '1.25rem')
                    .text(this.xHeader ?? '← Index →')
            );

        // Add the y-axis and label, and remove the domain line.
        svg.append('g')
            .attr('transform', `translate(${this.margin.left},0)`)
            .call(d3.axisLeft(y).tickFormat((y: any) => y))
            .call((g) => g.select('.domain').remove())
            .call((g) =>
                g
                    .append('text')
                    .attr('x', -this.margin.left)
                    .attr('y', 0)
                    .attr('fill', '#2a6ada')
                    .attr('font-size', '1.25rem')
                    .attr('text-anchor', 'start')
                    .text(this.yHeader ?? '↑ value (%)')
            );

        // add label for each bar
        svg.selectAll('.bar-label')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'bar-label')
            .attr('font-size', '0.75rem')
            .attr('fill', 'var(--body-color)')
            .attr('x', (d) => x(d.column) + x.bandwidth() / 2)
            .attr('y', (d) => y(d.value) - 5) // Adjust offset as needed
            .attr('text-anchor', 'middle')
            .text((d) => d.value);
    }

    updateChart() {
        // console.log(this.xAxis);
        // update scales & axis
        this.xScale.domain(this.data.map((d) => d.column));
        this.yScale.domain([0, d3.max(this.data, (d) => d.value)]);
        this.colors.domain([0, this.data.length]);
        this.xAxis.transition().call(d3.axisBottom(this.xScale));
        this.yAxis.transition().call(d3.axisLeft(this.yScale));

        const update = this.chart.selectAll('.bar').data(this.data);

        // console.log(this.xScale(123));
        // remove exiting bars
        update.exit().remove();

        // update existing bars
        this.chart
            .selectAll('.bar')
            .transition()
            .attr('x', (d: any) => this.xScale(d.column))
            .attr('y', (d: any) => this.yScale(d.value))
            .attr('width', () => this.xScale.bandwidth())
            .attr('height', (d: any) => {
                console.log(this.yScale(d[1]));
                return this.height - this.yScale(d.value);
            })
            .style('fill', (_d: any, i: any) => this.colors(i));

        // add new bars
        update
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', (d: any) => this.xScale(d.column))
            .attr('y', (d: any) => this.yScale(d.column))
            .attr('width', this.xScale.bandwidth())
            .attr('height', 0)
            .style('fill', (_d: any, i: any) => this.colors(i))
            .attr('y', (d: any) => {
                return this.yScale(d.value);
            })
            .attr('height', (d: any) => {
                // console.log(this.height - this.yScale(d.value));
                return this.height - this.yScale(d.value);
            });
    }
}
