<script lang="ts">
  import type { PageData } from "./$types";
  import { columns } from "$lib/components/rfid-scan-table/rfid-scan-log-columns";
  import RfidScanLogDataTable from "$lib/components/rfid-scan-table/rfid-scan-log-data-table.svelte";
  import PageHeader from "$lib/components/page-header.svelte";

  // Get the data from the server
  export let data: PageData;
</script>

<div class="p-6 pb-0">
  <PageHeader
    title="Scan Logs"
    description="View all recent scan logs for your animals."
  />

  <RfidScanLogDataTable data={data.rfid_logs} {columns} />
</div>
