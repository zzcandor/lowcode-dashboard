<template>
    <el-input v-model="val" v-bind="$attrs" :disabled="disabled" @input="changeVal" @blur="blurVal" />
</template>

<script>
export default {
    name: 'NumberInput',
    props: {
        disabled: {},
        value: {},
        int: { // 整数位数
            default: 8
        },
        decimal: { // 小数位数
            default: 2
        },
        isInt: { // 是否是整数
            type: Boolean,
            default: false
        },
        positive: { // 是否是正负数
            type: Boolean,
            default: false
        },
        positive1: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            val: '',
            tempVal: ''
        }
    },
    watch: {
        value: {
            handler(val) {
                if (val !== this.val) {
                    this.val = val
                    this.tempVal = val
                }
            },
            immediate: true,
        }
    },
    methods: {
        changeVal(e) {
            const val = e.toString()
            const str = '^\\d{0,' + this.int + '}(\\.\\d{1,' + this.decimal + '})?$' // 小数
            const reg = new RegExp(str)
            const str2 = '^\\d{0,' + this.int + '}\\.$' // 小数点结尾情况
            const reg2 = new RegExp(str2)
            const str3 = '^\\d{0,' + this.int + '}$' // 整数
            const reg3 = new RegExp(str3)
            if (this.positive && this.val < 0) { // 判断是否小于0
                this.val = this.tempVal
                this.$emit('input', this.val)
                this.$emit('change', this.val)
                return
            }
            if (this.positive1 && this.val > 100) { // 判断是否小于0
                this.val = this.tempVal
                this.$emit('input', this.val)
                this.$emit('change', this.val)
                return
            }
            if ((this.isInt && reg3.test(val)) || (!this.isInt && (reg.test(val) || reg2.test(val)))) {
                this.tempVal = val
            } else {
                this.val = this.tempVal
            }
            this.$emit('input', this.val)
        },
        blurVal() {
            const reg2 = /^\d+.$/
            if (reg2.test(this.value)) {
                this.val = this.val.split('.')[0]
                this.$emit('input', this.value)
            }
        }
    }
}
</script>

<style lang="less" scoped>

</style>
