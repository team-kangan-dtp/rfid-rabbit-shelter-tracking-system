<script lang="ts">
  import { invalidate } from "$app/navigation";
  import { onMount, onDestroy } from "svelte";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import AppSidebar from "$lib/components/app-sidebar.svelte";
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";
  import { page } from "$app/state";
  // import app sidebar from componenents/app-sidebar to display
  import MobileBottomTabs from "$lib/components/mobile-bottom-tabs.svelte";
  import { navItems } from "$lib/config/navigation.js";

  type LogEvent = {
    [key: string]: any;
  };

  // Check if we're on an auth route - using $derived instead of $:
  let isAuthRoute = $derived(page.url.pathname.startsWith("/auth"));

  let logEvents = $state<LogEvent[]>([]);
  let connectionStatus = $state("Disconnected");
  let channel: any;
  let currentUserId = $derived(page.data.user?.id || null);
  let dialogOpen = $state(false);
  let currentScanData = $state<LogEvent | null>(null);
  let animalDetails = $state<any>(null);

  let { data, children } = $props();
  let { session, supabase } = $derived(data);

  // Breadcrumb logic based on actual navigation
  let breadcrumbs = $derived.by(() => {
    const pathname = page.url.pathname;

    // Always start with Dashboard
    const crumbs: Array<{
      title: string;
      href: string;
      isCurrentPage: boolean;
    }> = [{ title: "Dashboard", href: "/", isCurrentPage: pathname === "/" }];

    // Add sub-pages if not on Dashboard
    if (pathname === "/animals") {
      crumbs.push({ title: "Animals", href: "/animals", isCurrentPage: true });
    } else if (pathname === "/scan-logs") {
      crumbs.push({
        title: "Scan logs",
        href: "/scan-logs",
        isCurrentPage: true,
      });
    } else if (pathname === "/private") {
      crumbs.push({
        title: "User Profile",
        href: "/private",
        isCurrentPage: true,
      });
    }

    return crumbs;
  });
  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
    });

    console.log("Setting up realtime channel...");
    console.log("Current user ID:", currentUserId);

    channel = supabase
      .channel("log-test")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "rfid_log",
          // filter: `user_id=eq.${currentUserId}`,
        },
        async (payload) => {
          console.log("New log entry:", payload);
          console.log("Payload structure:", JSON.stringify(payload, null, 2));
          logEvents = [payload.new, ...logEvents];
          currentScanData = payload.new;

          // Fetch animal details if animal_id exists
          if (payload.new.animal_id) {
            console.log("Animal ID found:", payload.new.animal_id);
            console.log("Fetching animal details...");

            // Check authentication status
            console.log("Session from server:", session);
            console.log("User from server:", data.user);
            console.log("User authenticated:", !!session);

            const {
              data: { user },
            } = await supabase.auth.getUser();
            console.log("Current user from getUser():", user);
            console.log("User authenticated via getUser():", !!user);

            // Check if user is authenticated before querying
            if (!session && !user) {
              console.log(
                "User not authenticated - cannot fetch animal details"
              );
              animalDetails = {
                name: "Authentication Required",
                error: "Please log in to view animal details",
              };
            } else {
              // Try to fetch animal details
              const { data: animal, error } = await supabase
                .from("animal")
                .select("*")
                .eq("id", payload.new.animal_id)
                .single();

              console.log("Supabase response - data:", animal);
              console.log("Supabase response - error:", error);

              if (animal && !error) {
                animalDetails = animal;
                console.log("Animal details set:", animal);
                console.log(
                  "animalDetails state after setting:",
                  animalDetails
                );
                console.log("Dialog should show animal data for:", animal.name);
              } else {
                console.error("Error fetching animal details:", error);
                animalDetails = null;
                console.log("animalDetails set to null due to error");
              }
            }
          } else {
            console.log("No animal_id in payload, this is likely a user scan");
            animalDetails = null;
          }

          dialogOpen = true;
        }
      )
      .subscribe((status) => {
        console.log("Subscription status:", status);
        if (status === "SUBSCRIBED") {
          connectionStatus = "Connected";
        } else if (status === "CLOSED") {
          connectionStatus = "Disconnected";
        } else {
          connectionStatus = `Status: ${status}`;
        }
      });

    return () => {
      data.subscription.unsubscribe();
    };
  });

  onDestroy(() => {
    if (channel) {
      channel.unsubscribe();
    }
  });
</script>

<ModeWatcher />

