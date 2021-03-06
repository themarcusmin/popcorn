<script lang="ts">
  export let userid: string;

  import { countWatched } from '$api/watch';

  import * as d3 from 'd3';
  import { onMount } from 'svelte';

  import type { HeatMapDataType } from '$models/profile.interface';
  import { getPreviousMonths, hydrateWatchedData, tooltipMessage } from '$utils/heatmap';

  // Media content count
  let mediaConsumed = 0;

  // Labels of row and columns for heatmap
  const HEATMAP_MONTHS = 5;
  const months = getPreviousMonths(HEATMAP_MONTHS, new Date().getMonth());

  const days = ['26-31', '21-25', '16-20', '11-15', '6-10', '1-5'];

  // Credits to d3 heatmap template: https://www.d3-graph-gallery.com/graph/heatmap_tooltip.html
  onMount(() => {
    // set the dimensions and margins of the graph
    const margin = { top: 30, right: 20, bottom: 30, left: 40 },
      width = 390 - margin.left - margin.right,
      height = 390 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select('#my_dataviz')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .style('display', 'block')
      .style('margin', 'auto')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Build X scales and axis:
    const x = d3.scaleBand().range([0, width]).domain(months).padding(0.075);
    svg.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(x));

    // Build X scales and axis:
    const y = d3.scaleBand().range([height, 0]).domain(days).padding(0.075);
    svg.append('g').call(d3.axisLeft(y));

    // Build color scale
    const myColor = d3.scaleLinear().range(['#ffe0ba', 'darkorange']).domain([1, 5]);
    d3.json('/data/heatmap.json').then(async function (data: HeatMapDataType[]) {
      // GET request for watched data;
      const watchedData = await countWatched(userid);
      // Increment mediaConsumed based on retrieved Data
      for (const monthlyData of watchedData) {
        mediaConsumed += monthlyData.media_count;
      }
      // Remove unnecessary months from initial heatmap.json data
      data = data.filter((initialheatmapJSON) => months.includes(initialheatmapJSON.month));
      // Hydrate value on updated heatmap.json data
      data = hydrateWatchedData(watchedData, data);

      // create a tooltip
      const tooltip = d3
        .select('#my_dataviz')
        .append('div')
        .style('opacity', 0)
        .attr('class', 'tooltip')
        .style('background-color', 'inherit')
        .style('display', 'block')
        .style('margin', 'auto')
        .style('text-align', 'center')
        .style('color', 'white')
        .style('width', '50%')
        .style('border', 'solid')
        .style('border-width', '2px')
        .style('border-radius', '5px')
        .style('padding', '5px');

      // Three function that change the tooltip when user hover / move / leave a cell
      const mouseover = function (event: MouseEvent, d: HeatMapDataType) {
        // Do not show tooltip if media count is 0
        if (!d.value) return;
        tooltip.style('opacity', 1);
      };

      const mousemove = function (event: MouseEvent, d: HeatMapDataType) {
        // if (!d.value) return;
        tooltip
          .html(tooltipMessage(d))
          .style('left', event.x / 2 + 'px')
          .style('top', event.y / 2 + 'px');
      };
      const mouseleave = function (d: HeatMapDataType) {
        tooltip.style('opacity', 0);
      };

      // add the squares
      svg
        .selectAll()
        .data(data, function (d: HeatMapDataType) {
          return d.month + ':' + d.day;
        })
        .enter()
        .append('rect')
        .attr('x', function (d: HeatMapDataType) {
          return x(d.month);
        })
        .attr('y', function (d: HeatMapDataType) {
          return y(d.day);
        })
        .attr('width', x.bandwidth())
        .attr('height', y.bandwidth())
        .style('fill', function (d: HeatMapDataType) {
          return myColor(d.value);
        })
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseleave', mouseleave);
    });
  });
</script>

<h4>{`${mediaConsumed} contents consumed in the last six months`}</h4>
<div id="my_dataviz" />

<style>
  h4 {
    padding: 0 2em;
    margin-bottom: 0.25em;
  }
</style>
