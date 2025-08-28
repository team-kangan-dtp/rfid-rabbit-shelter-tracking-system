import type { ColumnDef } from "@tanstack/table-core";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type RfidLog = {
  id: string;
  scan_time: string;
  user_id: {
    id: string;
    first_name: string;
    last_name: string;
  } | null;
  animal_id: {
    id: string;
    name: string;
    species: string;
  } | null;
  animal_note?: {
    id: string;
    note_type: string;
  } | null; // Optional field for animal notes
};

export const columns: ColumnDef<RfidLog>[] = [
  {
    accessorKey: "scan_time",
    header: "Scan Time",
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => {
      const dateA = new Date(rowA.getValue(columnId));
      const dateB = new Date(rowB.getValue(columnId));
      return dateA.getTime() - dateB.getTime();
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("scan_time"));
      return date.toLocaleString(undefined, {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });
    },
  },
  {
    accessorKey: "user_id",
    header: "User",
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => {
      const userA = rowA.getValue(columnId) as RfidLog["user_id"];
      const userB = rowB.getValue(columnId) as RfidLog["user_id"];
      if (!userA && !userB) return 0;
      if (!userA) return 1;
      if (!userB) return -1;
      const nameA = `${userA.first_name} ${userA.last_name}`;
      const nameB = `${userB.first_name} ${userB.last_name}`;
      return nameA.localeCompare(nameB);
    },
    cell: ({ row }) => {
      const user = row.getValue("user_id") as RfidLog["user_id"];
      if (!user) return "Unknown User";
      return `${user.first_name} ${user.last_name}`;
    },
  },
  {
    accessorKey: "animal_id",
    header: "Animal",
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => {
      const animalA = rowA.getValue(columnId) as RfidLog["animal_id"];
      const animalB = rowB.getValue(columnId) as RfidLog["animal_id"];
      if (!animalA && !animalB) return 0;
      if (!animalA) return 1;
      if (!animalB) return -1;
      return animalA.name.localeCompare(animalB.name);
    },
    cell: ({ row }) => {
      const animal = row.getValue("animal_id") as RfidLog["animal_id"];
      if (!animal) return "Unknown Animal";
      return `${animal.name} (${animal.species})`;
    },
  },
  {
    accessorKey: "animal_note",
    header: "Interaction Type",
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => {
      const noteA = rowA.getValue(columnId) as RfidLog["animal_note"];
      const noteB = rowB.getValue(columnId) as RfidLog["animal_note"];
      if (!noteA && !noteB) return 0;
      if (!noteA) return 1;
      if (!noteB) return -1;
      return noteA.note_type.localeCompare(noteB.note_type);
    },
    cell: ({ row }) => {
      const note = row.getValue("animal_note") as RfidLog["animal_note"];
      return note?.note_type || "N/A";
    },
  },
];
