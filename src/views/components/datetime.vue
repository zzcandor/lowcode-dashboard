<template>
    <div
        ref="main"
        @click="handleClick"
    >
        <p :style="styleName">{{ nowDate }}</p>
    </div>
</template>
<script>
import dayjs from 'dayjs'
export default {
    name: 'Datetime',
    props: {
        item: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            date: new Date()
        }
    },
    computed: {
        config() {
            return this.item.data.config
        },
        nowDate() {
            if (this.config.format === 'day') {
                return '星期' + dayjs().day()
            }
            const format = (this.config.format || 'yyyy-MM-dd hh:mm:ss')
                .replace('dd', 'DD')
                .replace('yyyy', 'YYYY')
            return dayjs(this.date).format(format)
        },
        styleName() {
            return {
                width: '100%',
                height: '100%',
                textAlign: this.config.textAlign,
                lineHeight: (this.config.lineHeight || 30) + 'px',
                textIndent: this.config.textIndent,
                backgroundColor: this.config.backgroundColor,
                fontWeight: this.config.fontWeight || 'normal',
                fontSize: (this.config.fontSize || 30) + 'px',
                color: this.config.color || '#333'
            }
        }
    },
    created() {
        setInterval(() => {
            this.date = new Date()
        }, 1000)
    },
    methods: {
        handleClick() {
            this.clickFormatter && this.clickFormatter({
                data: this.dataChart
            })
        }
    }
}
</script>
