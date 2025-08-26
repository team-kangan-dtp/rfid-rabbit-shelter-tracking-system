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
  import RFIDScanModal from "$lib/components/RFIDScanModal.svelte";

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
  let rfidTag: string | null = $state(null);

  // Function to close the modal and reset state
  function closeModal() {
    dialogOpen = false;
    // Reset the modal state after a brief delay to allow for smooth closing animation
    setTimeout(() => {
      currentScanData = null;
      animalDetails = null;
      rfidTag = null;
    }, 150);
  }

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
          filter: `user_id=eq.${currentUserId}`,
        },
        async (payload) => {
          console.log("New log entry:", payload);
          console.log("Payload structure:", JSON.stringify(payload, null, 2));
          logEvents = [payload.new, ...logEvents];

          // Reset modal state first to ensure fresh data
          currentScanData = null;
          animalDetails = null;
          rfidTag = null;

          // Set new scan data
          currentScanData = payload.new;

          // Fetch animal details if animal_id exists
          if (payload.new.animal_id) {
            console.log("Animal ID found:", payload.new.animal_id);
            console.log("Fetching animal details...");

            // Check authentication status
            console.log("Session from server:", session);
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

                dialogOpen = true;
              } else {
                console.error("Error fetching animal details:", error);
                animalDetails = null;
                console.log("animalDetails set to null due to error");
              }
            }
          } else {
            console.log(
              "No animal_id in payload, offer to assign this rfid tag to animal"
            );
            // Try to fetch animal details
            try {
              const { data: animals, error } = await supabase
                .from("animal")
                .select("*");

              console.log("Supabase response - data:", animals);

              animalDetails = animals;
              rfidTag = payload.new.rfid_tag || null;
            } catch (error) {
              console.error("Error fetching animal details:", error);
              animalDetails = null;
            }

            dialogOpen = true;
          }
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

  <RFIDScanModal
    userID={currentUserId}
    animalData={animalDetails}
    {rfidTag}
    scanData={currentScanData}
    {dialogOpen}
    onClose={closeModal}
  />
{/if}
