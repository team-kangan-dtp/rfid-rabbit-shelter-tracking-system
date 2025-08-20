<script lang="ts">
  import type { PageData } from "./$types";
  import { columns } from "$lib/components/rfid-scan-table/rfid-scan-log-columns";
  import RfidScanLogDataTable from "$lib/components/rfid-scan-table/rfid-scan-log-data-table.svelte";

  // Get the data from the server
  export let data: PageData;
</script>

<!-- Scan logs heading -->
<div class="p-6 pb-0">
  <div class="mb-5 flex items-center justify-between">
    <div class="space-y-1">
      <h1
        class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
      >
        Scan Logs
      </h1>
      <p class="text-xl text-muted-foreground">
        View all recent scan logs for your animals
      </p>
    </div>
  </div>

  <RfidScanLogDataTable data={data.rfid_logs} {columns} />
</div>
