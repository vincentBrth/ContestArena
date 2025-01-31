<template>
  <div class="flex justify-center px-6 py-2">
    <div class="flex-wrap overflow-x-auto">
      <ul class="flex">
        <li
          v-for="(value, index) in _tabs"
          v-if="value.active"
        >
          <input
            type="radio"
            :name="value.name ? value.name : value.key"
            :id="value.key"
            class="peer w-full hidden"
            :disabled="value.disabled"
            :value="value.key"
            v-model="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
          />

          <label
            :for="value.key"
            class="block px-2 min-w-fit w-20 text-center select-none leading-10 h-full first-letter:capitalize"
            :class="[
              theme_text,
              value.disabled
                ? 'cursor-not-allowed'
                : 'cursor-pointer',
              value.key === modelValue
                ? theme_active
                : value.disabled
                ? 'bg-gray-200'
                : theme_inactive,
              index === 0 ? 'rounded-l-full' : '',
              index === Object.keys(_tabs).length - 1 ? 'rounded-r-full' : '',
            ]"
          >
            {{ value.name ? value.name : value.key }}
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script scoped>
export default {
  props: {
    modelValue: {
      required: true,
      type: String,
    },
    tabs: {
      type: [Object, Map],
      default: {},
    },
    theme_active: {
      type: String,
      default: "bg-neutral-darkest",
    },
    theme_inactive: {
      type: String,
      default: "bg-neutral",
    },
    theme_text: {
      type: String,
      default: "text-white",
    },
  },
  computed: {
    _tabs: {
      get() {
        let tabs = [];
        if (this.tabs instanceof Map) {
          for (const [key, value] of this.tabs.entries()) {
            value["key"] = key;
            value["disabled"] = "disabled" in value ? value["disabled"] : false;
          value["active"] = "active" in value ? value["active"] : true;
            tabs.push(value);
          }
        } else {
          for (const [key, value] of Object.entries(this.tabs)) {
            value["key"] = key
            value["disabled"] = "disabled" in value ? value["disabled"] : false;
            value["active"] = "active" in value ? value["active"] : true;
            tabs.push(value);
          }
        }
        tabs = tabs.filter(item => item.active === true);

        return tabs;
      },
    },
  },
  emits: ["update:modelValue"],
};
</script>

<style scoped>
.material-symbols-outlined.active {
  font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
}
</style>
