import type { ColumnDef } from "@tanstack/table-core";
import type { Animal } from "$lib/types";
import AnimalStatusBadge from "$lib/components/AnimalStatusBadge.svelte";
import { Button } from "$lib/components/ui/button/index.js";

export type AnimalTableData = Animal & {
  actions?: {
    onView?: (animal: Animal) => void;
    onEdit?: (animal: Animal) => void;
    onDelete?: (animal: Animal) => void;
  };
};

export const columns: ColumnDef<AnimalTableData>[] = [
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
    cell: ({ row }) => {
      return row.getValue("name");
    },
  },
  {
    accessorKey: "species", 
    header: "Species",
    enableSorting: true,
    cell: ({ row }) => {
      return row.getValue("species");
    },
  },
  {
    accessorKey: "breed",
    header: "Breed",
    enableSorting: true,
    cell: ({ row }) => {
      const breed = row.getValue("breed") as string | undefined;
      return breed || "N/A";
    },
  },
  {
    accessorKey: "adoption_status",
    header: "Status",
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => {
      const statusA = rowA.getValue(columnId) as string;
      const statusB = rowB.getValue(columnId) as string;
      return statusA.localeCompare(statusB);
    },
    cell: ({ row }) => {
      const status = row.getValue("adoption_status") as string;
      return `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(status)}">${status}</span>`;
    },
  },
  {
    accessorKey: "arrival_date",
    header: "Arrival Date",
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => {
      const dateA = new Date(rowA.getValue(columnId));
      const dateB = new Date(rowB.getValue(columnId));
      return dateA.getTime() - dateB.getTime();
    },
    cell: ({ row }) => {
      const date = row.getValue("arrival_date") as string;
      return new Date(date).toLocaleDateString();
    },
  },
  {
    accessorKey: "neutered",
    header: "Neutered",
    enableSorting: true,
    cell: ({ row }) => {
      const neutered = row.getValue("neutered") as boolean;
      return neutered ? "Yes" : "No";
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    cell: ({ row }) => {
      const animal = row.original;
      return `
        <div class="flex items-center gap-2">
          <button class="px-3 py-1.5 text-xs font-medium bg-secondary hover:bg-secondary/80 rounded-md transition-colors" onclick="window.handleAnimalView('${animal.id}')">View</button>
          <button class="px-3 py-1.5 text-xs font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors" onclick="window.handleAnimalEdit('${animal.id}')">Edit</button>
          <button class="px-3 py-1.5 text-xs font-medium bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-md transition-colors" onclick="window.handleAnimalDelete('${animal.id}')">Delete</button>
        </div>
      `;
    },
  },
];

// Helper function for status badge classes
function getStatusClasses(status: string): string {
  switch (status) {
    case "Available":
      return "bg-green-100 text-green-800";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "Adopted":
      return "bg-blue-100 text-blue-800";
    case "Hold":
      return "bg-orange-100 text-orange-800";
    case "Medical Hold":
      return "bg-red-100 text-red-800";
    case "Not Available":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}