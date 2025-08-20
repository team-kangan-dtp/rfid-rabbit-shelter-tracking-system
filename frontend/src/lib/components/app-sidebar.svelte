<script lang="ts">
  import User from "@lucide/svelte/icons/user";
  import InboxIcon from "@lucide/svelte/icons/inbox";
  import SettingsIcon from "@lucide/svelte/icons/settings";
  import LogOut from "@lucide/svelte/icons/log-out";
  import SunMoon from "@lucide/svelte/icons/sun-moon";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import * as Collapsible from "$lib/components/ui/collapsible/index.js";
  import ChevronUp from "@lucide/svelte/icons/chevron-up";
  import ChevronDown from "@lucide/svelte/icons/chevron-down";
  import ChevronLeft from "@lucide/svelte/icons/chevron-left";
  import Rabbit from "@lucide/svelte/icons/rabbit";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  // OLD: Wrong supabase client - this is the custom client with persistSession: false
  // import { supabase } from "$lib/supabaseClient";
  import { toggleMode } from "mode-watcher";
  import { navItems, devPlaygroundItems } from "$lib/config/navigation.js";

  let currentUserEmail = $derived($page.data?.user?.email || null);
  let currentUserName = $derived(
    `${$page.data?.userProfile?.first_name || ""} ${$page.data?.userProfile?.last_name || ""}`.trim() ||
      null
  );

  // NEW: Get proper server supabase client from page data (same as private layout)
  let { supabase } = $derived($page.data);

  // Determine which page is currently active (similar to mobile-bottom-tabs)
  let currentActiveItem = $derived.by(() => {
    const pathname = $page.url.pathname;

    // Check nav items first
    const navItem = navItems.find((item) => item.url === pathname);
    if (navItem) return navItem.title;

    // Check for private/user profile route
    if (pathname === "/private") return "User Profile";

    // Default to Dashboard for root
    return "Dashboard";
  });

  // OLD: handleSignOut function using wrong supabase client and fetch approach
  // async function handleSignOut() {
  //   try {
  //     await supabase.auth.signOut();
  //     goto("/auth");
  //   } catch (error) {
  //     console.error("Error signing out:", error);
  //   }
  // }

  // NEW: handleSignOut function matching private layout pattern
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    } else {
      goto("/auth");
    }
  };
</script>

<Sidebar.Root>
  <Sidebar.Header>
    <div class="flex items-center gap-2">
      <div
        class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-lg"
      >
        <Rabbit class="size-6" />
      </div>
      <div class="flex flex-col leading-none justify-center">
        <span class="text-lg">Shelter Sync</span>
        <span class="">v1.0</span>
      </div>
    </div>
  </Sidebar.Header>
  <Sidebar.Content>
    <Sidebar.Group>
      <Sidebar.GroupContent>
        <Sidebar.Menu class="space-y-2">
          {#each navItems as item (item.title)}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton
                class="text-lg border border-sidebar-primary/25 {currentActiveItem ===
                item.title
                  ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
                  : ''}"
                size="m"
              >
                {#snippet child({ props })}
                  <a href={item.url} {...props}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                {/snippet}
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          {/each}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
    <Collapsible.Root open={false} class="group/collapsible">
      <Sidebar.Group>
        <Sidebar.GroupLabel>
          {#snippet child({ props })}
            <Collapsible.Trigger {...props}>
              Dev Playground
              <ChevronLeft
                class="ml-auto transition-transform group-data-[state=open]/collapsible:-rotate-90"
              />
            </Collapsible.Trigger>
          {/snippet}
        </Sidebar.GroupLabel>
        <Collapsible.Content>
          <Sidebar.Menu>
            {#each devPlaygroundItems as item (item.title)}
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                  {#snippet child({ props })}
                    <a href={item.url} {...props}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  {/snippet}
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            {/each}
          </Sidebar.Menu>
        </Collapsible.Content>
      </Sidebar.Group>
    </Collapsible.Root>
  </Sidebar.Content>
  <Sidebar.Footer>
    <Sidebar.Menu class="space-y-2">
      <!-- User Information -->
      <Sidebar.MenuItem>
        <Sidebar.MenuButton
          class="border border-sidebar-primary/20 cursor-pointer {currentActiveItem ===
          'User Profile'
            ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
            : ''}"
          onclick={() => goto("/private")}
        >
          <User />
          <span>User Profile</span>
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>

      <!-- Admin Settings -->
      <!-- <Sidebar.MenuItem>
        <Sidebar.MenuButton
          class="border border-sidebar-primary/20 cursor-pointer"
        >
          <SettingsIcon />
          <span>Admin Settings</span>
        </Sidebar.MenuButton>
      </Sidebar.MenuItem> -->

      <!-- Sign out -->
      <Sidebar.MenuItem>
        <Sidebar.MenuButton
          class="border border-sidebar-primary/20 cursor-pointer"
          onclick={handleSignOut}
        >
          <LogOut />
          <span>Sign out</span>
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>

      <!-- User Info Display at Bottom -->
      <Sidebar.MenuItem>
        <div class="flex items-center gap-2">
          <div
            class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-9 items-center justify-center rounded-lg"
          >
            <User class="size-6" />
          </div>
          <div class="grid flex-1 text-left text-sm leading-tight">
            <span class="truncate font-medium"
              >{currentUserName || "Hello?"}</span
            >
            <span class="text-muted-foreground truncate text-xs"
              >{currentUserEmail || "No user logged in"}</span
            >
          </div>
        </div>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Footer>
</Sidebar.Root>
