import { Component, OnInit, OnChanges, ElementRef, Input, ViewEncapsulation, viewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-barchart',
    templateUrl: './barchart.component.html',
    styleUrls: ['./barchart.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BarchartComponent implements OnInit, OnChanges {
    chartContainer = viewChild.required<ElementRef>('chart');

    @Input() private data: Array<any> = this.generateSampleData();

    private margin: any = { top: 20, bottom: 20, left: 20, right: 20 };
    private chart: any;
    private width: number;
    private height: number;
    private xScale: any;
    private yScale: any;
    private colors: any;
    private xAxis: any;
    private yAxis: any;

    constructor() {}

    ngOnInit() {
        // if (!this.data) {
        //   this.data = this.generateSampleData();
        // }
        this.createChart();
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
            values.push([`Index ${i}`, Math.floor(Math.random() * 100)]);
        }

        return values;
    }

    createChart() {
        const element = this.chartContainer().nativeElement;
        this.width = element.offsetWidth - this.margin.left - this.margin.right;
        this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
        const svg = d3
            .select(element)
            .append('svg')
            .attr('width', element.offsetWidth)
            .attr('height', element.offsetHeight);

        // chart plot area
        this.chart = svg
            .append('g')
            .attr('class', 'bars')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

        // define X & Y domains
        const xDomain = this.data.map((d) => d[0]);
        const yDomain = [0, d3.max(this.data, (d) => d[1])];

        // create scales
        this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
        this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);

        // bar colors
        this.colors = d3
            .scaleLinear()
            .domain([0, this.data.length])
            .range(<any[]>['green', 'yellow']);

        // x & y axis
        this.xAxis = svg
            .append('g')
            .attr('class', 'axis axis-x')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
            .call(d3.axisBottom(this.xScale));
        this.yAxis = svg
            .append('g')
            .attr('class', 'axis axis-y')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
            .call(d3.axisLeft(this.yScale));
    }

    updateChart() {
        // update scales & axis
        this.xScale.domain(this.data.map((d) => d[0]));
        this.yScale.domain([0, d3.max(this.data, (d) => d[1])]);
        this.colors.domain([0, this.data.length]);
        this.xAxis.transition().call(d3.axisBottom(this.xScale));
        this.yAxis.transition().call(d3.axisLeft(this.yScale));

        const update = this.chart.selectAll('.bar').data(this.data);

        // remove exiting bars
        update.exit().remove();

        // update existing bars
        this.chart
            .selectAll('.bar')
            .transition()
            .attr('x', (d: any[]) => this.xScale(d[0]))
            .attr('y', (d: any[]) => this.yScale(d[1]))
            .attr('width', () => this.xScale.bandwidth())
            .attr('height', (d: any[]) => this.height - this.yScale(d[1]))
            .style('fill', (_d: any, i: any) => this.colors(i));

        // add new bars
        update
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', (d: any[]) => this.xScale(d[0]))
            .attr('y', () => this.yScale(0))
            .attr('width', this.xScale.bandwidth())
            .attr('height', 0)
            .style('fill', (_d: any, i: any) => this.colors(i))
            .transition()
            .delay((_d: any, i: number) => i * 10)
            .attr('y', (d: any[]) => this.yScale(d[1]))
            .attr('height', (d: any[]) => this.height - this.yScale(d[1]));
    }
}
