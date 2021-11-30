<template>
    <h4> tabela </h4>
</template>

<script>
export default {
  name: "DataTable",
  props: {
    header: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    emptyTableText: {
      type: String,
      default: "No data found",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    enableItemsPerPageDropdown: {
      type: Boolean,
      default: true,
    },
    total: {
      type: Number,
      default: 0,
    },
    rowsPerPage: {
      type: Number,
      default: 10,
    },
    order: {
      type: String,
      default: "asc",
    },
    sortLabel: {
      type: String,
      default: "",
    },
  },
}
</script>
