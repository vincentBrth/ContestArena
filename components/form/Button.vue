<template>
  <input
    :type="type"
    :value="label"
    :disabled="disabled"
    class="disabled:bg-gray-200 px-1 disabled:text-gray-500 rounded-full max-w-lg justify-center capitalize"
    :class="[
      theme_bg,
      theme_text,
      disabled ? null : 'select-none cursor-pointer',
      minimal ? 'text-xs' : 'py-3',
    ]"
    @click="$emit('action:button')"
  />
</template>

<script scoped>
export default {
  props: {
    type: {
      default: "button",
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    label: {
      required: true,
      type: String,
    },
    minimal: {
      default: false,
      type: Boolean,
    },
    theme_bg: {
      default: "bg-paris-darkest",
      type: String,
    },
    theme_text: {
      default: "text-white",
      type: String,
    },
    emits: ["action:button"],
  },
};
</script>
