<script lang="ts">
  import { navItems } from "$lib/config/navigation.js";
  import User from "@lucide/svelte/icons/user";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  // Map current pathname to determine active tab
  let activeTab = $derived.by(() => {
    const pathname = $page.url.pathname;

    // Check nav items first
    const navItem = navItems.find((item) => item.url === pathname);
    if (navItem) return navItem.title;

    // Check for private/user profile route
    if (pathname === "/private") return "User Info";

    // Default to Dashboard for root
    return "Dashboard";
  });

  // Handle tab navigation
  function handleTabClick(tabTitle: string) {
    const navItem = navItems.find((item) => item.title === tabTitle);
    if (navItem) {
      goto(navItem.url);
      return;
    }

    // Handle User Info tab
    if (tabTitle === "User Info") {
      goto("/private");
      return;
    }
  }

  // All tabs for consistent layout
  const allTabs = [
    ...navItems,
    { title: "User Info", url: "/private", icon: User },
  ];
</script>

<div class="w-full h-full bg-background border-t">
  <div class="flex w-full h-full">
    {#each allTabs as tab (tab.title)}
      {@const IconComponent = tab.icon}
      <button
        class="flex-1 flex flex-col items-center justify-center gap-1 p-2 h-full transition-colors duration-200 {activeTab ===
        tab.title
          ? 'bg-primary text-primary-foreground'
          : 'bg-transparent text-muted-foreground hover:text-foreground'}"
        onclick={() => handleTabClick(tab.title)}
        type="button"
      >
        <IconComponent class="h-6 w-6 shrink-0" />
        <span class="text-xs leading-tight text-center">
          {tab.title === "User Info" ? "Profile" : tab.title}
        </span>
      </button>
    {/each}
  </div>
</div>
