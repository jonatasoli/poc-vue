<script lang="ts">
// https://www.thisdot.co/blog/vue-3-2-using-composition-api-with-script-setup
// TODO: Usar o modo abreviado ou não?

import { ref } from 'vue'
import VField from '@/components/vuero/base/form/VField.vue'
import VControl from '@/components/vuero/base/form/VControl.vue'

export default {
  name: "FastCrudField",
  components: {
    VField,
    VControl,
  },
  props: ["field"],
  setup(props) {
    const input = ref(props.field)
    return {
      input
    }
  },

  methods: {
    // TODO: move to vuex;

    /**
     * @param {string} type
     * @returns {string}
     */
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
          return "text";
        case "multiremotedata":
          return "remotedata";
        default:
          return type;
      }
    },

    // TODO: move to vuex;
    getInitialData() {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      if ("initial-data" in this.field) {
        if (this.field["initial-data"] in currentUser) {
          return currentUser[this.field["initial-data"]];
        } else {
          //Buscar valores de outro campo
        }
      }

      return "";
    },
  },
}
  //  :type="getFieldType(field.type)
  //  :field="field"
  //  :value="getInitialData()"
  /* <VField> */
  /*   <VControl> */
  /*   </VControl> */
  /* </VField> */
</script>

<template>

  <VField v-if="getFieldType(field.type) === 'text'">
    <p> {{ getFieldType(field.type) }}</p>
    <VControl>
      <input
        v-model="input"
        type="text"
        class="input"
        placeholder="Your username"
      />
    </VControl>
  </VField>
  <VField v-else-if="getFieldType(field.type) === 'hidden'">
    <p> {{ getFieldType(field.type) }}</p>
    <VControl>
      <input
        v-model="input"
        type="text"
        class="input"
        placeholder="Your username"
      />
    </VControl>
  </VField>
  <VField v-else-if="getFieldType(field.type) === 'select'">
    <p> {{ getFieldType(field.type) }}</p>
    <VControl>
      <div class="select">
        <select v-model="input">
          <option value="">Select a Hero</option>
          <option value="Superman">Superman</option>
          <option value="Batman">Batman</option>
          <option value="Spiderman">Spiderman</option>
          <option value="Deadpool">Deadpool</option>
          <option value="Spawn">Spawn</option>
          <option value="Galactus">Galactus</option>
        </select>
      </div>
    </VControl>
  </VField>
  <VField v-else>
    <p> {{ getFieldType(field.type) }}</p>
    <VControl>
      <textarea
        v-model="textarea"
        class="textarea"
        rows="4"
        placeholder="Não tenho componente ainda"
      ></textarea>
    </VControl>
  </VField>
</template>
