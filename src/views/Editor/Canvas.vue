<template>
    <div>
        <el-dialog
            title="发布"
            :visible.sync="$parent.publishPopVisible"
            width="50%"
        >
            <div style="margin-bottom: 16px">发布成功！当前图表的公开链接为：</div>
            <el-input v-model="publicUrl" readonly="readonly" /><span slot="footer">
                <el-button
                    type="primary"
                    @click="$parent.publishPopVisible = false"
                >确 定</el-button></span>
        </el-dialog>
        <div
            class="edit-view"
            tabindex="0"
            @keydown.space.prevent="handleSpaceDown"
            @keyup.space.prevent="handleSpaceUp"
            @click.self="handleActivated(-1)"
        >
            <vue-ruler-tool
                :content-layout="{ left: 250,top: 50 }"
                :is-scale-revise="true"
                :v-model="presetLine"
                :position="'absolute'"
            >
                <vue-draggable-resizable
                    :style="wrapStyle"
                    :x="100"
                    :y="50"
                    :w="chartData.w"
                    :h="chartData.h"
                    class-name="screen-box"
                    class-name-draggable="screen-box-draggable"
                    :draggable="screenDraggable"
                    :resizable="false"
                    group="componentsGroup"
                >
                    <div
                        ref="screen"
                        class="screen"
                        :style="screenStyle"
                        @click.self="handleActivated(-1)"
                    >
                        <draggable
                            :animation="340"
                            style="width:100%;height:100%"
                            group="componentsGroup"
                        >
                            <vue-drag-resize
                                v-for="(item, index) in chartData.elements"
                                :key="index"
                                :is-active="item.active &amp;&amp; !$parent.preview"
                                :parent-scale-x="scale"
                                :parent-scale-y="scale"
                                :x="item.x"
                                :y="item.y"
                                :w="item.w"
                                :h="item.h"
                                :parent-limitation="true"
                                :parent-w="chartData.w"
                                :parent-h="chartData.h"
                                :aspect-ratio="false"
                                :minw="20"
                                :minh="20"
                                :z="chartData.elements.length - index"
                                :is-draggable="!$parent.preview"
                                :is-resizable="!$parent.preview"
                                @activated="handleActivated(index)"
                                @resizing="handleResize(item, arguments[0])"
                                @dragging="handleDrag(item, arguments[0])"
                            >
                                <div
                                    v-if="item.data.type === 'chart'"
                                    class="filler"
                                    :style="{
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: item.bgcolor,
                                    }"
                                >
                                    <ve-map
                                        v-if="item.data.settings.type === 'map'"
                                        :width="item.w + 'px'"
                                        :height="item.h + 'px'"
                                        :data="item.data.generated"
                                        :settings="item.data.settings"
                                        @ready-once="generateData(item)"
                                    />
                                    <ve-gauge
                                        v-if="item.data.settings.type === 'gauge'"
                                        :width="item.w + 'px'"
                                        :height="item.h + 'px'"
                                        :data="item.data.generated"
                                        :settings="item.data.settings"
                                        @ready-once="generateData(item)"
                                    />
                                    <ve-liquidfill
                                        v-else-if="item.data.settings.type === 'liquidfill'"
                                        :width="item.w + 'px'"
                                        :height="item.h + 'px'"
                                        :data="item.data.generated"
                                        @ready-once="generateData(item)"
                                    />
                                    <ve-chart
                                        v-else
                                        :width="item.w + 'px'"
                                        :height="item.h + 'px'"
                                        :data="item.data.generated"
                                        :settings="item.data.settings"
                                        @ready-once="generateData(item)"
                                    />
                                </div>
                                <div
                                    v-if="item.data.type === 'text'"
                                    class="filler"
                                    :style="{
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: item.bgcolor,
                                    }"
                                >
                                    <div
                                        class="textcontainer"
                                        :style="{
                                            fontFamily: item.data.datacon.fontFamily,
                                            fontWeight: item.data.datacon.bold ? 'bold' : 'normal',
                                            fontStyle: item.data.datacon.italic ? 'italic' : 'normal',
                                            color: item.data.datacon.color,
                                            fontSize: item.data.datacon.fontSize + 'px',
                                            textStroke: item.data.datacon.stroke
                                                ? item.data.datacon.strokeSize +
                                                    'px ' +
                                                    item.data.datacon.strokeColor
                                                : '0',
                                            textShadow: item.data.datacon.shadow
                                                ? '5px 5px ' +
                                                    item.data.datacon.shadowBlur +
                                                    'px ' +
                                                    item.data.datacon.shadowColor
                                                : 'none',
                                        }"
                                        v-text="item.data.datacon.text"
                                    />
                                </div>
                                <div
                                    v-if="item.data.type === 'image'"
                                    class="filler"
                                    :style="{
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: item.bgcolor,
                                    }"
                                >
                                    <div
                                        class="imagecontainer"
                                        :style="{
                                            backgroundImage: `url(${item.data.datacon.img})`,
                                            backgroundSize: item.data.datacon.imgSize,
                                            opacity: item.data.datacon.opacity,
                                        }"
                                    >
                                        <div v-show="!item.data.datacon.img" class="placeholder" />
                                    </div>
                                </div>
                                <div
                                    v-if="item.data.type === 'border'"
                                    class="filler"
                                    :style="{
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: item.bgcolor,
                                    }"
                                >
                                    <div
                                        class="bordercontainer"
                                        :class="'border' + item.data.datacon.borderId"
                                        :style="{ opacity: item.data.datacon.opacity }"
                                    />
                                </div>
                                <div
                                    v-if="item.data.type === 'mask'"
                                    class="filler"
                                    :style="{
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: item.bgcolor,
                                    }"
                                >
                                    <div
                                        class="bordercontainer"
                                        :style="{ opacity: item.data.datacon.opacity }"
                                    />
                                </div>
                            </vue-drag-resize>
                            <div class="mock" :class="{ front: screenDraggable }" />
                        </draggable>
                    </div>
                </vue-draggable-resizable>
            </vue-ruler-tool>
        </div>
    </div>
