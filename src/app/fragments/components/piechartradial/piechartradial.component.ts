import {
    Component,
    OnInit,
    ElementRef,
    viewChild,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-piechartradial',
    templateUrl: './piechartradial.component.html',
    styleUrls: ['./piechartradial.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class PieChartRadialComponent implements OnInit {
    chartContainer = viewChild.required<ElementRef>('chart');

    @Input() public data: IData[] = [];
    @Output() pieClick: EventEmitter<string> = new EventEmitter();
    @Output() pieClickOutside: EventEmitter<Event> = new EventEmitter();

    private margin: any = { top: 10, bottom: 10, left: 10, right: 10 };
    private width: number;
    private height: number;

    constructor() {}

    ngOnInit() {
        this.createChart();
    }

    createChart() {
        // Clear any existing chart content to prevent duplicates
        const element = this.chartContainer().nativeElement;
        d3.select(element).selectAll('*').remove();

        // Calculate dimensions
        this.width = element.clientWidth - this.margin.left - this.margin.right;
        this.height = element.clientHeight - this.margin.top - this.margin.bottom;
        const radius = Math.min(this.width, this.height) / 2;
        const outerRadius = radius;
        const innerRadius = 0;

        // Define a color scale
        const color = d3
            .scaleOrdinal<string>()
            .domain(this.data.map((d) => d.column))
            .range(d3.quantize((t) => d3.interpolateSpectral(t * 0.8 + 0.1), this.data.length).reverse());

        // Create the pie layout
        const pie = d3
            .pie<IData>()
            .sort(null)
            .value((d) => d.value);

        // Create the arc generators
        const arc = d3.arc<d3.PieArcDatum<IData>>().innerRadius(innerRadius).outerRadius(outerRadius);

        const outerArc = d3
            .arc<d3.PieArcDatum<IData>>()
            .innerRadius(outerRadius * 1.05)
            .outerRadius(outerRadius * 1.05);

        const viewBoxSize = radius * 2.75; // Increased the viewBox size to provide more padding for labels
        const viewBoxX = -viewBoxSize / 2;
        const viewBoxY = -viewBoxSize / 2;
        let selectedPie: any;
        let selectedStroke: any;

        // Append the SVG to the container and set up the main group
        const svg = d3
            .select(element)
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', `${viewBoxX} ${viewBoxY} ${viewBoxSize} ${viewBoxSize}`)
            .attr('style', 'max-width: 100%; height: auto; font: 10px sans-serif;')
            .append('g')
            .attr('transform', `translate(${0}, ${0})`);

        // Generate the pie slices (paths)
        const arcs = pie(this.data);

        // Add the sectors
        svg.append('g')
            .selectAll('path')
            .data(arcs)
            .join('path')
            .attr('fill', (d) => color(d.data.column))
            .attr('d', (d) => arc(d) as string)
            .on('mouseover', function () {
                d3.select(this)
                    .style('cursor', 'pointer')
                    .transition()
                    .duration(150)
                    .style('opacity', '0.65');
            })
            .on('mouseout', function () {
                d3.select(this).style('cursor', 'default').transition().duration(150).style('opacity', '1');
            })
            .on('click', (event, d) => {
                // The 'this' in an arrow function refers to the component instance
                const currentTarget = d3.select(event.currentTarget as any);

                if (selectedPie && selectedPie.node() === currentTarget.node()) {
                    // If the same pie is clicked again, deselect it
                    selectedPie = null;
                    if (selectedStroke) {
                        selectedStroke.remove();
                        selectedStroke = null;
                    }
                    this.pieClick.emit(''); // Emit empty string on deselect
                    return;
                }

                // Remove the previously selected stroke, if one exists
                if (selectedStroke) {
                    selectedStroke.remove();
                    selectedStroke = null;
                }

                // Select the new pie
                selectedPie = currentTarget;

                // Create a new path for the stroke
                selectedStroke = svg
                    .append('path')
                    .attr('d', arc(d) as string)
                    .attr('fill', 'none')
                    .attr('stroke', '#2a6ada')
                    .attr('stroke-width', 4)
                    .attr('pointer-events', 'none'); // Prevents this stroke from interfering with clicks

                event.stopPropagation();
                this.pieClick.emit(d.data.userid);
            })
            .append('title')
            .text((d) => `${d.data.column}: ${d.data.value}`);

        // Add the polyline for the labels
        svg.append('g')
            .attr('fill', 'none')
            .attr('stroke', '#000')
            .attr('stroke-width', 1)
            .style('opacity', 0.6)
            .selectAll('polyline')
            .data(arcs)
            .join('polyline')
            .attr('points', (d) => {
                const posA = arc.centroid(d);
                const posB = outerArc.centroid(d);
                const posC = outerArc.centroid(d);
                const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                posC[0] = radius * 0.95 * (midAngle < Math.PI ? 1 : -1);
                return [posA, posB, posC] as any;
            });

        // Add the text labels outside the slices
        svg.append('g')
            .selectAll('text')
            .data(arcs)
            .join('text')
            .attr('text-anchor', (d) => {
                const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                return midAngle < Math.PI ? 'start' : 'end';
            })
            .attr('transform', (d) => {
                const pos = outerArc.centroid(d);
                const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                pos[0] = radius * 0.99 * (midAngle < Math.PI ? 1 : -1);
                return `translate(${pos})`;
            })
            .call((text) =>
                text
                    .append('tspan')
                    .attr('y', '-0.4em')
                    .attr('font-weight', 'bold')
                    .style('font-size', '1rem') // <-- Adjust font size here
                    .text((d) => d.data.column)
            )
            .call((text) =>
                text
                    .filter((d) => d.endAngle - d.startAngle > 0.25)
                    .append('tspan')
                    .attr('x', 0)
                    .attr('y', '0.7em')
                    .attr('fill-opacity', 0.7)
                    .style('font-size', '1rem') // <-- Adjust font size here
                    .text((d) => d.data.value.toLocaleString('en-US'))
            );

        // d3.select(element).on('click', () => {});
    }
}

interface IData {
    column: string;
    value: number;
    userid: string;
}
