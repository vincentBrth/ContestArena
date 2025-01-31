<template>
  <section class="block fixed inset-x-0 bottom-0 z-10">
    <!-- Progress -->
    <div class="w-full h-1" v-bind:class="{ hidden: progress <= 0 }">
      <div
        class="h-1"
        :class="[theme_progress]"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="{ width: progress + '%' }"
      ></div>
    </div>
    <!-- Navigation tabs -->
    <div class="py-2" :class="theme_bg">
      <ul class="flex justify-center gap-5">
        <li v-for="(item, key) in tabs" v-if="item.active">
          <input
            type="radio"
            :name="key"
            :id="key"
            class="peer hidden w-full"
            :value="key"
            v-model="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
          />

          <label
            :for="key"
            class="flex cursor-pointer select-none text-center h-full w-full"
          >
            <div>
              <div class="flex rounded-full">
                <span
                  class="material-symbols-outlined px-6 py-1 rounded-full"
                  :class="[
                    theme_text,
                    key === modelValue ? 'active' : '',
                    key === modelValue ? theme_active : '',
                  ]"
                >
                  {{ item.icon }}
                </span>
              </div>
              <span
                class="flex justify-center text-xs capitalize"
                :class="theme_text"
              >
                {{ item.name ? item.name : key }}
              </span>
            </div></label
          >
        </li>
      </ul>
    </div>
  </section>
</template>

<script scoped>
export default {
  props: {
    modelValue: {
      required: true,
      type: String,
    },
    tabs: {
      type: Object,
      default: {},
    },
    progress: {
      type: Number,
      default: 0,
    },
    theme_bg: {
      type: String,
      default: "bg-neutral",
    },
    theme_progress: {
      type: String,
      default: "bg-default",
    },
    theme_active: {
      type: String,
      default: "bg-neutral-lightest",
    },
    theme_text: {
      type: String,
      default: "text-black",
    },
  },
  emits: ["update:modelValue"],
};
</script>

<style scoped>
.material-symbols-outlined.active {
  font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
}

.block {
  margin-bottom: constant(
    safe-area-inset-bottom
  ); /* move footer up on iPhone X - iOS 11.0 */
  margin-bottom: env(
    safe-area-inset-bottom
  ); /* move footer up on iPhone X - iOS 11.2 */
}
</style>