</template>
<script>
import draggable from 'vuedraggable'
/* eslint-disable */
export default {
  props: ["scale"],
  components: {
    draggable,
  },
  data() {
    return {
      screenDraggable: false,
      presetLine: [{ type: 'l', site: 100 }, { type: 'v', site: 200 }],
    };
  },
  computed: {
    publicUrl() {
      return `http://${window.location.host}${window.location.pathname}#/view/${this.$route.params.id}`;
    },
    chartData() {
      return this.$parent.chartData;
    },
    wrapStyle() {
      return {
        transform: `scale(${this.scale})`,
      };
    },
    screenStyle() {
      return {
        backgroundColor: this.chartData.bgcolor,
        backgroundImage: `url(${this.chartData.bgimage})`,
        backgroundSize: this.chartData.bgimagesize,
      };
    },
  },
  methods: {
    handleSpaceDown() {
      this.screenDraggable = true;
    },
    handleSpaceUp() {
      this.screenDraggable = false;
    },
    handleActivated(index) {
      this.$parent.setActiveComponentByIndex(index);
    },
    handleResize(widget, arg) {
      const item = widget;
      item.x = arg.left;
      item.y = arg.top;
      item.w = arg.width;
      item.h = arg.height;
    },
    handleDrag(widget, arg) {
      const item = widget;
      item.x = arg.left;
      item.y = arg.top;
    },
    generateData(item) {
      this.$parent.generateData(item);
    },
  },
};
</script>

<style lang="scss" scoped>
.edit-view {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: visible;
  outline: 0;
}

.screen-box {
  // width: 1220px;
  // height: 400px;
  position: relative;
  background: #ffffff;
  transform-origin: 0 0;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.2);
  transition: transform 0.5s ease;
  margin: 0 auto;

  &.screen-box-draggable {
    cursor: grab;
  }
}

.screen {
  position: relative;
  width: 100%;
  height: 100%;
  .vdr {
    border: 0;
  }
  .filler {
    .textcontainer {
      word-wrap: break-word;
    }
    .imagecontainer {
      width: 100%;
      height: 100%;
      .placeholder {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
      }
    }
    .bordercontainer {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      &.border1 {
        border: 50px solid transparent;
        border-image: url("./../../assets/img/borders/1.png") 50;
      }
      &.border2 {
        border: 50px solid transparent;
        border-image: url("./../../assets/img/borders/2.png") 50;
      }
      &.border3 {
        border: 50px solid transparent;
        border-image: url("./../../assets/img/borders/3.png") 50;
      }
    }
  }
}

.mock {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  z-index: -1;

  &.front {
    z-index: 999;
  }
}
</style>
