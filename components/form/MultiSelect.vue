<template>
  <div>
    <!-- https://vue-multiselect.js.org/#sub-getting-started -->
    <multiselect class="max-w-lg" v-model="val" :options="options" :multiple="true" group-values="libs" group-label="language"
      :group-select="true" placeholder="No filter" track-by="name" label="name"><span slot="noResult">No elements
        found.</span></multiselect>
    <!-- <pre class="language-json"><code>{{ modelValue }}</code></pre> -->
  </div>
</template>

<script scoped>
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      val: {},
    };
  },
  created() {
    this.val = this.modelValue;
  },
  props: {
    modelValue: {
      type: Array,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  methods: {
    // addTag(newTag) {
    //   const tag = {
    //     name: newTag,
    //     code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
    //   };
    //   this.options.push(tag);
    //   this.value.push(tag);
    // },
  },
  watch: {
    val(new_val, old_val) {
      this.$emit("update:modelValue", new_val);
    },
  },
};
</script>

<style>
.multiselect__tag {
  background-color: #556167;
  color: white;
}

.multiselect__tag-icon,
.multiselect__tag-icon::after {
  color: #e8e6e6;
}

.multiselect__tag-icon:focus,
.multiselect__tag-icon:hover {
  background-color: #353535;
}

.multiselect__option--highlight {
  background: #41b883;
  color: white;
}
</style>
