<template>
  <m-editor v-model="code"
                 :read-only="disabled"
                 :language="language"
                 :options="options"
                 :height="height"></m-editor>
</template>

<script>
import MEditor from '@/assets/monaco-editor'
export default {
  components: { MEditor },
  data () {
    return {
      code: '',
      options: {
        fontSize: 12
      }
    }
  },
  props: {
    language: {
      type: String,
      default: 'javascript'
    },
    disabled: Boolean,
    height: {
      type: [String, Number],
      default: 200
    },
    value: [String, Object, Array]
  },
    watch: {
        code (val) {
            this.$emit('input', val);
        },
        value: {
            handler (val) {
                if (['object', 'array'].includes(typeof val)) {
                    this.code = JSON.stringify(val, null, 4);
                } else {
                    this.code = val || '';
                }
            },
            immediate: true,
            deep: true,
        },
    },
}
</script>
