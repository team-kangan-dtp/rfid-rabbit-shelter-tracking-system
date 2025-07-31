<script lang="ts">
  import User from "@lucide/svelte/icons/user";
  import HouseIcon from "@lucide/svelte/icons/house";
  import InboxIcon from "@lucide/svelte/icons/inbox";
  import scanText from "@lucide/svelte/icons/scan-text";
  import SettingsIcon from "@lucide/svelte/icons/settings";
  import FileHeart from "@lucide/svelte/icons/file-heart";
  import LogOut from "@lucide/svelte/icons/log-out";
  import SunMoon from "@lucide/svelte/icons/sun-moon";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import * as Collapsible from "$lib/components/ui/collapsible/index.js";
  import ChevronUp from "@lucide/svelte/icons/chevron-up";
  import ChevronDown from "@lucide/svelte/icons/chevron-down";
  import ChevronLeft from "@lucide/svelte/icons/chevron-left";
  import Rabbit from "@lucide/svelte/icons/rabbit";
  import Dog from "@lucide/svelte/icons/dog";
  import HeartPulse from "@lucide/svelte/icons/heart-pulse";
  import Calendar from "@lucide/svelte/icons/calendar";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { supabase } from "$lib/supabaseClient";
  import { toggleMode } from "mode-watcher";

  let currentUserEmail = $derived($page.data?.user?.email || null);
  // svelte-ignore state_referenced_locally
  console.log(currentUserEmail);

  const navItems = [
    { title: "Dashboard", url: "/", icon: HouseIcon },
    { title: "Animals", url: "/animals", icon: Dog },
    { title: "Health Checks", url: "/health_checks", icon: HeartPulse },
    { title: "Adoptions", url: "/adoptions", icon: FileHeart },
    { title: "Roster", url: "/roster", icon: Calendar },
  ];

  const devPlaygroundItems = [
    { title: "Auth", url: "/auth", icon: User },
    { title: "Realtime Testing", url: "/realtime_test", icon: scanText },
  ];

  const footerItems = [{ title: "User Profile", url: " /private" }];

  async function handleSignOut() {
    try {
      await supabase.auth.signOut();
      goto("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }
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
                class="text-lg border border-sidebar-primary/25"
                size="lg"
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
    <Collapsible.Root closed class="group/collapsible">
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
      <!-- Light Dark Toggle -->
      <Sidebar.MenuItem>
        <Sidebar.MenuButton
          class="border border-sidebar-primary/20 cursor-pointer"
          onclick={toggleMode}
        >
          <SunMoon />
          <span>Toggle Theme</span>
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>

      <!-- User Information -->
      <Sidebar.MenuItem>
        <Sidebar.MenuButton
          class="border border-sidebar-primary/20 cursor-pointer"
        >
          <User />
          <span>User Information</span>
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>

      <!-- Admin Settings -->
      <Sidebar.MenuItem>
        <Sidebar.MenuButton
          class="border border-sidebar-primary/20 cursor-pointer"
        >
          <SettingsIcon />
          <span>Admin Settings</span>
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>

      <!-- Sign out -->
      <Sidebar.MenuItem>
        <Sidebar.MenuButton
          class="border border-sidebar-primary/20 cursor-pointer"
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
            <span class="truncate font-medium">User Name</span>
            <span class="text-muted-foreground truncate text-xs"> email </span>
          </div>
        </div>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Footer>
</Sidebar.Root>
