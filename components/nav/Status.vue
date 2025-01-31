<template>
  <div class="fixed inset-x-0 bottom-20">
    <div class="flex justify-center my-1" v-for="value in statuses">
      <span class="flex w-fit max-w-sm">
        <span
          class="flex first-letter:capitalize text-center text-sm w-fit max-w-sm py-2 px-3"
          :class="[
            theme_text,
            value.type === 'alert'
              ? theme_alert
              : value.type === 'success'
              ? theme_success
              : value.type === 'warning'
              ? theme_warning
              : theme_default,
          ]"
          >{{ value.msg }}
        </span>
        <button
          v-if="value.id"
          class="text-sm py-2 px-3"
          :class="[
            theme_text,
            value.type === 'alert'
              ? 'bg-danger-darkest'
              : value.type === 'success'
              ? 'bg-success-darkest'
              : value.type === 'warning'
              ? 'bg-warning-darkest'
              : 'bg-default-darkest',
          ]"
          type="button"
          @click="$emit('status:id', value)"
        >
          x
        </button>
      </span>
    </div>
  </div>
</template>

<script scoped>
export default {
  props: {
    statuses: {
      required: true,
      default: [],
      type: Array,
    },
    theme_alert: {
      default: "bg-danger",
      type: String,
    },
    theme_success: {
      default: "bg-success",
      type: String,
    },
    theme_warning: {
      default: "bg-warning",
      type: String,
    },
    theme_default: {
      default: "bg-default",
      type: String,
    },
    theme_text: {
      default: "text-white",
      type: String,
    },
  },
  emits: ["status:id"],
};
</script>

<style scoped></style>
