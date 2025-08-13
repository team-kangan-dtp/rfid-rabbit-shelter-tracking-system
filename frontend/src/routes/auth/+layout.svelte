<script>
  let { children } = $props();
</script>

<!-- Clean layout without sidebar - overrides the main layout -->
<div class="min-h-screen">
  {@render children()}
</div>
