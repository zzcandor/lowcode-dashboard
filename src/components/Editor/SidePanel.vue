<template>
    <div class="panel">
        <div v-if="panelKey === 'layers'" class="title">
            <span>图层 ({{ chartData.elements.length }})</span>
        </div>
        <div v-else-if="panelKey !== ''" class="title">
            <span>{{ componentList[panelKey].name }} ({{
                componentList[panelKey].children.length
            }})
            </span>
        </div>
        <div v-if="panelKey === 'layers'" class="layer-list">
            <draggable
                v-model="chartData.elements"
                ghost-class="ghost"
                :sort="true"
                @start="handleLayerListDragStart"
                @end="handleLayerListDragEnd"
            >
                <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                    <div
                        v-for="(item, index) in chartData.elements"
                        :key="item.name"
                        class="list-item"
                        :class="{ active: index === $parent.$parent.currentElementIndex }"
                        @click="$store.commit('setActiveComponentByIndex', index)"
                    >
                        <div class="name">{{ item.name }}</div>
                        <i
                            class="el-icon-delete icon"
                            @click="$store.commit('deleteComponent', index)"
                        />
                    </div>
                </transition-group>
            </draggable>
        </div>
        <div v-else-if="panelKey !== ''" class="component-list">
            <draggable
                v-model="componentList[panelKey].children"
                :sort="false"
                class="drawing-chart-board"
                :group="{
                    name: 'componentsGroup',
                    pull: 'clone',
                    put: false
                }"
                @clone="cloneComponent"
            >
                <div
                    v-for="(item, index) in componentList[panelKey].children"
                    :key="index"
                    class="list-item"
                    @click="$store.dispatch('handleAddComponentFromIcon', item.id)"
                >
                    <div class="img-wrapper"><img :src="item.img" /></div>
                    <div class="name">{{ item.name }}</div>
                </div>
            </draggable>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
    components: {
        draggable,
    },
    // eslint-disable-next-line vue/require-prop-types
    props: ['panelKey'],
    data() {
        return {
            drag: false,
            componentList: {
                chart: {
                    name: '图表',
                    children: [
                        {
                            id: 'line',
                            name: '折线图',
                            img: require('@/assets/img/charts/line.png'),
                        },
                        {
                            id: 'histogram',
                            name: '柱状图',
                            img: require('@/assets/img/charts/histogram.png'),
                        },
                        {
                            id: 'bar',
                            name: '条形图',
                            img: require('@/assets/img/charts/bar.png'),
                        },
                        {
                            id: 'pie',
                            name: '饼图',
                            img: require('@/assets/img/charts/pie.png'),
                        },
                        {
                            id: 'ring',
                            name: '环状图',
                            img: require('@/assets/img/charts/ring.png'),
                        },
                        {
                            id: 'funnel',
                            name: '漏斗图',
                            img: require('@/assets/img/charts/funnel.png'),
                        },
                        {
                            id: 'radar',
                            name: '雷达图',
                            img: require('@/assets/img/charts/radar.png'),
                        },
                        // {
                        //   id: "map-world",
                        //   name: "世界地图",
                        //   img: require("@/assets/img/charts/map-world.png")
                        // },
                        {
                            id: 'map',
                            name: '中国地图',
                            img: require('@/assets/img/charts/map-china.png'),
                        },
                        // {
                        //   id: "sankey",
                        //   name: "桑基图",
                        //   img: require("@/assets/img/charts/sankey.png")
                        // },
                        // {
                        //   id: "scatter",
                        //   name: "散点图",
                        //   img: require("@/assets/img/charts/scatter.png")
                        // },
                        // {
                        //   id: "candle",
                        //   name: "K线图",
                        //   img: require("@/assets/img/charts/candle.png")
                        // },
                        {
                            id: 'gauge',
                            name: '仪表盘',
                            img: require('@/assets/img/charts/gauge.png')
                        },
                        {
                            id: 'liquidfill',
                            name: '水球图',
                            img: require('@/assets/img/charts/liquidfill.png'),
                        },
                        // {
                        //   id: "wordcloud",
                        //   name: "词云图",
                        //   img: require("@/assets/img/charts/wordcloud.png")
                        // }
                    ],
                },
                text: {
                    name: '文本',
                    children: [
                        {
                            id: 'text',
                            name: '文本',
                            img: require('@/assets/img/charts/text.png'),
                        },
                        {
                            id: 'datetime',
                            name: '实时时间',
                            img: require('@/assets/img/temperature.png'),
                        },
                    ],
                },
                picture: {
                    name: '图片',
                    children: [
                        {
                            id: 'image',
                            name: '图片',
                            img: require('@/assets/img/charts/image.png'),
                        },
                    ],
                },
                tools: {
                    name: '组件',
                    children: [
                        {
                            id: 'border',
                            name: '边框',
                            img: require('@/assets/img/charts/border.png'),
                        },
                        {
                            id: 'mask',
                            name: '蒙板',
                            img: require('@/assets/img/mask/mask-icon.png'),
                        },
                        {
                            id: 'weatherTime',
                            name: '天气时间',
                            img: require('@/assets/img/temperature.png'),
                        },
                        {
                            id: 'table',
                            name: '表格',
                            img: require('@/assets/img/temperature.png'),
                        },
                    ],
                },
            },
            layerList: [],
        }
    },
    computed: {
        chartData() {
            return this.$parent.chartData
        },
    },
    methods: {
        handleLayerListDragStart(e) {
            this.drag = true
            this.$store.commit('setActiveComponentByIndex', e.oldIndex)
        },
        handleLayerListDragEnd(e) {
            this.drag = false
            this.$store.commit('setActiveComponentByIndex', e.newIndex)
        },
        cloneComponent(origin) {
            const list = this.componentList[this.panelKey].children
            const item = list[origin.oldIndex]
            this.$store.dispatch('handleAddComponentFromIcon', item.id)
        },

    },
}
</script>

