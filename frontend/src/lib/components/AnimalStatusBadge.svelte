<script lang="ts">
  import type { AdoptionStatus } from "$lib/types";

  export let status: AdoptionStatus;

  // Status styling map for better maintainability
  const statusStyles: Record<AdoptionStatus, string> = {
    'Available': 'bg-green-100 text-green-800 border-green-200',
    'Adopted': 'bg-blue-100 text-blue-800 border-blue-200',
    'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Hold': 'bg-orange-100 text-orange-800 border-orange-200',
    'Medical Hold': 'bg-red-100 text-red-800 border-red-200',
    'Not Available': 'bg-gray-100 text-gray-800 border-gray-200'
  };

  $: badgeClass = statusStyles[status] || statusStyles['Not Available'];
</script>

<span 
  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border {badgeClass}"
  role="status" 
  aria-label="Adoption status: {status}"
>
  {status}
</span>