<template>
  <div style="width: 100%" class="screen">
    <h1>{{ screen.name }}</h1>
    <div v-for="(section, i) in screen.sections" :key="i">
      <h1>
        {{ section.title }}
      </h1>
      <div v-for="(container, i) in section.containers" :key="i">
        <Form :container="container" />
      </div>
    </div>
  </div>
</template>
<script>
import Form from "/src/components/simbiose/Form.vue";

export default {
  name: "Page",
  props: ["screen"],
  components: {
    Form,
  },
};
</script>
