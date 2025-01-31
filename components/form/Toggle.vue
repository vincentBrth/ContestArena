<template>
  <label
    class="relative inline-flex items-center"
    v-bind:class="{ 'select-none cursor-pointer': disabled == false }"
  >
    <input
      type="checkbox"
      class="sr-only peer"
      :checked="modelValue"
      :disabled="disabled"
      @input="$emit('update:modelValue', $event.target.checked)"
    />
    <div
      class="w-11 h-6 peer-focus:outline-none peer-focus:ring-2 peer-focus:blue-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
      :class="[disabled ? 'bg-gray-400' : modelValue ? theme_bg : 'bg-gray-200']"
    ></div>
    <span
      class="ml-3 text-sm"
      :class="[disabled ? 'text-gray-400' : theme_text]"
      >{{ label }}</span
    >
  </label>
</template>

<script scoped>
export default {
  props: {
    modelValue: {
      required: true,
      type: Boolean,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    label: {
      required: true,
      type: String,
    },
    theme_text: {
      default: "text-black",
      type: String,
    },
    theme_bg: {
      default: "bg-blue-600",
      type: String,
    },
  },
  emits: ["update:modelValue"],
};
</script>