<style lang="scss" scoped>
.panel {
  height: 100%;
  width: 250px;
  display: flex;
  flex-direction: column;
  background: #191c21;
  box-shadow: 4px 0 4px #00000005;
}
.title {
  color: #999999;
  padding: 10px 16px 16px;
}
.component-list {
  flex: 1;
  padding: 0 10px 0 16px;
  overflow-y: scroll;
  justify-content: space-between;

  &::-webkit-scrollbar {
    // display: block;
    width: 4px;
    height: 6px;
    // background: #000;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #3a4659;
    border: none;
    width: 4px;
    height: 4px;
  }

  .list-item {
    display: inline-block;
    width: 80px;
    background: rgba(64, 160, 255, 0.06);
    border: 1px solid rgba(64, 160, 255, 0.1);
    margin-right: 10px;
    margin-bottom: 12px;
    opacity: 0.6;
    transition: opacity, background 0.3s ease;
    text-align: center;
    padding: 5px 0;

    &:hover {
      cursor: pointer;
      opacity: 0.8;
      background: rgba(64, 160, 255, 0.1);
      border: 1px solid #409eff;
      .name {
        color: #666666;
      }
    }

    .img-wrapper {
      display: flex;
      width: 100%;
      height: 60px;
      align-items: center;
      justify-content: center;
      img {
        height: 54px;
      }
    }

    .name {
      height: 20px;
      line-height: 20px;
      font-size: 13px;
      color: #777777;
    }
  }
}

.flip-list-move {
  transition: transform 0.5s;
}

.ghost {
  opacity: 0.3;
  background: #c8ebfb;
}

.layer-list {
  flex: 1;
  padding: 0;
  overflow: scroll;

  .list-item {
    display: flex;
    align-items: center;
    height: 48px;
    width: 100%;
    transition: background 0.3s ease;
    border-top: 1px solid rgba(0, 0, 0, 0.03);
    border-bottom: 1px solid rgba(0, 0, 0, 0.03);
    border-right: 6px solid transparent;
    margin-bottom: -1px;
    padding: 0 16px;
    box-sizing: border-box;

    &.active {
      background: rgba(64, 160, 255, 0.06);
      border-right: 6px solid #409eff7d;
    }

    &:hover {
      opacity: 1;
      background: rgba(64, 160, 255, 0.06);

      .icon {
        opacity: 1;
      }
    }

    .name {
      flex: 1;
      color: #777777;
    }

    .icon {
      float: right;
      color: #999999;
      font-size: 14px;
      opacity: 0;
      transition: opacity 0.3s ease;

      &:hover {
        color: #409eff;
        cursor: pointer;
      }
    }
  }
}
</style>
