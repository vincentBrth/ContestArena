<template>
  <div class="max-w-4xl pb-8 px-2">
    <!-- Settings -->
    <div class="flex-wrap gap-2 pt-6">
      <h3 class="font-bold">Settings</h3>
      <div v-if="data && data.event && data.event">
        <div class="border rounded-xl px-4 py-4 my-4" :class="theme_border">
          <div class="flex">
            <FormToggle label="enabled" :modelValue="data.settings.enabled" :theme_text="theme_text" :theme_bg="theme_bg"
              @update:modelValue="(v) =>
                $emit('action:update', {
                  endpoint: `/settings/enabled`,
                  value: v,
                  admin: true,
                })
                "></FormToggle>
          </div>
          <div class="inline-flex my-4">
            <FormToggle label="admin propagate" :modelValue="data.settings.propagate" :theme_text="theme_text"
              :theme_bg="theme_bg" @update:modelValue="(v) =>
                $emit('action:update', {
                  endpoint: `/settings/propagate`,
                  value: v,
                  admin: true,
                })
                "></FormToggle>
          </div>
          <FormField :modelValue="data.settings.asset_in_use" label="asset in use" input_type="number" input_min=0
            :required="true" :theme_bg="theme_bg" :theme_text="theme_text" :theme_label="theme_label"
            :theme_border="theme_border" @update:modelValue="(v) =>
              $emit('action:update', {
                endpoint: `/settings/asset_in_use`,
                value: v,
                admin: true,
                numberify: true,
              })
              "></FormField>
          <FormSelect :modelValue="data.settings.theme" label="theme"
            :elements="[{ value: 'linen' }, { value: 'purple' }]" :theme_bg="theme_bg" :theme_text="theme_text"
            :theme_label="theme_label" :theme_border="theme_border" @update:modelValue="(v) =>
              $emit('action:update', {
                endpoint: `/settings/theme`,
                value: v,
                admin: true,
              })
              "></FormSelect>
          <div class="flex-wrap gap-2">
            <div class="flex gap-2">
              <FormField label="name" :modelValue="data.settings.info.name" input_min="3" input_max="15" :required="true"
                :theme_bg="theme_bg" :theme_text="theme_text" :theme_label="theme_text" :theme_border="theme_border"
                @update:modelValue="(v) =>
                  $emit('action:update', {
                    endpoint: `/settings/info/name`,
                    value: v,
                    admin: true,
                  })
                  "></FormField>
              <FormField label="date" input_type="datetime-local" :modelValue="data.settings.info.date" :required="true"
                :theme_bg="theme_bg" :theme_text="theme_text" :theme_label="theme_text" :theme_border="theme_border"
                @update:modelValue="(v) =>
                  $emit('action:update', {
                    endpoint: `/settings/info/date`,
                    value: v,
                    admin: true,
                  })
                  "></FormField>
            </div>
            <div class="flex">
              <FormTextarea label="abstract" :modelValue="data.settings.info.abstract" input_max="100"
                :theme_bg="theme_bg" :theme_text="theme_text" :theme_label="theme_text" :theme_border="theme_border"
                @update:modelValue="(v) =>
                  $emit('action:update', {
                    endpoint: `/settings/info/abstract`,
                    value: v,
                    admin: true,
                  })
                  "></FormTextarea>
            </div>
            <div class="flex">
              <FormField label="message" :modelValue="data.settings.message" input_max="100" :theme_bg="theme_bg"
                :theme_text="theme_text" :theme_label="theme_text" :theme_border="theme_border" @update:modelValue="(v) =>
                  $emit('action:update', {
                    endpoint: `/settings/message`,
                    value: v,
                    admin: true,
                  })
                  "></FormField>
            </div>
            <div class="flex">
              <FormField label="password" :modelValue="data.settings.password" input_type="password" input_max="20"
                :autocomplete="false" :theme_bg="theme_bg" :theme_text="theme_text" :theme_label="theme_text"
                :theme_border="theme_border" @update:modelValue="(v) =>
                  $emit('action:update', {
                    endpoint: `/settings/password`,
                    value: v,
                    admin: true,
                  })
                  "></FormField>
            </div>
          </div>

          <details>
            <summary class="cursor-pointer">Base pool</summary>
            <table class="table-fixed w-full">
              <tbody>
                <tr :class="theme_text">
                  <th scope="col"></th>
                  <th scope="col" class="w-8"></th>
                </tr>
                <tr class="h-14" v-for="(element, key, index) in  data.settings.base_pool "
                  :class="[theme_text, index % 2 ? theme_even : theme_odd]">
                  <td class="text-left text-sm pl-3">
                    <details>
                      <summary class="cursor-pointer relative">
                        {{ key }}


                        <FormButton label="delete" :minimal="true" theme_bg="bg-danger"
                          class="material-symbols-outlined absolute right-8" @action:button="(v) => {
                            const index = JSON.load(JSON.stringify(data.settings.base_pool)).findIndex(element => element.key === key);
                            if (index !== -1) {
                              data.settings.base_pool.splice(index, 1);
                              $emit('action:update', {
                                endpoint: `/settings/base_pool/`,
                                value: data.settings.base_pool,
                                admin: true,
                                confirm: `Are you sure to remove this candidate ${key}?`,
                              });
                            }
                          }"></FormButton>

                        <FormButton class="material-symbols-outlined absolute right-0" label="edit" :minimal="true"
                          @action:button="(v) =>
                            $emit('action:update', {
                              endpoint: `/settings/base_pool/` + key + `/abstract`,
                              value: element.abstract + ` vbe`,
                              admin: true,
                            })
                            "></FormButton>
                      </summary>
                      <table class="table-auto w-full my-2">
                        <tbody>
                          <tr v-for="( value, element_key ) in  element ">
                            <td class="border first-letter:capitalize" :class="[theme_text, theme_border]">
                              {{ element_key }}
                            </td>
                            <td class="border first-letter:capitalize" :class="[theme_text, theme_border]">
                              <a v-if="element_key === 'link'" :href="value" style="text-decoration: underline">{{
                                value
                              }}</a>
                              <span v-else-if="['asset'].includes(element_key)">
                                <img v-for=" asset  in  value " class="bg-clip-content scale-down w-[200px] h-[200px]"
                                  :src="asset" />
                              </span>
                              <img v-else-if="['title_img'].includes(element_key)" class="h-6 w-6" :src="value" />
                              <div class="first-letter:capitalize" v-else>
                                {{ value }}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </details>
                  </td>
                  <td class="text-right text-sm pr-3">
                  </td>
                </tr>
                <tr>
                  <td v-if="!data.settings.base_pool"
                    class="w-full select-none px-2 py-3 text-xs bg-gray-200 text-gray-500">
                    Empty list
                  </td>
                  <td class="text-right text-sm pr-3"></td>
                </tr>
              </tbody>
            </table>
          </details>
        </div>
      </div>
    </div>
    <!-- Rounds -->
    <div class="flex-wrap gap-2 pt-6">
      <div v-if="data && data.event && data.event.rounds" v-for="( round, index ) in data.event.rounds">
        <div class="w-full">
          <h3 class="font-bold">Round {{ index }}</h3>
          <span class="flex justify-end">
            <FormButton label="Remove" theme_bg="bg-danger" :minimal="true" @action:button="(v) =>
              $emit('action:update', {
                endpoint: `/event/rounds`,
                value: data.event.rounds.filter((_, i) => i !== index),
                admin: true,
                confirm: `Are you sure to remove round ${index}?`,
              })
              "></FormButton>
          </span>
        </div>
        <div class="border rounded-xl px-4 py-4 my-4" :class="theme_border">
          <div class="flex">
            <FormToggle label="locked" :modelValue="round.locked" :theme_text="theme_text" :theme_bg="theme_bg"
              @update:modelValue="(v) =>
                $emit('action:update', {
                  endpoint: `/event/rounds/${index}/locked`,
                  value: v,
                  admin: true,
                })
                "></FormToggle>
          </div>
          <div class="flex my-4">
            <FormToggle label="watch" :modelValue="round.watch" :theme_text="theme_text" :theme_bg="theme_bg"
              @update:modelValue="(v) =>
                $emit('action:update', {
                  endpoint: `/event/rounds/${index}/watch`,
                  value: v,
                  admin: true,
                })
                "></FormToggle>
          </div>
          <div class="inline-flex gap-2">
            <FormField label="name" :modelValue="round.name" input_min="3" input_max="10" :required="true"
              :theme_bg="theme_bg" :theme_text="theme_text" :theme_label="theme_text" :theme_border="theme_border"
              @update:modelValue="(v) =>
                $emit('action:update', {
                  endpoint: `/event/rounds/${index}/name`,
                  value: v,
                  admin: true,
                })
                "></FormField>
            <FormField label="max" input_type="number" :modelValue="round.max" :input_min="data &&
              data.event &&
              data.event.rounds &&
              data.event.rounds[index] &&
              data.event.rounds[index].qualified &&
              data.event.rounds[index].qualified.length
              ? data.event.rounds[index].qualified.length.toString()
              : '1'
              " :required="true" :theme_bg="theme_bg" :theme_text="theme_text" :theme_label="theme_text"
              :theme_border="theme_border" @update:modelValue="(v) =>
                $emit('action:update', {
                  endpoint: `/event/rounds/${index}/max`,
                  value: v,
                  admin: true,
                  numberify: true,
                })
                "></FormField>
            <FormField label="points" input_type="number" :modelValue="round.points" input_min="1" :required="true"
              :theme_bg="theme_bg" :theme_text="theme_text" :theme_label="theme_text" :theme_border="theme_border"
              @update:modelValue="(v) =>
                $emit('action:update', {
                  endpoint: `/event/rounds/${index}/points`,
                  value: v,
                  admin: true,
                  numberify: true,
                })
                "></FormField>
          </div>
          <div>
            <details>
              <summary class="cursor-pointer">Pool</summary>

              <div class="flex px-2 py-2">
                <FormList :data="data &&
                  data.event &&
                  data.event.rounds &&
                  data.event.rounds[index] &&
                  data.event.rounds[index].pool
                  ? data.event.rounds[index].pool
                  : []
                  " :pool="filter(
    data && data.settings && data.settings.base_pool
      ? data.settings.base_pool
      : {},
    data &&
      data.event &&
      data.event.rounds &&
      data.event.rounds[index] &&
      data.event.rounds[index].pool
      ? data.event.rounds[index].pool
      : []
  )
    " :theme_bg="theme_bg" :theme_text="theme_text" :theme_border="theme_border" :theme_odd="theme_odd"
                  :theme_even="theme_even" @update:modelValue="(v) =>
                    $emit('action:update', {
                      endpoint: `/event/rounds/${index}/pool`,
                      value: v,
                      admin: true,
                    })
                    "></FormList>
              </div>
            </details>
            <details>
              <summary class="cursor-pointer">Qualified</summary>

              <div class="flex px-2 py-2">
                <FormList :max="round.max" :data="data &&
                  data.event &&
                  data.event.rounds &&
                  data.event.rounds[index] &&
                  data.event.rounds[index].qualified
                  ? data.event.rounds[index].qualified
                  : []
                  " :pool="filter(
    data &&
      data.event &&
      data.event.rounds &&
      data.event.rounds[index] &&
      data.event.rounds[index].pool
      ? data.event.rounds[index].pool
      : [],
    data &&
      data.event &&
      data.event.rounds &&
      data.event.rounds[index] &&
      data.event.rounds[index].qualified
      ? data.event.rounds[index].qualified
      : []
  )
    " :theme_bg="theme_bg" :theme_text="theme_text" :theme_border="theme_border" :theme_odd="theme_odd"
                  :theme_even="theme_even" @update:modelValue="(v) =>
                    $emit('action:update', {
                      endpoint: `/event/rounds/${index}/qualified`,
                      value: v,
                      admin: true,
                    })
                    "></FormList>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-wrap">
      <div class="flex my-2 justify-center">
        <FormButton label="Add round" class="w-full" @action:button="(v) =>
          $emit('action:update', {
            endpoint: `/event/rounds/${data.event.rounds.length}`,
            value: {
              locked: true,
              max: 1,
              name: `Round ${data.event.rounds.length}`,
              points: 1,
              watch: true,
            },
            admin: true,
          })
          "></FormButton>
      </div>
      <div class="flex my-2 justify-center">
        <FormButton label="Delete this event" class="w-full" theme_bg="bg-danger" @action:button="(v) =>
          $emit('action:update', {
            endpoint: `/`,
            value: {},
            admin: true,
            confirm: `Are you sure to remove this event (no recovery will be possible) ?`,
          })
          "></FormButton>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    theme_text: {
      default: "text-black",
      type: String,
    },
    theme_bg: {
      default: "bg-white",
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
    theme_even: {
      default: "bg-neutral-lightest",
      type: String,
    },
    theme_odd: {
      default: "bg-neutral",
      type: String,
    },
  },
  methods: {
    filter(data_1, data_2) {
      let ret = [];
      if (data_1) {
        for (const [key, value] of Object.entries(data_1)) {
          let k = value;
          if (typeof value === "object") {
            k = key;
          }
          if (!data_2.includes(k)) {
            ret.push({ title: k, value: k });
          }
        }
      }
      return ret;
    },
    urlify(url) {
      return `<a href='${url}' style='text-decoration: underline;'>${url}</a>`;
    },
  },
  emits: ["action:update"],
};
</script>
