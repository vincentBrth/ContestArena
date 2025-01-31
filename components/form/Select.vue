<template>
  <label class="block mb-5">
    <span
      v-if="label !== ''"
      class="relative px-1 top-2.5 left-4 w-auto capitalize font-normal text-xs"
      :class="[theme_bg, theme_label]"
      >{{ label }}</span
    >
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      class="w-full select-none px-2 py-3 bg-inherit border focus:border-transparent rounded-md text-sm disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      :class="[theme_text, theme_border, disabled ? null : 'cursor-pointer']"
      :disabled="disabled || elements.length == 0"
    >
      <option v-for="elem in elements" :key="elem.value" :value="elem.value">
        {{ elem.title ? elem.title : elem.value }}
      </option>
    </select>
  </label>
</template>

<script scoped>
export default {
  props: {
    modelValue: {
      type: String,
    },
    elements: {
      default: [
        {
          title: "",
          value: "",
        },
      ],
      required: true,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    label: {
      default: "",
      type: String,
    },
    theme_bg: {
      default: "bg-white",
      type: String,
    },
    theme_text: {
      default: "text-black",
      type: String,
    },
    theme_label: {
      default: "text-black",
      type: String,
    },
    theme_border: {
      default: "border-neutral",
      type: String,
    },
  },
  emits: ["update:modelValue"],
};
</script>
