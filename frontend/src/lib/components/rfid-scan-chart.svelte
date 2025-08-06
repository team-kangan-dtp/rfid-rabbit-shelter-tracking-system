<script lang="ts">
  import * as Chart from "$lib/components/ui/chart/index.js";
  import { scaleBand } from "d3-scale";
  import { BarChart, Tooltip } from "layerchart";
  import type { RfidLog } from "../../ambient";

  let { rawChartData } = $props();

  function countScansPerDay(data: RfidLog[]) {
    const counts: Record<string, number> = {};

    data.forEach((item) => {
      if (!item.scanTime) return; // Skip items without scanTime

      let day: string;
      if (item.scanTime instanceof Date) {
        day = item.scanTime.toISOString().slice(0, 10); // 'YYYY-MM-DD'
      } else {
        // Handle string dates
        const dateObj = new Date(item.scanTime);
        day = dateObj.toISOString().slice(0, 10);
      }
      counts[day] = (counts[day] || 0) + 1;
    });

    const result = Object.entries(counts).map(([date, scans]) => ({
      date,
      scans,
    }));

    console.log("Processed chart data:", result);
    return result;
  }

  // Process the raw chart data to count scans per day
  const chartData = countScansPerDay(rawChartData);

  // Define the chart configuration
  const chartConfig = {
    scans: {
      label: "Scans",
      color: "#2563eb",
    },
  } satisfies Chart.ChartConfig;
</script>

{#if chartData.length === 0}
  <p class="text-sm text-muted-foreground">No scan data available</p>
{:else}
  <Chart.Container config={chartConfig} class="min-h-[200px] w-full">
    <BarChart
      data={chartData}
      xScale={scaleBand().padding(0.1)}
      x="date"
      axis="x"
      seriesLayout="group"
      series={[
        {
          key: "scans",
          label: chartConfig.scans.label,
          color: chartConfig.scans.color,
        },
      ]}
    >
      {#snippet tooltip()}
        <Chart.Tooltip />
      {/snippet}
    </BarChart>
  </Chart.Container>
{/if}
