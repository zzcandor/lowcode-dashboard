<template>
    <div>
        <!-- 纯文字 -->
        <div v-if="!item.data.datacon.openlink" :style="styleName">
            {{ item.data.datacon.text + "11" }}
        </div>
        <a
            v-if="item.data.datacon.openlink"
            ref="text"
            :href="item.data.datacon.linkHref"
            :style="[styleName,styleSizeName]"
            :target="item.data.datacon.linkTarget"
        >{{ item.data.datacon.text }}</a>
    </div>
</template>

<script>
export default {
    name: 'Ctextcontainer',
    props: {
        item: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            check: '',
            date: new Date(),
            left: 0
        }
    },
    computed: {
        scroll() {
            return this.item.data.datacon.scroll || false
        },
        step() {
            return 5
        },
        speed() {
            return this.item.data.datacon.scrollSpeed || 100
        },
        textWidth() {
            const textLen = (this.item.data.datacon.text || '').length
            return textLen * this.item.data.datacon.fontSize
        },
        styleName() {
            return {
                width: this.scroll ? this.textWidth + 'px' : 'auto',
                transform: 'translateX(' + this.left + 'px)',
                fontFamily: this.item.data.datacon.fontFamily,
                fontWeight: this.item.data.datacon.bold ? 'bold' : 'normal',
                fontStyle: this.item.data.datacon.italic ? 'italic' : 'normal',
                color: this.item.data.datacon.color,
                fontSize: this.item.data.datacon.fontSize + 'px',
                textAlign: this.item.data.datacon.textAlign,
                lineHeight: (this.item.data.datacon.lineHeight || 30) + 'px',
                // backgroundColor: this.item.data.datacon.backgroundColor,
                textDecoration: 'none',
                textStroke: this.item.data.datacon.stroke
                    ? this.item.data.datacon.strokeSize +
                      'px ' +
                      this.item.data.datacon.strokeColor
                    : '0',
                textShadow: this.item.data.datacon.shadow
                    ? '5px 5px ' +
                      this.item.data.datacon.shadowBlur +
                      'px ' +
                      this.item.data.datacon.shadowColor
                    : 'none'
            }
        },
        styleSizeName() {
            return {
                width: this.item.w + 'px',
                height: this.item.h + 'px',
                display: 'block'
            }
        }
    },
    watch: {
        scroll() {
            this.move()
        },
        speed() {
            this.move()
        }
    },
    created() {
        setInterval(() => {
            this.date = new Date()
        }, 1000)
        if (this.scroll) {
            this.move()
        }
    },
    methods: {
        move() {
            clearInterval(this.check)
            if (this.scroll) {
                this.check = setInterval(() => {
                    if (this.left < -this.textWidth) {
                        this.left = this.item.w
                    }
                    this.left = this.left - this.step
                }, this.speed)
            } else {
                this.left = 0
            }
        }
    }
}
</script>

<style scoped lang="scss">
.textcontainer {
    word-wrap: break-word;
}
</style>
