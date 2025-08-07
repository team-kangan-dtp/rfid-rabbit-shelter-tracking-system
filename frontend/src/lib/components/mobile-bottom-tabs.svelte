<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import { navItems } from "$lib/config/navigation.js";
  import User from "@lucide/svelte/icons/user";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  // Map current pathname to tab value
  let currentTab = $derived.by(() => {
    const pathname = $page.url.pathname;
    
    // Check nav items first
    const navItem = navItems.find(item => item.url === pathname);
    if (navItem) return navItem.title;
    
    // Check for private/user profile route
    if (pathname === "/private") return "User Info";
    
    // Default to Dashboard for root
    return "Dashboard";
  });

  // Handle tab navigation
  function handleTabChange(value: string) {
    const navItem = navItems.find(item => item.title === value);
    if (navItem) {
      goto(navItem.url);
      return;
    }
    
    // Handle User Info tab
    if (value === "User Info") {
      goto("/private");
      return;
    }
  }
</script>

<div class="flex w-full h-full flex-col">
  <Tabs.Root value={currentTab} onValueChange={handleTabChange} class="w-full h-full">
    <Tabs.List class="w-full h-full border-0 bg-transparent p-0 rounded-none">
      {#each navItems as navItem (navItem.title)}
        <Tabs.Trigger
          value={navItem.title}
          class="flex flex-col items-center gap-1 border-0 bg-transparent data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
        >
          <svelte:component this={navItem.icon} class="!h-7 !w-7" />
          <span class="text-xs">{navItem.title}</span>
        </Tabs.Trigger>
      {/each}
      <Tabs.Trigger
        value="User Info"
        class="flex flex-col items-center gap-1 border-0 bg-transparent data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
      >
        <svelte:component this={User} class="!h-7 !w-7" />
        <span class="text-xs">User Profile</span>
      </Tabs.Trigger>
    </Tabs.List>
  </Tabs.Root>
</div>
