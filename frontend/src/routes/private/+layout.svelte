<script>
  import { goto } from "$app/navigation";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Card } from "$lib/components/ui/card/index.js";

  let { data, children } = $props();
  let { supabase } = $derived(data);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    } else {
      goto("/auth");
    }
  };
</script>

<header>
  <Button>
    <a href="/">Home</a>
  </Button>
  <Button class="cursor-pointer" onclick={logout}>Logout</Button>
</header>
<main>
  {@render children()}
</main>
