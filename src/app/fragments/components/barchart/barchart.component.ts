import {
    Component,
    OnInit,
    ElementRef,
    Input,
    viewChild,
    ChangeDetectionStrategy,
    OnChanges
} from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-barchart',
    templateUrl: './barchart.component.html',
    styleUrls: ['./barchart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class BarchartComponent implements OnInit, OnChanges {
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

    ngOnInit() {
        if (!this.data) {
            this.data = this.generateSampleData();
        }
        this.createChart(this.data);
        this.updateChart();
    }

    ngOnChanges() {
        if (this.chart) {
            this.updateChart();
        }
    }

    generateSampleData() {
        const values: Array<any> = [];

        for (let i = 0; i < 8 + Math.floor(Math.random() * 10); i++) {
            values.push({ column: `Column ${i + 1}`, value: Math.round(Math.random() * 100) });
        }

        return values;
    }

    createChart(data: Array<any>) {
        const element = this.chartContainer().nativeElement;
        this.width = element.offsetWidth - this.margin.left - this.margin.right;
        this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

        this.colors = d3
            .scaleOrdinal()
            .domain(data.map((d) => d.column))
            .range(d3.schemeCategory10); // Use a D3 color

        this.xScale = d3
            .scaleBand()
            .domain(data.map((d) => d.column))
            .range([this.margin.left, this.width - this.margin.right])
            .padding(0.1);

        // Declare the y (vertical position) scale.
        this.yScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.value)])
            .range([this.height - this.margin.bottom, this.margin.top]);

        // Create the SVG container.
        const svg = d3
            .select(element)
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('viewBox', [0, 0, this.width, this.height])
            .attr('style', 'max-width: 100%; height: 100%;');

        // Add a rect for each bar.
        this.chart = svg.append('g').attr('class', 'bars');

        // Add the x-axis and label.
        this.xAxis = svg
            .append('g')
            .attr('class', 'axis axis-x')
            .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
            .call(d3.axisBottom(this.xScale))
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
        this.yAxis = svg
            .append('g')
            .attr('class', 'axis axis-y')
            .attr('transform', `translate(${this.margin.left},0)`)
            .call(d3.axisLeft(this.yScale).tickFormat((y: any) => y))
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
            .attr('x', (d) => this.xScale(d.column) + this.xScale.bandwidth() / 2)
            .attr('y', (d) => this.yScale(d.value) - 5) // Adjust offset as needed
            .attr('text-anchor', 'middle')
            .text((d) => d.value);
    }

    updateChart() {
        // update scales & axis
        if (this.data) {
            this.xScale.domain(this.data.map((d) => d.column));
            this.yScale.domain([0, d3.max(this.data, (d) => d.value)]);
            this.colors.domain([0, this.data.length]);
            this.xAxis.transition().call(d3.axisBottom(this.xScale));
            this.yAxis.transition().call(d3.axisLeft(this.yScale));

            const update = this.chart.selectAll('.bar').data(this.data);

            // remove exiting bars
            update.exit().remove();

            // update existing bars
            update
                .transition()
                .duration(500) // Add a duration to the transition for smoother updates
                .attr('x', (d: any) => this.xScale(d.column))
                .attr('y', (d: any) => this.yScale(d.value))
                .attr('width', this.xScale.bandwidth())
                .attr('height', (d) => this.yScale(0) - this.yScale(d.value))
                .style('fill', (d: any) => this.colors(d.column));

            // add new bars
            update
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('x', (d: any) => this.xScale(d.column))
                .attr('y', this.yScale(0))
                .attr('width', this.xScale.bandwidth())
                .attr('height', 0)
                .style('fill', (d: any) => this.colors(d.column))
                .transition() // Animate from the initial state to the final state
                .duration(500) // Add a duration for the grow effect
                .delay((_d: any, i: number) => i * 50)
                .attr('y', (d) => this.yScale(d.value))
                .attr('height', (d) => this.yScale(0) - this.yScale(d.value));
        }
    }
}
