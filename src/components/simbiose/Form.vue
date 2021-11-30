<template>
  <p>{{ container.description }}</p>
  <form>
    <div v-for="(field, i) in container.settings.fields" :key="i">
      <FastCrudField :field="field" />
    </div>
    <div v-for="(action, i) in container.settings.actions" :key="i">
      <FastCrudButton :action="action" />
    </div>
  </form>

  <br />
  <div
    style="
      border: 1px #ddd solid;
      margin: 20px;
      padding: 10px;
      border-radius: 5px;
    "
  >
    <Datatable
      :header="tableHeader"
      :data="tableData"
      :rows-per-page="5"
      :enable-items-per-page-dropdown="true"
      :loading="!tableData.length"
    />
  </div>
</template>
<script>
import FastCrudField from "/src/components/simbiose/fields/FastCrudField.vue";
import FastCrudButton from "/src/components/simbiose/actions/FastCrudButton.vue";
import Datatable from "/src/components/simbiose/tables/Datatable.vue";

import { createNamespacedHelpers } from "vuex";

// TODO: esse nome deve ser pego dinamicamente
const { mapGetters } = createNamespacedHelpers(
  "module_tato-inserir-fisioterapeuta"
);

export default {
  name: "Form",
  props: ["container"],
  data() {
    return {
      tableHeader: [
        {
          name: "Label",
          key: "label",
          sortable: true,
        },
        {
          name: "Name",
          key: "name",
          sortable: true,
        },
        {
          name: "Required",
          key: "required",
          // sortingField: "status.label",
          sortable: true,
        },
        {
          name: "Type",
          key: "type",
          sortable: true,
        },
        {
          name: "Value",
          key: "value",
          sortable: false,
        },
      ],
      showTable: true,
    };
  },
  components: {
    FastCrudButton,
    FastCrudField,
    Datatable,
  },
  computed: {
    ...mapGetters(["formFields"]),
    tableData() {
      console.log(this.formFields);
      return this.formFields || [];
    },
  },
  methods: {
    getFieldType(type) {
      switch (type) {
        case "text":
        case "cpf":
        case "number":
        case "email":
        case "password":
        case "autocomplete":
        case "currency":
        case "percent":
        case "credit_card":
          return "text";
        case "select":
        case "multiselect":
          return "select";
        case "duallistbox":
        case "duallistdata":
        case "duallistdatadependent":
          return "duallistbox";
        case "remotedata":
        case "multiremotedata":
          return "remotedata";
        default:
          return type;
      }
    },
  },
  async beforeCreate() {
    const { fields } = this.container.settings;

    // TODO: checar se já existe.
    this.$store.dispatch("addFormModule", this.container.name);

    const _fields = fields.map((field) => {
      return {
        ...field,
        value: "",
      };
    });

    await this.$store.dispatch(
      `module_${this.container.name}/loadFormFields`,
      _fields
    );

    this.showTable = true;
    console.log(this.tableData);
  },
};
</script>
