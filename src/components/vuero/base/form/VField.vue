<script setup lang="ts">
export type VFieldProps = {
  addons?: boolean
  label?: string
  textaddon?: boolean
  grouped?: boolean
  multiline?: boolean
  horizontal?: boolean
  type?: string
  field?: Object
  value?: Object
}

const props = withDefaults(defineProps<VFieldProps>(), {
    label: undefined,
})
</script>

<template>
  <div
    class="field"
    :class="[
      props.addons && 'has-addons',
      props.textaddon && 'has-textarea-addon',
      props.grouped && 'is-grouped',
      props.grouped && props.multiline && 'is-grouped-multiline',
      props.horizontal && 'is-horizontal',
    ]"
  >
    <template v-if="typeof props.label === 'string' && props.horizontal">
      <div class="field-label is-normal">
        <label class="label">{{ props.label }}</label>
      </div>
      <div class="field-body">
        <slot></slot>
      </div>
    </template>
    <template v-else-if="typeof props.label === 'string'">
      <label class="label">
        {{ props.label }}
      </label>
      <slot name="teste"></slot>
        <p>passei aqui</p>
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>
