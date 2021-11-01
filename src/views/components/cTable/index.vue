<template>
    <div :ref="ref" class="dv-scroll-board">
        <div v-if="header.length && mergedConfig" class="header" :style="`background-color: ${mergedConfig.headerBGC};`">
            <div
                v-for="(headerItem, i) in header"
                :key="`${headerItem}${i}`"
                class="header-item"
                :style="`
          height: ${mergedConfig.headerHeight}px;
          line-height: ${mergedConfig.headerHeight}px;
          width: ${widths[i]}px;
        `"
                :align="aligns[i]"
                v-html="headerItem"
            />
        </div>

        <div
            v-if="mergedConfig"
            class="rows"
            :style="`height: ${height - (header.length ? mergedConfig.headerHeight : 0)}px;`"
        >
            <div
                v-for="(row, ri) in rows"
                :key="`${row.toString()}${row.scroll}`"
                class="row-item"
                :style="`
          height: ${heights[ri]}px;
          line-height: ${heights[ri]}px;
          background-color: ${mergedConfig[row.rowIndex % 2 === 0 ? 'evenRowBGC' : 'oddRowBGC']};
        `"
            >
                <div
                    v-for="(ceil, ci) in row.ceils"
                    :key="`${ceil}${ri}${ci}`"
                    class="ceil"
                    :style="`width: ${widths[ci]}px;`"
                    :align="aligns[ci]"
                    @click="emitEvent('click', ri, ci, row, ceil)"
                    @mouseenter="handleHover(true, ri, ci, row, ceil)"
                    @mouseleave="handleHover(false)"
                    v-html="ceil"
                />

            </div>
        </div>
    </div>
</template>

<script>
import autoResize from './autoResize'

import { deepMerge, deepClone } from './utils'

export default {
    name: 'RsScrollBoard',
    mixins: [autoResize],
    props: {
        item: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            ref: 'scroll-board',

            defaultConfig: {
                /**
                 * @description Board header
                 * @type {Array<String>}
                 * @default header = []
                 * @example header = ['column1', 'column2', 'column3']
                 */
                header: [],
                /**
                 * @description Board data
                 * @type {Array<Array>}
                 * @default data = []
                 */
                data: [],
                /**
                 * @description Row num
                 * @type {Number}
                 * @default rowNum = 5
                 */
                rowNum: 5,
                /**
                 * @description Header background color
                 * @type {String}
                 * @default headerBGC = '#00BAFF'
                 */
                headerBGC: '#00BAFF',
                /**
                 * @description Odd row background color
                 * @type {String}
                 * @default oddRowBGC = '#003B51'
                 */
                oddRowBGC: '#003B51',
                /**
                 * @description Even row background color
                 * @type {String}
                 * @default evenRowBGC = '#003B51'
                 */
                evenRowBGC: '#0A2732',
                /**
                 * @description Scroll wait time
                 * @type {Number}
                 * @default waitTime = 2000
                 */
                waitTime: 2000,
                /**
                 * @description Header height
                 * @type {Number}
                 * @default headerHeight = 35
                 */
                headerHeight: 35,
                /**
                 * @description Column width
                 * @type {Array<Number>}
                 * @default columnWidth = []
                 */
                columnWidth: [],
                /**
                 * @description Column align
                 * @type {Array<String>}
                 * @default align = []
                 * @example align = ['left', 'center', 'right']
                 */
                align: [],
                /**
                 * @description Show index
                 * @type {Boolean}
                 * @default index = false
                 */
                index: false,
                /**
                 * @description index Header
                 * @type {String}
                 * @default indexHeader = '#'
                 */
                indexHeader: '#',
                /**
                 * @description Carousel type
                 * @type {String}
                 * @default carousel = 'single'
                 * @example carousel = 'single' | 'page'
                 */
                carousel: 'single',
                /**
                 * @description Pause scroll when mouse hovered
                 * @type {Boolean}
                 * @default hoverPause = true
                 * @example hoverPause = true | false
                 */
                hoverPause: true
            },

            mergedConfig: null,

            header: [],

            rowsData: [],

            rows: [],

            widths: [],

            heights: [],

            avgHeight: 0,

            aligns: [],

            animationIndex: 0,

            animationHandler: '',

            updater: 0,

            needCalc: false
        }
    },
    watch: {
        'item.data.datacon': {
            handler: function(val, oldVal) {
                const { stopAnimation, calcData } = this
                stopAnimation()
                this.animationIndex = 0
                calcData()
            },
            deep: true,
            immediate: true
        }
    },
    destroyed() {
        const { stopAnimation } = this

        stopAnimation()
    },
    methods: {
        handleHover(enter, ri, ci, row, ceil) {
            const { mergedConfig, emitEvent, stopAnimation, animation } = this

            if (enter) emitEvent('mouseover', ri, ci, row, ceil)
            if (!mergedConfig.hoverPause) return

            if (enter) {
                stopAnimation()
            } else {
                animation(true)
            }
        },
        afterAutoResizeMixinInit() {
            const { calcData } = this

            calcData()
        },
        onResize() {
            const { mergedConfig, calcWidths, calcHeights } = this

            if (!mergedConfig) return

            calcWidths()

            calcHeights()
        },
        calcData() {
            const { mergeConfig, calcHeaderData, calcRowsData } = this

            mergeConfig()

            calcHeaderData()

            calcRowsData()

            const { calcWidths, calcHeights, calcAligns } = this

            calcWidths()

            calcHeights()

            calcAligns()

            const { animation } = this

            animation(true)
        },
        mergeConfig() {
            const { defaultConfig } = this
            const config = this.item.data.datacon
            this.mergedConfig = deepMerge(deepClone(defaultConfig, true), config || {})
        },
        calcHeaderData() {
            const { indexHeader, index } = this.mergedConfig
            let header = this.mergedConfig.header
            if (!header.length) {
                this.header = []

                return
            }

            header = [...header]

            if (index) header.unshift(indexHeader)

            this.header = header
        },
        calcRowsData() {
            const { index, headerBGC, rowNum } = this.mergedConfig
            let data = this.mergedConfig.data
            if (index) {
                data = data.map((row, i) => {
                    row = [...row]

                    const indexTag = `<span class="index" style="background-color: ${headerBGC};">${i + 1}</span>`

                    row.unshift(indexTag)

                    return row
                })
            }

            data = data.map((ceils, i) => ({ ceils, rowIndex: i }))

            const rowLength = data.length

            if (rowLength > rowNum && rowLength < 2 * rowNum) {
                data = [...data, ...data]
            }

            data = data.map((d, i) => ({ ...d, scroll: i }))

            this.rowsData = data
            this.rows = data
        },
        calcWidths() {
            const { width, mergedConfig, rowsData } = this

            const { columnWidth, header } = mergedConfig

            const usedWidth = columnWidth.reduce((all, w) => all + w, 0)

            let columnNum = 0
            if (rowsData[0]) {
                columnNum = rowsData[0].ceils.length
            } else if (header.length) {
                columnNum = header.length
            }

            const avgWidth = (width - usedWidth) / (columnNum - columnWidth.length)

            const widths = new Array(columnNum).fill(avgWidth)

            this.widths = deepMerge(widths, columnWidth)
        },
        calcHeights(onresize = false) {
            const { height, mergedConfig, header } = this

            const { headerHeight, rowNum, data } = mergedConfig

            let allHeight = height

            if (header.length) allHeight -= headerHeight

            const avgHeight = allHeight / rowNum

            this.avgHeight = avgHeight

            if (!onresize) this.heights = new Array(data.length).fill(avgHeight)
        },
        calcAligns() {
            const { header, mergedConfig } = this

            const columnNum = header.length

            const aligns = new Array(columnNum).fill('left')

            const { align } = mergedConfig

            this.aligns = deepMerge(aligns, align)
        },
        async animation(start = false) {
            const { needCalc, calcHeights, calcRowsData } = this

            if (needCalc) {
                calcRowsData()
                calcHeights()
                this.needCalc = false
            }

            const { avgHeight, mergedConfig, rowsData, animation, updater } = this
            let animationIndex = this.animationIndex
            const { waitTime, carousel, rowNum } = mergedConfig

            const rowLength = rowsData.length

            if (rowNum >= rowLength) return

            if (start) {
                await new Promise(resolve => setTimeout(resolve, waitTime))
                if (updater !== this.updater) return
            }

            const animationNum = carousel === 'single' ? 1 : rowNum

            const rows = rowsData.slice(animationIndex)
            rows.push(...rowsData.slice(0, animationIndex))

            this.rows = rows.slice(0, carousel === 'page' ? rowNum * 2 : rowNum + 1)
            this.heights = new Array(rowLength).fill(avgHeight)

            await new Promise(resolve => setTimeout(resolve, 300))
            if (updater !== this.updater) return

            this.heights.splice(0, animationNum, ...new Array(animationNum).fill(0))

            animationIndex += animationNum

            const back = animationIndex - rowLength
            if (back >= 0) animationIndex = back

            this.animationIndex = animationIndex
            this.animationHandler = setTimeout(animation, waitTime - 300)
        },
        stopAnimation() {
            const { animationHandler, updater } = this

            this.updater = (updater + 1) % 999999

            if (!animationHandler) return

            clearTimeout(animationHandler)
        },
        emitEvent(type, ri, ci, row, ceil) {
            const { ceils, rowIndex } = row

            this.$emit(type, {
                row: ceils,
                ceil,
                rowIndex,
                columnIndex: ci
            })
        },
        updateRows(rows, animationIndex) {
            const { mergedConfig, animationHandler, animation } = this

            this.mergedConfig = {
                ...mergedConfig,
                data: [...rows]
            }

            this.needCalc = true

            if (typeof animationIndex === 'number') this.animationIndex = animationIndex
            if (!animationHandler) animation(true)
        }
    }
}
</script>

<style lang="scss" scoped>
.dv-scroll-board {
    position: relative;
    width: 100%;
    height: 100%;
    color: #fff;

    .text {
        padding: 0 10px;
        box-sizing: border-box;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .header {
        display: flex;
        flex-direction: row;
        font-size: 15px;

        .header-item {
            @extend .text;
            transition: all 0.3s;
        }
    }

    .rows {
        overflow: hidden;

        .row-item {
            display: flex;
            font-size: 14px;
            transition: all 0.3s;
        }

        .ceil {
            @extend .text;
        }

        .index {
            border-radius: 3px;
            padding: 0px 3px;
        }
    }
}
</style>
