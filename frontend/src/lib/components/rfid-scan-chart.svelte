<script lang="ts">
  import * as Chart from "$lib/components/ui/chart/index.js";
  import { scaleUtc } from "d3-scale";
  import { LineChart } from "layerchart";
  import type { RfidLog } from "../../ambient";

  let { rawChartData } = $props();

  function countScansPerDay(data: RfidLog[]) {
    const counts: Record<string, number> = {};

    for (const item of data) {
      if (!item.scanTime) continue;
      const d =
        item.scanTime instanceof Date ? item.scanTime : new Date(item.scanTime);
      if (isNaN(d.getTime())) continue;
      const dayKey = d.toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
      counts[dayKey] = (counts[dayKey] || 0) + 1;
    }

    // Convert to array with actual Date objects at local midnight for better scaling
    const result = Object.entries(counts).map(([dateStr, scans]) => {
      const date = new Date(dateStr + "T00:00:00Z");
      return { date, dateStr, scans };
    });

    // Sort chronologically
    result.sort((a, b) => a.date.getTime() - b.date.getTime());
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
  <Chart.Container config={chartConfig} class="w-full min-h-[250px]">
    <LineChart
      data={chartData}
      x="date"
      y="scans"
      xScale={scaleUtc()}
      axis="x"
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
    </LineChart>
  </Chart.Container>
{/if}

<style>
  /* Attempt to target the generated line path(s) */
  :global([data-slot="chart"] .lc-line-path),
  :global([data-slot="chart"] .lc-spline-path) {
    stroke-width: 3px;
    stroke-linejoin: round;
    stroke-linecap: round;
  }
</style>