{#if isAuthRoute}
  <!-- Clean layout for auth pages - no sidebar -->
  {@render children()}
{:else}
  <div class="flex flex-col min-h-screen">
    <Sidebar.Provider>
      <AppSidebar />
      <Sidebar.Inset class="flex flex-col flex-1">
        <header class="flex h-16 shrink-0 items-center gap-2 px-4">
          <Sidebar.Trigger class="-ml-1 hidden md:block" />
          <Breadcrumb.Root>
            <Breadcrumb.List>
              {#each breadcrumbs as crumb, index (crumb.href)}
                <Breadcrumb.Item>
                  {#if crumb.isCurrentPage}
                    <Breadcrumb.Page class="font-semibold"
                      >{crumb.title}</Breadcrumb.Page
                    >
                  {:else}
                    <Breadcrumb.Link href={crumb.href} class="font-medium"
                      >{crumb.title}</Breadcrumb.Link
                    >
                  {/if}
                </Breadcrumb.Item>
                {#if index < breadcrumbs.length - 1}
                  <Breadcrumb.Separator />
                {/if}
              {/each}
            </Breadcrumb.List>
          </Breadcrumb.Root>
        </header>
        <div class="flex flex-1 flex-col gap-4 p-4 pt-0 pb-20 md:pb-4">
          {@render children?.()}
        </div>

        <!-- Mobile Bottom Tabs - moved inside Sidebar.Inset -->
        <div
          class="fixed bottom-0 left-0 right-0 p-4 bg-background border-t md:hidden z-50"
        >
          <MobileBottomTabs />
        </div>
      </Sidebar.Inset>
    </Sidebar.Provider>
  </div>

  <Dialog.Root bind:open={dialogOpen}>
    <Dialog.Content class="max-w-md">
      <Dialog.Header>
        <Dialog.Title>RFID Scan Detected</Dialog.Title>
        <Dialog.Description>
          {#if animalDetails}
            Animal scan detected for {animalDetails.name}
          {:else}
            A new RFID scan has been detected in the system.
          {/if}
        </Dialog.Description>
      </Dialog.Header>

      <!-- Debug info -->
      <div class="text-xs text-gray-500 p-2 bg-gray-100 rounded">
        <p>Debug: animalDetails = {JSON.stringify(animalDetails)}</p>
        <p>Debug: animalDetails exists = {!!animalDetails}</p>
        <p>Debug: currentScanData = {JSON.stringify(currentScanData)}</p>
      </div>

      {#if animalDetails}
        <div class="grid gap-3 py-4">
          <div class="grid grid-cols-3 items-center gap-4">
            <span class="font-medium">Name:</span>
            <span class="col-span-2">{animalDetails.name}</span>
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <span class="font-medium">Species:</span>
            <span class="col-span-2">{animalDetails.species}</span>
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <span class="font-medium">Breed:</span>
            <span class="col-span-2">{animalDetails.breed || "N/A"}</span>
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <span class="font-medium">Fur Colour:</span>
            <span class="col-span-2">{animalDetails.fur_colour || "N/A"}</span>
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <span class="font-medium">Weight:</span>
            <span class="col-span-2"
              >{animalDetails.weight_kg
                ? `${animalDetails.weight_kg} kg`
                : "N/A"}</span
            >
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <span class="font-medium">Date of Birth:</span>
            <span class="col-span-2"
              >{animalDetails.date_of_birth
                ? new Date(animalDetails.date_of_birth).toLocaleDateString()
                : "N/A"}</span
            >
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <span class="font-medium">Arrival Date:</span>
            <span class="col-span-2"
              >{new Date(animalDetails.arrival_date).toLocaleDateString()}</span
            >
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <span class="font-medium">Status:</span>
            <span class="col-span-2">{animalDetails.adoption_status}</span>
          </div>
          {#if animalDetails.special_needs}
            <div class="grid grid-cols-3 items-center gap-4">
              <span class="font-medium">Special Needs:</span>
              <span class="col-span-2">{animalDetails.special_needs}</span>
            </div>
          {/if}
        </div>
      {:else if currentScanData}
        <div class="grid gap-3 py-4">
          <div class="grid grid-cols-3 items-center gap-4">
            <span class="font-medium">Scan Time:</span>
            <span class="col-span-2"
              >{new Date(currentScanData.scan_time).toLocaleString()}</span
            >
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <span class="font-medium">User Scan:</span>
            <span class="col-span-2"
              >{currentScanData.user_id ? "Yes" : "No"}</span
            >
          </div>
        </div>
      {/if}

      <Dialog.Footer>
        <Dialog.Close>Close</Dialog.Close>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
{/if}
