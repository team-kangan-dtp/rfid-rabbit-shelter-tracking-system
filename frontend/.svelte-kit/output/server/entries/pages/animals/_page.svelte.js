import { _ as attr_class, b as attr, e as escape_html, s as stringify, h as bind_props, a as push, j as ensure_array_like, p as pop, $ as fallback, x as copy_payload, y as assign_payload } from "../../../chunks/index2.js";
import { getFacetedUniqueValues, getFacetedRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel, getCoreRowModel } from "@tanstack/table-core";
import { c as createSvelteTable, T as Table, a as Table_header, b as Table_row, d as Table_head, F as Flex_render, e as Table_body, f as Table_cell } from "../../../chunks/table-row.js";
import "clsx";
import { B as Button } from "../../../chunks/button.js";
import { I as Input } from "../../../chunks/create-id.js";
import { L as Label } from "../../../chunks/label.js";
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from "../../../chunks/card-title.js";
import { R as Root, S as Select_trigger, a as Select_content, b as Select_item } from "../../../chunks/index5.js";
import { S as Search } from "../../../chunks/search.js";
import { R as Root$1, D as Dialog_content, a as Dialog_header, b as Dialog_title, c as Dialog_description, d as Dialog_footer } from "../../../chunks/check.js";
import { C as Checkbox, P as Page_header } from "../../../chunks/page-header.js";
import { i as invalidateAll } from "../../../chunks/client.js";
import { s as supabase } from "../../../chunks/supabaseClient.js";
function AnimalStatusBadge($$payload, $$props) {
  let badgeClass;
  let status = $$props["status"];
  const statusStyles = {
    "Available": "bg-green-100 text-green-800 border-green-200",
    "Adopted": "bg-blue-100 text-blue-800 border-blue-200",
    "Pending": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "Hold": "bg-orange-100 text-orange-800 border-orange-200",
    "Medical Hold": "bg-red-100 text-red-800 border-red-200",
    "Not Available": "bg-gray-100 text-gray-800 border-gray-200"
  };
  badgeClass = statusStyles[status] || statusStyles["Not Available"];
  $$payload.out += `<span${attr_class(`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${stringify(badgeClass)}`)} role="status"${attr("aria-label", `Adoption status: ${stringify(status)}`)}>${escape_html(status)}</span>`;
  bind_props($$props, { status });
}
function Animal_data_table($$payload, $$props) {
  push();
  let {
    data,
    columns: columns2,
    onView = () => {
    },
    onEdit = () => {
    },
    onDelete = () => {
    }
  } = $$props;
  let pagination = { pageIndex: 0, pageSize: 10 };
  let columnFilters = [];
  let sorting = [];
  let globalFilter = "";
  const globalFilterFn = (row, columnId, filterValue) => {
    if (!filterValue) return true;
    const searchValue = filterValue.toLowerCase();
    const original = row.original;
    const searchableValues = [
      original.name,
      original.species,
      original.breed,
      original.adoption_status,
      original.fur_colour,
      original.special_needs,
      original.description,
      original.rfid_tag
    ];
    return searchableValues.some((value) => String(value || "").toLowerCase().includes(searchValue));
  };
  const table = createSvelteTable({
    get data() {
      return data;
    },
    columns: columns2,
    state: {
      get pagination() {
        return pagination;
      },
      get columnFilters() {
        return columnFilters;
      },
      get sorting() {
        return sorting;
      },
      get globalFilter() {
        return globalFilter;
      }
    },
    onPaginationChange: (updater) => {
      pagination = typeof updater === "function" ? updater(pagination) : updater;
    },
    onColumnFiltersChange: (updater) => {
      columnFilters = typeof updater === "function" ? updater(columnFilters) : updater;
    },
    onSortingChange: (updater) => {
      sorting = typeof updater === "function" ? updater(sorting) : updater;
    },
    onGlobalFilterChange: (updater) => {
      globalFilter = typeof updater === "function" ? updater(globalFilter) : updater;
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    globalFilterFn
  });
  const each_array_4 = ensure_array_like(table.getRowModel().rows);
  $$payload.out += `<div class="hidden md:block rounded-md border"><!---->`;
  Table($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      Table_header($$payload2, {
        children: ($$payload3) => {
          const each_array = ensure_array_like(table.getHeaderGroups());
          $$payload3.out += `<!--[-->`;
          for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
            let headerGroup = each_array[$$index_1];
            $$payload3.out += `<!---->`;
            Table_row($$payload3, {
              children: ($$payload4) => {
                const each_array_1 = ensure_array_like(headerGroup.headers);
                $$payload4.out += `<!--[-->`;
                for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
                  let header = each_array_1[$$index];
                  $$payload4.out += `<!---->`;
                  Table_head($$payload4, {
                    colspan: header.colSpan,
                    children: ($$payload5) => {
                      if (!header.isPlaceholder) {
                        $$payload5.out += "<!--[-->";
                        if (header.column.getCanSort()) {
                          $$payload5.out += "<!--[-->";
                          Button($$payload5, {
                            variant: "ghost",
                            onclick: () => header.column.toggleSorting(),
                            class: "h-auto p-0 font-medium hover:bg-transparent",
                            children: ($$payload6) => {
                              Flex_render($$payload6, {
                                content: header.column.columnDef.header,
                                context: header.getContext()
                              });
                              $$payload6.out += `<!----> `;
                              if (header.column.getIsSorted() === "asc") {
                                $$payload6.out += "<!--[-->";
                                $$payload6.out += `<span class="ml-1">↑</span>`;
                              } else if (header.column.getIsSorted() === "desc") {
                                $$payload6.out += "<!--[1-->";
                                $$payload6.out += `<span class="ml-1">↓</span>`;
                              } else {
                                $$payload6.out += "<!--[!-->";
                                $$payload6.out += `<span class="ml-1 opacity-50">↕</span>`;
                              }
                              $$payload6.out += `<!--]-->`;
                            },
                            $$slots: { default: true }
                          });
                        } else {
                          $$payload5.out += "<!--[!-->";
                          Flex_render($$payload5, {
                            content: header.column.columnDef.header,
                            context: header.getContext()
                          });
                        }
                        $$payload5.out += `<!--]-->`;
                      } else {
                        $$payload5.out += "<!--[!-->";
                      }
                      $$payload5.out += `<!--]-->`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload4.out += `<!---->`;
                }
                $$payload4.out += `<!--]-->`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!---->`;
          }
          $$payload3.out += `<!--]-->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Table_body($$payload2, {
        children: ($$payload3) => {
          const each_array_2 = ensure_array_like(table.getRowModel().rows);
          if (each_array_2.length !== 0) {
            $$payload3.out += "<!--[-->";
            for (let $$index_3 = 0, $$length = each_array_2.length; $$index_3 < $$length; $$index_3++) {
              let row = each_array_2[$$index_3];
              $$payload3.out += `<!---->`;
              Table_row($$payload3, {
                "data-state": row.getIsSelected() && "selected",
                children: ($$payload4) => {
                  const each_array_3 = ensure_array_like(row.getVisibleCells());
                  $$payload4.out += `<!--[-->`;
                  for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
                    let cell = each_array_3[$$index_2];
                    $$payload4.out += `<!---->`;
                    Table_cell($$payload4, {
                      children: ($$payload5) => {
                        if (cell.column.id === "adoption_status") {
                          $$payload5.out += "<!--[-->";
                          const animal = row.original;
                          AnimalStatusBadge($$payload5, { status: animal.adoption_status });
                        } else if (cell.column.id === "actions") {
                          $$payload5.out += "<!--[1-->";
                          const animal = row.original;
                          $$payload5.out += `<div class="flex items-center gap-2">`;
                          Button($$payload5, {
                            variant: "secondary",
                            size: "sm",
                            onclick: () => onView(animal),
                            children: ($$payload6) => {
                              $$payload6.out += `<!---->View`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload5.out += `<!----> `;
                          Button($$payload5, {
                            variant: "outline",
                            size: "sm",
                            onclick: () => onEdit(animal),
                            children: ($$payload6) => {
                              $$payload6.out += `<!---->Edit`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload5.out += `<!----> `;
                          Button($$payload5, {
                            variant: "destructive",
                            size: "sm",
                            onclick: () => onDelete(animal),
                            children: ($$payload6) => {
                              $$payload6.out += `<!---->Delete`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload5.out += `<!----></div>`;
                        } else {
                          $$payload5.out += "<!--[!-->";
                          Flex_render($$payload5, {
                            content: cell.column.columnDef.cell,
                            context: cell.getContext()
                          });
                        }
                        $$payload5.out += `<!--]-->`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload4.out += `<!---->`;
                  }
                  $$payload4.out += `<!--]-->`;
                },
                $$slots: { default: true }
              });
              $$payload3.out += `<!---->`;
            }
          } else {
            $$payload3.out += "<!--[!-->";
            $$payload3.out += `<!---->`;
            Table_row($$payload3, {
              children: ($$payload4) => {
                $$payload4.out += `<!---->`;
                Table_cell($$payload4, {
                  colspan: columns2.length,
                  class: "h-24 text-center",
                  children: ($$payload5) => {
                    $$payload5.out += `<!---->No animals found.`;
                  },
                  $$slots: { default: true }
                });
                $$payload4.out += `<!---->`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!---->`;
          }
          $$payload3.out += `<!--]-->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div> <div class="md:hidden space-y-4">`;
  if (each_array_4.length !== 0) {
    $$payload.out += "<!--[-->";
    for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
      let row = each_array_4[$$index_4];
      const animal = row.original;
      $$payload.out += `<div class="bg-card border rounded-lg p-4 space-y-3"><div class="flex items-start justify-between"><h3 class="font-semibold text-lg">${escape_html(animal.name)}</h3> <div class="flex gap-2 ml-4">`;
      Button($$payload, {
        variant: "secondary",
        size: "sm",
        onclick: () => onView(animal),
        children: ($$payload2) => {
          $$payload2.out += `<!---->View`;
        },
        $$slots: { default: true }
      });
      $$payload.out += `<!----> `;
      Button($$payload, {
        variant: "outline",
        size: "sm",
        onclick: () => onEdit(animal),
        children: ($$payload2) => {
          $$payload2.out += `<!---->Edit`;
        },
        $$slots: { default: true }
      });
      $$payload.out += `<!----> `;
      Button($$payload, {
        variant: "destructive",
        size: "sm",
        onclick: () => onDelete(animal),
        children: ($$payload2) => {
          $$payload2.out += `<!---->Delete`;
        },
        $$slots: { default: true }
      });
      $$payload.out += `<!----></div></div> <div class="grid grid-cols-2 gap-3 text-sm"><div><span class="font-medium text-muted-foreground">Species:</span> <p class="mt-1">${escape_html(animal.species)}</p></div> `;
      if (animal.breed) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div><span class="font-medium text-muted-foreground">Breed:</span> <p class="mt-1">${escape_html(animal.breed)}</p></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> <div class="col-span-2"><span class="font-medium text-muted-foreground">Adoption Status:</span> <p class="mt-1">`;
      AnimalStatusBadge($$payload, { status: animal.adoption_status });
      $$payload.out += `<!----></p></div> <div><span class="font-medium text-muted-foreground">Arrival Date:</span> <p class="mt-1">${escape_html(new Date(animal.arrival_date).toLocaleDateString())}</p></div> <div><span class="font-medium text-muted-foreground">Neutered:</span> <p class="mt-1">${escape_html(animal.neutered ? "Yes" : "No")}</p></div></div></div>`;
    }
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="text-center py-8 text-muted-foreground">No animals found.</div>`;
  }
  $$payload.out += `<!--]--></div> <div class="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-4"><div class="text-sm text-muted-foreground text-center sm:text-left">`;
  if (table.getFilteredRowModel().rows.length > 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `Showing ${escape_html(pagination.pageIndex * pagination.pageSize + 1)} to
      ${escape_html(Math.min((pagination.pageIndex + 1) * pagination.pageSize, table.getFilteredRowModel().rows.length))}
      of ${escape_html(table.getFilteredRowModel().rows.length)} animals `;
    if (table.getFilteredRowModel().rows.length !== data.length) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="hidden sm:inline">(filtered from ${escape_html(data.length)} total)</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `No animals to show`;
  }
  $$payload.out += `<!--]--></div> <div class="flex items-center space-x-2">`;
  Button($$payload, {
    variant: "outline",
    size: "lg",
    onclick: () => table.previousPage(),
    disabled: !table.getCanPreviousPage(),
    class: "px-2 sm:px-3",
    children: ($$payload2) => {
      $$payload2.out += `<span class="hidden sm:inline">Previous</span> <span class="sm:hidden">Prev</span>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> <div class="text-sm font-medium px-2"><span class="hidden sm:inline">Page</span> ${escape_html(pagination.pageIndex + 1)} <span class="hidden sm:inline">of</span> <span class="sm:hidden">/</span> ${escape_html(table.getPageCount() || 1)}</div> `;
  Button($$payload, {
    variant: "outline",
    size: "lg",
    onclick: () => table.nextPage(),
    disabled: !table.getCanNextPage(),
    class: "px-2 sm:px-3",
    children: ($$payload2) => {
      $$payload2.out += `<span class="hidden sm:inline">Next</span> <span class="sm:hidden">Next</span>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div></div>`;
  pop();
}
const columns = [
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
    cell: ({ row }) => {
      return row.getValue("name");
    }
  },
  {
    accessorKey: "species",
    header: "Species",
    enableSorting: true,
    cell: ({ row }) => {
      return row.getValue("species");
    }
  },
  {
    accessorKey: "breed",
    header: "Breed",
    enableSorting: true,
    cell: ({ row }) => {
      const breed = row.getValue("breed");
      return breed || "N/A";
    }
  },
  {
    accessorKey: "adoption_status",
    header: "Status",
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => {
      const statusA = rowA.getValue(columnId);
      const statusB = rowB.getValue(columnId);
      return statusA.localeCompare(statusB);
    },
    cell: ({ row }) => {
      const status = row.getValue("adoption_status");
      return `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(status)}">${status}</span>`;
    }
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
      const date = row.getValue("arrival_date");
      return new Date(date).toLocaleDateString();
    }
  },
  {
    accessorKey: "neutered",
    header: "Neutered",
    enableSorting: true,
    cell: ({ row }) => {
      const neutered = row.getValue("neutered");
      return neutered ? "Yes" : "No";
    }
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
    }
  }
];
function getStatusClasses(status) {
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
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
function AnimalFilters($$payload, $$props) {
  push();
  let uniqueSpecies, uniqueAdoptionStatuses, filteredAnimals;
  let animals = fallback($$props["animals"], () => [], true);
  let onFilterChange = $$props["onFilterChange"];
  let onCreateClick = $$props["onCreateClick"];
  let searchTerm = "";
  let filterSpecies = "";
  let filterAdoptionStatus = "";
  let filterNeutered = "";
  let filterDateFrom = "";
  let filterDateTo = "";
  const debouncedFilterChange = debounce(
    (filtered) => {
      onFilterChange(filtered);
    },
    300
  );
  function clearFilters() {
    searchTerm = "";
    filterSpecies = "";
    filterAdoptionStatus = "";
    filterNeutered = "";
    filterDateFrom = "";
    filterDateTo = "";
  }
  uniqueSpecies = [
    ...new Set(animals.map((animal) => animal.species))
  ];
  uniqueAdoptionStatuses = [
    ...new Set(animals.map((animal) => animal.adoption_status))
  ];
  filteredAnimals = animals.filter((animal) => {
    const matchesSearch = searchTerm === "" || animal.name.toLowerCase().includes(searchTerm.toLowerCase()) || animal.species.toLowerCase().includes(searchTerm.toLowerCase()) || animal.breed && animal.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecies = filterSpecies === "" || animal.species === filterSpecies;
    const matchesAdoptionStatus = filterAdoptionStatus === "" || animal.adoption_status === filterAdoptionStatus;
    const matchesNeutered = filterNeutered === "" || filterNeutered === "yes" && animal.neutered || filterNeutered === "no" && !animal.neutered;
    const matchesDateRange = (() => {
      if (!filterDateFrom && !filterDateTo) return true;
      const animalDate = new Date(animal.arrival_date);
      const fromDate = filterDateFrom ? new Date(filterDateFrom) : null;
      const toDate = filterDateTo ? new Date(filterDateTo) : null;
      if (fromDate && toDate) {
        return animalDate >= fromDate && animalDate <= toDate;
      } else if (fromDate) {
        return animalDate >= fromDate;
      } else if (toDate) {
        return animalDate <= toDate;
      }
      return true;
    })();
    return matchesSearch && matchesSpecies && matchesAdoptionStatus && matchesNeutered && matchesDateRange;
  });
  debouncedFilterChange(filteredAnimals);
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="flex flex-col gap-4 py-4"><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"><span class="flex items-center">`;
    Search($$payload2, { class: "mr-3 text-gray-500" });
    $$payload2.out += `<!----> `;
    Input($$payload2, {
      type: "text",
      placeholder: "Search...",
      class: "w-full sm:max-w-sm",
      get value() {
        return searchTerm;
      },
      set value($$value) {
        searchTerm = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></span></div> `;
    Card($$payload2, {
      children: ($$payload3) => {
        Card_header($$payload3, {
          children: ($$payload4) => {
            Card_title($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->Filters`;
              },
              $$slots: { default: true }
            });
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Card_content($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"><div class="space-y-2">`;
            Label($$payload4, {
              for: "species-filter",
              children: ($$payload5) => {
                $$payload5.out += `<!---->Species`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Root($$payload4, {
              type: "single",
              get value() {
                return filterSpecies;
              },
              set value($$value) {
                filterSpecies = $$value;
                $$settled = false;
              },
              children: ($$payload5) => {
                Select_trigger($$payload5, {
                  class: "w-full",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->${escape_html(filterSpecies || "All Species")}`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Select_content($$payload5, {
                  children: ($$payload6) => {
                    const each_array = ensure_array_like(uniqueSpecies);
                    Select_item($$payload6, {
                      value: "",
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->All Species`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!--[-->`;
                    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                      let species = each_array[$$index];
                      Select_item($$payload6, {
                        value: species,
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->${escape_html(species)}`;
                        },
                        $$slots: { default: true }
                      });
                    }
                    $$payload6.out += `<!--]-->`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!---->`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----></div> <div class="space-y-2">`;
            Label($$payload4, {
              for: "adoption-filter",
              children: ($$payload5) => {
                $$payload5.out += `<!---->Adoption Status`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Root($$payload4, {
              type: "single",
              get value() {
                return filterAdoptionStatus;
              },
              set value($$value) {
                filterAdoptionStatus = $$value;
                $$settled = false;
              },
              children: ($$payload5) => {
                Select_trigger($$payload5, {
                  class: "w-full",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->${escape_html(filterAdoptionStatus || "All Statuses")}`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Select_content($$payload5, {
                  children: ($$payload6) => {
                    const each_array_1 = ensure_array_like(uniqueAdoptionStatuses);
                    Select_item($$payload6, {
                      value: "",
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->All Statuses`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!--[-->`;
                    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                      let status = each_array_1[$$index_1];
                      Select_item($$payload6, {
                        value: status,
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->${escape_html(status)}`;
                        },
                        $$slots: { default: true }
                      });
                    }
                    $$payload6.out += `<!--]-->`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!---->`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----></div> <div class="space-y-2">`;
            Label($$payload4, {
              for: "neutered-filter",
              children: ($$payload5) => {
                $$payload5.out += `<!---->Neutered`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Root($$payload4, {
              type: "single",
              get value() {
                return filterNeutered;
              },
              set value($$value) {
                filterNeutered = $$value;
                $$settled = false;
              },
              children: ($$payload5) => {
                Select_trigger($$payload5, {
                  class: "w-full",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->${escape_html(filterNeutered || "All")}`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Select_content($$payload5, {
                  children: ($$payload6) => {
                    Select_item($$payload6, {
                      value: "",
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->All`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> `;
                    Select_item($$payload6, {
                      value: "yes",
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Yes`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> `;
                    Select_item($$payload6, {
                      value: "no",
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->No`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!---->`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----></div> <div class="space-y-2">`;
            Label($$payload4, {
              for: "date-from",
              children: ($$payload5) => {
                $$payload5.out += `<!---->Arrival Date From`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Input($$payload4, {
              id: "date-from",
              type: "date",
              class: "w-full",
              get value() {
                return filterDateFrom;
              },
              set value($$value) {
                filterDateFrom = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----></div> <div class="space-y-2">`;
            Label($$payload4, {
              for: "date-to",
              children: ($$payload5) => {
                $$payload5.out += `<!---->Arrival Date To`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Input($$payload4, {
              id: "date-to",
              type: "date",
              class: "w-full",
              get value() {
                return filterDateTo;
              },
              set value($$value) {
                filterDateTo = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----></div></div> <div class="flex justify-between items-center mt-4"><div class="text-sm text-muted-foreground">Showing ${escape_html(filteredAnimals.length)} of ${escape_html(animals.length)} animals</div> <div class="flex gap-2">`;
            Button($$payload4, {
              variant: "outline",
              size: "sm",
              onclick: clearFilters,
              children: ($$payload5) => {
                $$payload5.out += `<!---->Clear Filters`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Button($$payload4, {
              size: "sm",
              onclick: onCreateClick,
              children: ($$payload5) => {
                $$payload5.out += `<!---->Add New Animal`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----></div></div>`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { animals, onFilterChange, onCreateClick });
  pop();
}
function AnimalViewDetails($$payload, $$props) {
  push();
  let animal = $$props["animal"];
  $$payload.out += `<div class="flex-1 space-y-6 overflow-y-auto"><div class="space-y-4"><h3 class="text-lg font-semibold">Basic Information</h3> <div class="grid grid-cols-2 gap-4 text-sm"><div><span class="font-medium text-muted-foreground">Species:</span> <p class="mt-1">${escape_html(animal.species)}</p></div> `;
  if (animal.breed) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div><span class="font-medium text-muted-foreground">Breed:</span> <p class="mt-1">${escape_html(animal.breed)}</p></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (animal.date_of_birth) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div><span class="font-medium text-muted-foreground">Date of Birth:</span> <p class="mt-1">${escape_html(animal.date_of_birth)}</p></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (animal.fur_colour) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div><span class="font-medium text-muted-foreground">Fur Colour:</span> <p class="mt-1">${escape_html(animal.fur_colour)}</p></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (animal.weight_kg) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div><span class="font-medium text-muted-foreground">Weight:</span> <p class="mt-1">${escape_html(animal.weight_kg)} kg</p></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div> <div class="space-y-4 border-t pt-4"><h3 class="text-lg font-semibold">Status Information</h3> <div class="grid grid-cols-2 gap-4 text-sm"><div><span class="font-medium text-muted-foreground">Arrival Date:</span> <p class="mt-1">${escape_html(animal.arrival_date)}</p></div> <div><span class="font-medium text-muted-foreground">Neutered:</span> <p class="mt-1"><span${attr_class(`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${stringify(animal.neutered ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800")}`)}>${escape_html(animal.neutered ? "Yes" : "No")}</span></p></div> <div><span class="font-medium text-muted-foreground">Adoption Status:</span> <p class="mt-1">`;
  AnimalStatusBadge($$payload, { status: animal.adoption_status });
  $$payload.out += `<!----></p></div> `;
  if (animal.rfid_tag) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div><span class="font-medium text-muted-foreground">RFID Tag:</span> <p class="mt-1 font-mono text-sm">${escape_html(animal.rfid_tag)}</p></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (animal.bonded_with) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div><span class="font-medium text-muted-foreground">Bonded With:</span> <p class="mt-1">${escape_html(animal.bonded_with)}</p></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div> `;
  if (animal.special_needs || animal.description) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="space-y-4 border-t pt-4"><h3 class="text-lg font-semibold">Additional Information</h3> `;
    if (animal.special_needs) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div><span class="font-medium text-muted-foreground">Special Needs:</span> <p class="mt-2 text-sm text-orange-700 bg-orange-50 p-3 rounded-md">${escape_html(animal.special_needs)}</p></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (animal.description) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div><span class="font-medium text-muted-foreground">Description:</span> <p class="mt-2 text-sm">${escape_html(animal.description)}</p></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { animal });
  pop();
}
function AnimalFormField($$payload, $$props) {
  let id = $$props["id"];
  let label = $$props["label"];
  let type = fallback($$props["type"], "text");
  let name = $$props["name"];
  let value = fallback($$props["value"], "");
  let required = fallback($$props["required"], false);
  let placeholder = fallback($$props["placeholder"], "");
  let options = fallback($$props["options"], () => [], true);
  let step = fallback($$props["step"], "");
  let checked = fallback($$props["checked"], false);
  let error = fallback($$props["error"], "");
  let disabled = fallback($$props["disabled"], false);
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="space-y-2">`;
    if (type !== "checkbox") {
      $$payload2.out += "<!--[-->";
      Label($$payload2, {
        for: id,
        children: ($$payload3) => {
          $$payload3.out += `<!---->${escape_html(label)}${escape_html(required ? " *" : "")}`;
        },
        $$slots: { default: true }
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (type === "select") {
      $$payload2.out += "<!--[-->";
      Root($$payload2, {
        type: "single",
        disabled,
        get value() {
          return value;
        },
        set value($$value) {
          value = $$value;
          $$settled = false;
        },
        children: ($$payload3) => {
          Select_trigger($$payload3, {
            "aria-describedby": error ? `${id}-error` : void 0,
            children: ($$payload4) => {
              $$payload4.out += `<!---->${escape_html(value || placeholder)}`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          Select_content($$payload3, {
            children: ($$payload4) => {
              const each_array = ensure_array_like(options);
              $$payload4.out += `<!--[-->`;
              for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                let option = each_array[$$index];
                Select_item($$payload4, {
                  value: option,
                  children: ($$payload5) => {
                    $$payload5.out += `<!---->${escape_html(option)}`;
                  },
                  $$slots: { default: true }
                });
              }
              $$payload4.out += `<!--]-->`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <input type="hidden"${attr("name", name)}${attr("value", value)}/>`;
    } else if (type === "textarea") {
      $$payload2.out += "<!--[1-->";
      $$payload2.out += `<textarea${attr("id", id)}${attr("name", name)}${attr("placeholder", placeholder)}${attr("required", required, true)}${attr("disabled", disabled, true)}${attr("aria-describedby", error ? `${id}-error` : void 0)}${attr_class(`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${stringify(error ? "border-red-500" : "")}`)}>`;
      const $$body = escape_html(value);
      if ($$body) {
        $$payload2.out += `${$$body}`;
      }
      $$payload2.out += `</textarea>`;
    } else if (type === "checkbox") {
      $$payload2.out += "<!--[2-->";
      $$payload2.out += `<div class="flex items-center space-x-2">`;
      Checkbox($$payload2, {
        id,
        name,
        disabled,
        "aria-describedby": error ? `${id}-error` : void 0,
        get checked() {
          return checked;
        },
        set checked($$value) {
          checked = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      Label($$payload2, {
        for: id,
        children: ($$payload3) => {
          $$payload3.out += `<!---->${escape_html(label)}${escape_html(required ? " *" : "")}`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
      Input($$payload2, {
        id,
        type,
        name,
        required,
        placeholder,
        step,
        disabled,
        "aria-describedby": error ? `${id}-error` : void 0,
        class: `w-full ${stringify(error ? "border-red-500" : "")}`,
        get value() {
          return value;
        },
        set value($$value) {
          value = $$value;
          $$settled = false;
        }
      });
    }
    $$payload2.out += `<!--]--> `;
    if (error) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<p${attr("id", `${stringify(id)}-error`)} class="text-sm text-red-600 mt-1" role="alert">${escape_html(error)}</p>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, {
    id,
    label,
    type,
    name,
    value,
    required,
    placeholder,
    options,
    step,
    checked,
    error,
    disabled
  });
}
const ANIMAL_SPECIES = [
  "Rabbit",
  "Dog",
  "Cat",
  "Guinea Pig",
  "Bird",
  "Other"
];
const ADOPTION_STATUSES = [
  "Available",
  "Pending",
  "Adopted",
  "Hold",
  "Medical Hold",
  "Not Available"
];
function AnimalEditForm($$payload, $$props) {
  push();
  let animal = $$props["animal"];
  let allAnimals = fallback($$props["allAnimals"], () => [], true);
  let onUpdateSuccess = fallback($$props["onUpdateSuccess"], () => {
  });
  let editingAnimal = { ...animal };
  const speciesOptions = ANIMAL_SPECIES;
  const adoptionStatusOptions = ADOPTION_STATUSES;
  if (animal) {
    editingAnimal = { ...animal };
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<form id="edit-animal-form" method="POST" action="?/update" class="flex-1 space-y-4 overflow-y-auto"><input type="hidden" name="id"${attr("value", editingAnimal.id)}/> `;
    AnimalFormField($$payload2, {
      id: "edit-name",
      label: "Name",
      type: "text",
      name: "name",
      required: true,
      get value() {
        return editingAnimal.name;
      },
      set value($$value) {
        editingAnimal.name = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> <div class="space-y-2">`;
    Label($$payload2, {
      for: "edit-species",
      children: ($$payload3) => {
        $$payload3.out += `<!---->Species *`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    Root($$payload2, {
      type: "single",
      get value() {
        return editingAnimal.species;
      },
      set value($$value) {
        editingAnimal.species = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        Select_trigger($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->${escape_html(editingAnimal.species)}`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Select_content($$payload3, {
          children: ($$payload4) => {
            const each_array = ensure_array_like(speciesOptions);
            $$payload4.out += `<!--[-->`;
            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
              let species = each_array[$$index];
              Select_item($$payload4, {
                value: species,
                children: ($$payload5) => {
                  $$payload5.out += `<!---->${escape_html(species)}`;
                },
                $$slots: { default: true }
              });
            }
            $$payload4.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <input type="hidden" name="species"${attr("value", editingAnimal.species)}/></div> `;
    AnimalFormField($$payload2, {
      id: "edit-breed",
      label: "Breed",
      type: "text",
      name: "breed",
      get value() {
        return editingAnimal.breed;
      },
      set value($$value) {
        editingAnimal.breed = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AnimalFormField($$payload2, {
      id: "edit-date-of-birth",
      label: "Date of Birth",
      type: "date",
      name: "date_of_birth",
      get value() {
        return editingAnimal.date_of_birth;
      },
      set value($$value) {
        editingAnimal.date_of_birth = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AnimalFormField($$payload2, {
      id: "edit-fur-colour",
      label: "Fur Colour",
      type: "text",
      name: "fur_colour",
      get value() {
        return editingAnimal.fur_colour;
      },
      set value($$value) {
        editingAnimal.fur_colour = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AnimalFormField($$payload2, {
      id: "edit-weight",
      label: "Weight (kg)",
      type: "number",
      name: "weight_kg",
      step: "0.1",
      get value() {
        return editingAnimal.weight_kg;
      },
      set value($$value) {
        editingAnimal.weight_kg = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AnimalFormField($$payload2, {
      id: "edit-arrival-date",
      label: "Arrival Date",
      type: "date",
      name: "arrival_date",
      required: true,
      get value() {
        return editingAnimal.arrival_date;
      },
      set value($$value) {
        editingAnimal.arrival_date = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> <div class="flex items-center space-x-2">`;
    Checkbox($$payload2, {
      id: "edit-neutered",
      name: "neutered",
      get checked() {
        return editingAnimal.neutered;
      },
      set checked($$value) {
        editingAnimal.neutered = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Label($$payload2, {
      for: "edit-neutered",
      children: ($$payload3) => {
        $$payload3.out += `<!---->Neutered/Spayed`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></div> <div class="space-y-2">`;
    Label($$payload2, {
      for: "edit-adoption-status",
      children: ($$payload3) => {
        $$payload3.out += `<!---->Adoption Status *`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    Root($$payload2, {
      type: "single",
      get value() {
        return editingAnimal.adoption_status;
      },
      set value($$value) {
        editingAnimal.adoption_status = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        Select_trigger($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->${escape_html(editingAnimal.adoption_status)}`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Select_content($$payload3, {
          children: ($$payload4) => {
            const each_array_1 = ensure_array_like(adoptionStatusOptions);
            $$payload4.out += `<!--[-->`;
            for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
              let status = each_array_1[$$index_1];
              Select_item($$payload4, {
                value: status,
                children: ($$payload5) => {
                  $$payload5.out += `<!---->${escape_html(status)}`;
                },
                $$slots: { default: true }
              });
            }
            $$payload4.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <input type="hidden" name="adoption_status"${attr("value", editingAnimal.adoption_status)}/></div> `;
    AnimalFormField($$payload2, {
      id: "edit-rfid-tag",
      label: "RFID Tag",
      type: "text",
      name: "rfid_tag",
      get value() {
        return editingAnimal.rfid_tag;
      },
      set value($$value) {
        editingAnimal.rfid_tag = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> <div class="space-y-2">`;
    Label($$payload2, {
      for: "edit-bonded-with",
      children: ($$payload3) => {
        $$payload3.out += `<!---->Bonded With`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    Root($$payload2, {
      type: "single",
      get value() {
        return editingAnimal.bonded_with;
      },
      set value($$value) {
        editingAnimal.bonded_with = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        Select_trigger($$payload3, {
          children: ($$payload4) => {
            if (editingAnimal.bonded_with) {
              $$payload4.out += "<!--[-->";
              $$payload4.out += `${escape_html(allAnimals.find((a) => a.id === editingAnimal.bonded_with)?.name || editingAnimal.bonded_with)}`;
            } else {
              $$payload4.out += "<!--[!-->";
              $$payload4.out += `Select an animal...`;
            }
            $$payload4.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Select_content($$payload3, {
          children: ($$payload4) => {
            const each_array_2 = ensure_array_like(allAnimals.filter((a) => a.id !== editingAnimal.id));
            Select_item($$payload4, {
              value: "",
              children: ($$payload5) => {
                $$payload5.out += `<!---->None`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> <!--[-->`;
            for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
              let bondAnimal = each_array_2[$$index_2];
              Select_item($$payload4, {
                value: bondAnimal.id,
                children: ($$payload5) => {
                  $$payload5.out += `<!---->${escape_html(bondAnimal.name)} (${escape_html(bondAnimal.species)})`;
                },
                $$slots: { default: true }
              });
            }
            $$payload4.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <input type="hidden" name="bonded_with"${attr("value", editingAnimal.bonded_with)}/></div> `;
    AnimalFormField($$payload2, {
      id: "edit-special-needs",
      label: "Special Needs",
      type: "textarea",
      name: "special_needs",
      placeholder: "Any special care requirements...",
      get value() {
        return editingAnimal.special_needs;
      },
      set value($$value) {
        editingAnimal.special_needs = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AnimalFormField($$payload2, {
      id: "edit-description",
      label: "Description",
      type: "textarea",
      name: "description",
      placeholder: "General description of the animal...",
      get value() {
        return editingAnimal.description;
      },
      set value($$value) {
        editingAnimal.description = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></form>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { animal, allAnimals, onUpdateSuccess });
  pop();
}
function AnimalModal($$payload, $$props) {
  push();
  let animal = fallback($$props["animal"], null);
  let open = fallback($$props["open"], false);
  let mode = fallback($$props["mode"], "view");
  let allAnimals = fallback($$props["allAnimals"], () => [], true);
  let editingAnimal = null;
  if (animal && mode === "edit") {
    editingAnimal = { ...animal };
  } else if (!animal) {
    editingAnimal = null;
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    Root$1($$payload2, {
      get open() {
        return open;
      },
      set open($$value) {
        open = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        Dialog_content($$payload3, {
          class: "max-w-2xl max-h-[90vh] flex flex-col",
          children: ($$payload4) => {
            Dialog_header($$payload4, {
              children: ($$payload5) => {
                Dialog_title($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->${escape_html(animal ? animal.name : "Animal Details")}`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Dialog_description($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->${escape_html(mode === "edit" ? "Make changes to the animal's information below." : "View detailed information about this animal.")}`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!---->`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            if (animal) {
              $$payload4.out += "<!--[-->";
              if (mode === "view") {
                $$payload4.out += "<!--[-->";
                AnimalViewDetails($$payload4, { animal });
              } else if (mode === "edit" && editingAnimal) {
                $$payload4.out += "<!--[1-->";
                AnimalEditForm($$payload4, {
                  animal: editingAnimal,
                  allAnimals,
                  onUpdateSuccess: () => open = false
                });
              } else {
                $$payload4.out += "<!--[!-->";
              }
              $$payload4.out += `<!--]-->`;
            } else {
              $$payload4.out += "<!--[!-->";
              $$payload4.out += `<div class="flex items-center justify-center p-8"><p class="text-muted-foreground">No animal selected</p></div>`;
            }
            $$payload4.out += `<!--]--> `;
            Dialog_footer($$payload4, {
              children: ($$payload5) => {
                if (mode === "view") {
                  $$payload5.out += "<!--[-->";
                  Button($$payload5, {
                    type: "button",
                    onclick: () => open = false,
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->Close`;
                    },
                    $$slots: { default: true }
                  });
                } else if (mode === "edit") {
                  $$payload5.out += "<!--[1-->";
                  Button($$payload5, {
                    type: "button",
                    variant: "outline",
                    onclick: () => open = false,
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->Cancel`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Button($$payload5, {
                    type: "submit",
                    form: "edit-animal-form",
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->Update Animal`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                } else {
                  $$payload5.out += "<!--[!-->";
                }
                $$payload5.out += `<!--]-->`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!---->`;
          },
          $$slots: { default: true }
        });
      },
      $$slots: { default: true }
    });
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { animal, open, mode, allAnimals });
  pop();
}
function AnimalCreateForm($$payload, $$props) {
  push();
  let allAnimals = fallback($$props["allAnimals"], () => [], true);
  let onSubmit = fallback($$props["onSubmit"], () => {
  });
  let newAnimal = {
    name: "",
    species: "Rabbit",
    breed: "",
    date_of_birth: "",
    fur_colour: "",
    weight_kg: "",
    arrival_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    neutered: false,
    adoption_status: "Available",
    bonded_with: "",
    rfid_tag: "",
    special_needs: "",
    description: ""
  };
  const speciesOptions = ANIMAL_SPECIES;
  const adoptionStatusOptions = ADOPTION_STATUSES;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<form id="create-animal-form" method="POST" action="?/create" class="space-y-4">`;
    AnimalFormField($$payload2, {
      id: "create-name",
      label: "Name",
      type: "text",
      name: "name",
      required: true,
      get value() {
        return newAnimal.name;
      },
      set value($$value) {
        newAnimal.name = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> <div class="space-y-2">`;
    Label($$payload2, {
      for: "create-species",
      children: ($$payload3) => {
        $$payload3.out += `<!---->Species *`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    Root($$payload2, {
      type: "single",
      get value() {
        return newAnimal.species;
      },
      set value($$value) {
        newAnimal.species = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        Select_trigger($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->${escape_html(newAnimal.species)}`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Select_content($$payload3, {
          children: ($$payload4) => {
            const each_array = ensure_array_like(speciesOptions);
            $$payload4.out += `<!--[-->`;
            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
              let species = each_array[$$index];
              Select_item($$payload4, {
                value: species,
                children: ($$payload5) => {
                  $$payload5.out += `<!---->${escape_html(species)}`;
                },
                $$slots: { default: true }
              });
            }
            $$payload4.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <input type="hidden" name="species"${attr("value", newAnimal.species)}/></div> `;
    AnimalFormField($$payload2, {
      id: "create-breed",
      label: "Breed",
      type: "text",
      name: "breed",
      get value() {
        return newAnimal.breed;
      },
      set value($$value) {
        newAnimal.breed = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AnimalFormField($$payload2, {
      id: "create-date-of-birth",
      label: "Date of Birth",
      type: "date",
      name: "date_of_birth",
      get value() {
        return newAnimal.date_of_birth;
      },
      set value($$value) {
        newAnimal.date_of_birth = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AnimalFormField($$payload2, {
      id: "create-fur-colour",
      label: "Fur Colour",
      type: "text",
      name: "fur_colour",
      get value() {
        return newAnimal.fur_colour;
      },
      set value($$value) {
        newAnimal.fur_colour = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AnimalFormField($$payload2, {
      id: "create-weight",
      label: "Weight (kg)",
      type: "number",
      name: "weight_kg",
      step: "0.1",
      get value() {
        return newAnimal.weight_kg;
      },
      set value($$value) {
        newAnimal.weight_kg = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AnimalFormField($$payload2, {
      id: "create-arrival-date",
      label: "Arrival Date",
      type: "date",
      name: "arrival_date",
      required: true,
      get value() {
        return newAnimal.arrival_date;
      },
      set value($$value) {
        newAnimal.arrival_date = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> <div class="flex items-center space-x-2">`;
    Checkbox($$payload2, {
      id: "create-neutered",
      name: "neutered",
      get checked() {
        return newAnimal.neutered;
      },
      set checked($$value) {
        newAnimal.neutered = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Label($$payload2, {
      for: "create-neutered",
      children: ($$payload3) => {
        $$payload3.out += `<!---->Neutered/Spayed`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></div> <div class="space-y-2">`;
    Label($$payload2, {
      for: "create-adoption-status",
      children: ($$payload3) => {
        $$payload3.out += `<!---->Adoption Status *`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    Root($$payload2, {
      type: "single",
      get value() {
        return newAnimal.adoption_status;
      },
      set value($$value) {
        newAnimal.adoption_status = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        Select_trigger($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->${escape_html(newAnimal.adoption_status)}`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Select_content($$payload3, {
          children: ($$payload4) => {
            const each_array_1 = ensure_array_like(adoptionStatusOptions);
            $$payload4.out += `<!--[-->`;
            for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
              let status = each_array_1[$$index_1];
              Select_item($$payload4, {
                value: status,
                children: ($$payload5) => {
                  $$payload5.out += `<!---->${escape_html(status)}`;
                },
                $$slots: { default: true }
              });
            }
            $$payload4.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <input type="hidden" name="adoption_status"${attr("value", newAnimal.adoption_status)}/></div> `;
    AnimalFormField($$payload2, {
      id: "create-rfid-tag",
      label: "RFID Tag",
      type: "text",
      name: "rfid_tag",
      get value() {
        return newAnimal.rfid_tag;
      },
      set value($$value) {
        newAnimal.rfid_tag = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> <div class="space-y-2">`;
    Label($$payload2, {
      for: "create-bonded-with",
      children: ($$payload3) => {
        $$payload3.out += `<!---->Bonded With`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    Root($$payload2, {
      type: "single",
      get value() {
        return newAnimal.bonded_with;
      },
      set value($$value) {
        newAnimal.bonded_with = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        Select_trigger($$payload3, {
          children: ($$payload4) => {
            if (newAnimal.bonded_with) {
              $$payload4.out += "<!--[-->";
              $$payload4.out += `${escape_html(allAnimals.find((a) => a.id === newAnimal.bonded_with)?.name || newAnimal.bonded_with)}`;
            } else {
              $$payload4.out += "<!--[!-->";
              $$payload4.out += `Select an animal...`;
            }
            $$payload4.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Select_content($$payload3, {
          children: ($$payload4) => {
            const each_array_2 = ensure_array_like(allAnimals);
            Select_item($$payload4, {
              value: "",
              children: ($$payload5) => {
                $$payload5.out += `<!---->None`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> <!--[-->`;
            for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
              let bondAnimal = each_array_2[$$index_2];
              Select_item($$payload4, {
                value: bondAnimal.id,
                children: ($$payload5) => {
                  $$payload5.out += `<!---->${escape_html(bondAnimal.name)} (${escape_html(bondAnimal.species)})`;
                },
                $$slots: { default: true }
              });
            }
            $$payload4.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <input type="hidden" name="bonded_with"${attr("value", newAnimal.bonded_with)}/></div> `;
    AnimalFormField($$payload2, {
      id: "create-special-needs",
      label: "Special Needs",
      type: "textarea",
      name: "special_needs",
      placeholder: "Any special care requirements...",
      get value() {
        return newAnimal.special_needs;
      },
      set value($$value) {
        newAnimal.special_needs = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AnimalFormField($$payload2, {
      id: "create-description",
      label: "Description",
      type: "textarea",
      name: "description",
      placeholder: "General description of the animal...",
      get value() {
        return newAnimal.description;
      },
      set value($$value) {
        newAnimal.description = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></form>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { allAnimals, onSubmit });
  pop();
}
function AnimalDataTable($$payload, $$props) {
  push();
  let data = fallback($$props["data"], () => [], true);
  let showAnimalModal = false;
  let viewingAnimal = null;
  let modalMode = "view";
  let showCreateForm = false;
  let filteredAnimals = data;
  function handleFilterChange(filtered) {
    filteredAnimals = filtered;
  }
  function handleEdit(animal) {
    viewingAnimal = { ...animal };
    modalMode = "edit";
    showCreateForm = false;
    showAnimalModal = true;
  }
  function handleView(animal) {
    viewingAnimal = { ...animal };
    modalMode = "view";
    showAnimalModal = true;
  }
  async function handleDelete(animal) {
    if (!animal.id) {
      alert(`Cannot delete ${animal.name}: Invalid ID`);
      return;
    }
    if (!confirm(`Are you sure you want to delete ${animal.name}? This action cannot be undone.`)) {
      return;
    }
    try {
      const { error } = await supabase.from("animal").delete().eq("id", animal.id);
      if (error) {
        alert(`Failed to delete ${animal.name}: ${error.message}`);
        return;
      }
      await invalidateAll();
      showAnimalModal = false;
      showCreateForm = false;
    } catch (err) {
      alert(`Failed to delete ${animal.name}: An unexpected error occurred`);
    }
  }
  function handleCreate() {
    showCreateForm = true;
    showAnimalModal = false;
  }
  function handleCancel() {
    showCreateForm = false;
    showAnimalModal = false;
    viewingAnimal = null;
    modalMode = "view";
  }
  function handleFormSubmit() {
    showCreateForm = false;
  }
  if (data) {
    filteredAnimals = data;
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    AnimalFilters($$payload2, {
      animals: data,
      onFilterChange: handleFilterChange,
      onCreateClick: handleCreate
    });
    $$payload2.out += `<!----> `;
    Animal_data_table($$payload2, {
      data: filteredAnimals,
      columns,
      onView: handleView,
      onEdit: handleEdit,
      onDelete: handleDelete
    });
    $$payload2.out += `<!----> `;
    Root$1($$payload2, {
      get open() {
        return showCreateForm;
      },
      set open($$value) {
        showCreateForm = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        Dialog_content($$payload3, {
          class: "max-w-2xl max-h-[90vh] flex flex-col",
          children: ($$payload4) => {
            Dialog_header($$payload4, {
              class: "flex-shrink-0",
              children: ($$payload5) => {
                Dialog_title($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Add New Animal`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Dialog_description($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Fill in the details below to add a new animal to the shelter.`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!---->`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> <div class="flex-1 overflow-y-auto px-6">`;
            AnimalCreateForm($$payload4, { allAnimals: data, onSubmit: handleFormSubmit });
            $$payload4.out += `<!----></div> `;
            Dialog_footer($$payload4, {
              class: "flex-shrink-0",
              children: ($$payload5) => {
                Button($$payload5, {
                  type: "button",
                  variant: "outline",
                  onclick: handleCancel,
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Cancel`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Button($$payload5, {
                  type: "submit",
                  form: "create-animal-form",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Create Animal`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!---->`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!---->`;
          },
          $$slots: { default: true }
        });
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    AnimalModal($$payload2, {
      animal: viewingAnimal,
      mode: modalMode,
      allAnimals: data,
      get open() {
        return showAnimalModal;
      },
      set open($$value) {
        showAnimalModal = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { data });
  pop();
}
function _page($$payload, $$props) {
  push();
  let data = $$props["data"];
  $$payload.out += `<main class="p-6 pb-0" aria-labelledby="animals-title">`;
  Page_header($$payload, {
    title: "Animals",
    description: "Manage your animal shelter records"
  });
  $$payload.out += `<!----> <section aria-label="Animal management interface">`;
  AnimalDataTable($$payload, { data: data.animals });
  $$payload.out += `<!----></section></main>`;
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
