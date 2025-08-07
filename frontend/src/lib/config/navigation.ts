import HouseIcon from "@lucide/svelte/icons/house";
import Dog from "@lucide/svelte/icons/dog";
import scanText from "@lucide/svelte/icons/scan-text";
import User from "@lucide/svelte/icons/user";
import HeartPulse from "@lucide/svelte/icons/heart-pulse";
import FileHeart from "@lucide/svelte/icons/file-heart";
import Calendar from "@lucide/svelte/icons/calendar";

export const navItems = [
  { title: "Dashboard", url: "/", icon: HouseIcon },
  { title: "Animals", url: "/animals", icon: Dog },
  { title: "Scan logs", url: "/scan-logs", icon: scanText },
  // { title: "Health Checks", url: "/health_checks", icon: HeartPulse },
  // { title: "Adoptions", url: "/adoptions", icon: FileHeart },
  // { title: "Roster", url: "/roster", icon: Calendar },
];

export const devPlaygroundItems = [
  { title: "Auth", url: "/auth", icon: User },
  { title: "Realtime Testing", url: "/realtime_test", icon: scanText },
];

export const footerItems = [{ title: "User Profile", url: "/private" }];
