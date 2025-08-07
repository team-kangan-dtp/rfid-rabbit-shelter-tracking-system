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
  };
  animal_id: {
    id: string;
    name: string;
    species: string;
  };
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
      const nameA = `${userA.first_name} ${userA.last_name}`;
      const nameB = `${userB.first_name} ${userB.last_name}`;
      return nameA.localeCompare(nameB);
    },
    cell: ({ row }) => {
      const user = row.getValue("user_id") as RfidLog["user_id"];
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
      return animalA.name.localeCompare(animalB.name);
    },
    cell: ({ row }) => {
      const animal = row.getValue("animal_id") as RfidLog["animal_id"];
      return `${animal.name} (${animal.species})`;
    },
  },
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: true,
  },
];
