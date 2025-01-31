<template>
  <div class="relative w-full">
    <!-- hide/show input field button -->
    <div
      v-if="input_type == 'password' && disabled == false"
      class="absolute flex right-0 mt-1.5 items-center mx-2 h-full"
    >
      <span
        @click="passwordToggle"
        class="px-2 block select-none cursor-pointer"
      >
        <span class="material-symbols-outlined"> {{ password_icon }} </span>
      </span>
    </div>
    <!-- input field -->
    <label class="block">
      <span
        class="relative px-2 top-2.5 left-4 w-auto capitalize font-normal text-xs"
        :class="[label ? theme_bg : null, theme_label]"
        >{{ label }}</span
      >
      <input
        :autocomplete="autocomplete ? null : 'new-password'"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :minlength="
          ['number', 'datetime-local'].includes(input_type) ? null : input_min
        "
        :maxlength="
          ['number', 'datetime-local'].includes(input_type) ? null : input_max
        "
        :min="
          ['number', 'datetime-local'].includes(input_type) ? input_min : null
        "
        :max="
          ['number', 'datetime-local'].includes(input_type) ? input_max : null
        "
        :disabled="disabled ? true : null"
        :required="required ? true : null"
        class="px-2 py-3 w-full bg-inherit border focus:border-transparent rounded-md text-sm focus:outline-none focus:ring-2 disabled:bg-gray-200 focus:ring-blue-500 first-letter:invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:border-pink-700 peer"
        :class="[theme_text, theme_border]"
      />
      <p
        class="text-xs m-1 text-pink-700 invisible first-letter:capitalize peer-invalid:visible"
      >
        {{ error_msg }}
      </p>
    </label>
  </div>
</template>

<script scoped>
export default {
  props: {
    modelValue: {
      required: true,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    label: {
      type: String,
    },
    input_type: {
      default: "text",
      type: String,
    },
    input_min: {
      default: "0",
      type: String,
    },
    input_max: {
      default: "50",
      type: String,
    },
    custom_error: {
      default: "",
      type: String,
    },
    required: {
      default: false,
      type: Boolean,
    },
    autocomplete: {
      default: true,
      type: Boolean,
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
  data() {
    return {
      password_type: "password",
      password_icon: "visibility_off",
    };
  },
  computed: {
    error_msg: {
      get() {
        let msg = "";
        if (this.custom_error.length > 0) {
          msg = this.custom_error;
        } else if (this.input_type == "email") {
          msg = "please provide a valid email";
        } else if (this.modelValue.length < this.input_min) {
          msg = "cannot be less than " + this.input_min + " characters";
        } else {
          msg = "invalid";
        }
        return msg;
      },
    },
    type: {
      get() {
        return this.input_type == "password"
          ? this.password_type
          : this.input_type;
      },
    },
  },
  methods: {
    passwordToggle() {
      if (this.password_type === "password") {
        this.password_type = "text";
        this.password_icon = "visibility";
      } else {
        this.password_type = "password";
        this.password_icon = "visibility_off";
      }
    },
  },
};
</script>
