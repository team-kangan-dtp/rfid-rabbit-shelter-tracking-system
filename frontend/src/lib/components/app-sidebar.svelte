<script lang="ts">
  import User from "@lucide/svelte/icons/user";
  import HouseIcon from "@lucide/svelte/icons/house";
  import InboxIcon from "@lucide/svelte/icons/inbox";
  import scanText from "@lucide/svelte/icons/scan-text";
  import SettingsIcon from "@lucide/svelte/icons/settings";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import ChevronUp from "@lucide/svelte/icons/chevron-up";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { supabase } from "$lib/supabaseClient";

  let currentUserEmail = $derived($page.data?.user?.email || null);
  // svelte-ignore state_referenced_locally
  console.log(currentUserEmail);

  const items = [
    { title: "Auth", url: "/auth", icon: User },
    { title: "Home", url: "/", icon: HouseIcon },
    { title: "Animals", url: "/animals", icon: InboxIcon },
    { title: "Realtime Testing", url: "/realtime_test", icon: scanText },
  ];

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
  <Sidebar.Content>
    <Sidebar.Group>
      <Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each items as item (item.title)}
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
      </Sidebar.GroupContent>
    </Sidebar.Group>
  </Sidebar.Content>
  <Sidebar.Footer>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            {#snippet child({ props })}
              <Sidebar.MenuButton
                {...props}
                class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                {currentUserEmail}
                <ChevronUp class="ml-auto" />
              </Sidebar.MenuButton>
            {/snippet}
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            side="top"
            class="w-(--bits-dropdown-menu-anchor-width)"
          >
            <DropdownMenu.Item>
              <span>Account</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <span>Billing</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <button
                type="button"
                onclick={handleSignOut}
                class="w-full text-left"
              >
                Sign out
              </button>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Footer>
</Sidebar.Root>
