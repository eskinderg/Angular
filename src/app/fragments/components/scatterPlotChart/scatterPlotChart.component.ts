import {
    Component,
    OnInit,
    ElementRef,
    ViewEncapsulation,
    viewChild,
    ChangeDetectionStrategy
} from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-scatterchart',
    templateUrl: './scatterPlotChart.component.html',
    styleUrls: ['./scatterPlotChart.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class ScatterPlotChartComponent implements OnInit {
    chartContainer = viewChild.required<ElementRef>('chart');

    margin = { top: 10, right: 100, bottom: 30, left: 30 };
    width = 460 - this.margin.left - this.margin.right;
    height = 400 - this.margin.top - this.margin.bottom;

    constructor() {}

    ngOnInit() {
        // if (!this.data) {
        //   this.data = this.generateSampleData();
        // }
        this.createChart();
        // this.updateChart();
    }

    generateSampleData() {
        const values: Array<any> = [];

        for (let i = 0; i < 8 + Math.floor(Math.random() * 10); i++) {
            values.push([`Index ${i}`, Math.floor(Math.random() * 100)]);
        }

        return values;
    }

    createChart() {
        const width = this.width;
        const height = this.height;

        const svg = d3
            .select('#my_dataviz')
            .append('svg')
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .append('g')
            .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
        d3.csv(
            'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_connectedscatter.csv'
        ).then(function (data) {
            // List of groups (here I have one group per column)
            const allGroup = ['valueA', 'valueB', 'valueC'];
            // Reformat the data: we need an array of arrays of {x, y} tuples
            const dataReady = allGroup.map(function (grpName) {
                // .map allows to do something for each element of the list
                return {
                    name: grpName,
                    values: data.map(function (d) {
                        return { time: d['time'], value: +d[grpName] };
                    })
                };
            });
            // I strongly advise to have a look to dataReady with
            // console.log(dataReady)

            // A color scale: one color for each group
            // const myColor = d3.scaleOrdinal().domain(allGroup).range(d3.schemeSet2);

            // Add X axis --> it is a date format
            const x = d3.scaleLinear().domain([0, 10]).range([0, width]);
            svg.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(x));

            // Add Y axis
            const y = d3.scaleLinear().domain([0, 20]).range([height, 0]);
            svg.append('g').call(d3.axisLeft(y));

            // const line = d3
            //     .line()
            //     .x((d) => x(+d['time']))
            //     .y((d) => y(+d['value']));
            // svg.selectAll('myLines')
            //     .data(dataReady)
            //     .join('path')
            //     // .attr('d', (d) => line(d.values))
            //     .attr('stroke', (d) => myColor(d.name))
            //     .style('stroke-width', 4)
            //     .style('fill', 'none');
            // // Add the points
            svg
                // First we need to enter in a group
                .selectAll('myDots')
                .data(dataReady)
                .join('g')
                // .style('fill', (d) => myColor(JSON.parse(d.name)))
                // Second we need to enter in the 'values' part of this group
                .selectAll('myPoints')
                .data((d) => d.values)
                .join('circle')
                .attr('cx', (d) => x(JSON.parse(d.time)))
                .attr('cy', (d) => y(d.value))
                .attr('r', 5)
                .attr('stroke', 'white');

            // Add a legend at the end of each line
            svg.selectAll('myLabels')
                .data(dataReady)
                .join('g')
                .append('text')
                .datum((d) => {
                    return { name: d.name, value: d.values[d.values.length - 1] };
                }) // keep only the last value of each time series
                .attr('transform', (d) => `translate(${x(JSON.parse(d.value.time))},${y(d.value.value)})`) // Put the text at the position of the last point
                .attr('x', 12) // shift the text a bit more right
                .text((d) => d.name)
                // .style('fill', (d) => myColor(JSON.parse(d.name)))
                .style('font-size', 15);
        });
    }

    // updateChart() {
    //     // update scales & axis
    //     this.xScale.domain(this.data.map((d) => d[0]));
    //     this.yScale.domain([0, d3.max(this.data, (d) => d[1])]);
    //     this.colors.domain([0, this.data.length]);
    //     this.xAxis.transition().call(d3.axisBottom(this.xScale));
    //     this.yAxis.transition().call(d3.axisLeft(this.yScale));

    //     const update = this.chart.selectAll('.bar').data(this.data);

    //     // remove exiting bars
    //     update.exit().remove();

    //     // update existing bars
    //     this.chart
    //         .selectAll('.bar')
    //         .transition()
    //         .attr('x', (d: any[]) => this.xScale(d[0]))
    //         .attr('y', (d: any[]) => this.yScale(d[1]))
    //         .attr('width', () => this.xScale.bandwidth())
    //         .attr('height', (d: any[]) => this.height - this.yScale(d[1]))
    //         .style('fill', (_d: any, i: any) => this.colors(i));

    //     // add new bars
    //     update
    //         .enter()
    //         .append('rect')
    //         .attr('class', 'bar')
    //         .attr('x', (d: any[]) => this.xScale(d[0]))
    //         .attr('y', () => this.yScale(0))
    //         .attr('width', this.xScale.bandwidth())
    //         .attr('height', 0)
    //         .style('fill', (_d: any, i: any) => this.colors(i))
    //         .transition()
    //         .delay((_d: any, i: number) => i * 10)
    //         .attr('y', (d: any[]) => this.yScale(d[1]))
    //         .attr('height', (d: any[]) => this.height - this.yScale(d[1]));
    // }
}
