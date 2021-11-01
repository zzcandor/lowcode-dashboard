<template>
    <div class="canvasBox" @click="hideCompentMenu">
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
            @keydown.space.prevent="handleSpaceDown"
            @keyup.space.prevent="handleSpaceUp"
            @mousedown.stop="handleActivated(-1)"
            @wheel="handleWheel"
        >
            <vue-ruler-tool
                :content-layout="{ left: 250,top: 50 }"
                :is-scale-revise="true"
                :v-model="presetLine"
                :position="'relative'"
                style="width: 200%;height: 100%!important;"
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
                        id="screen"
                        ref="screen"
                        class="screen"
                        :style="screenStyle"
                    >
                        <draggable
                            :animation="340"
                            style="width:100%;height:100%"
                            group="componentsGroup"
                        >
                            <vue-drag-resize
                                v-for="(item, index) in chartData.elements"
                                :key="item.id"
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
                                <div class="box" style="width: 100%;height: 100%;" @contextmenu.prevent="handleContextMenu($event,item,index)">
                                    <div
                                        class="filler"
                                        :style="{
                                            width: '100%',
                                            height: '100%',
                                            backgroundColor: item.bgcolor,
                                        }"
                                    >
                                        <template v-if="item.data.type === 'chart'">
                                            <component
                                                :is="`ve-${item.data.settings.type}`"
                                                :width="item.w + 'px'"
                                                :height="item.h + 'px'"
                                                :data="item.data.generated"
                                                :settings="item.data.settings"
                                                @ready-once="generateData(item)"
                                            />
                                        </template>
                                        <template v-else>
                                            <component :is="`c-${item.data.type}`" :item="item" />
                                        </template>

                                    </div>
                                </div>
                            </vue-drag-resize>
                            <div class="mock" :class="{ front: screenDraggable }" />
                        </draggable>
                    </div>
                </vue-draggable-resizable>
            </vue-ruler-tool>
        </div>
        <contentMenu ref="contentmenu" />
    </div>
</template>
<script>
import draggable from 'vuedraggable'
import cpns from '@/views/components/components'
import contentMenu from './contentMenu.vue'
import { mapGetters } from 'vuex'
export default {
    provide() {
        return {
            contain: this
        }
    },
    components: {
        draggable,
        contentMenu,
    },
    mixins: [cpns],
    // eslint-disable-next-line vue/require-prop-types
    props: ['scale'],
    data() {
        return {
            screenDraggable: false,
            presetLine: [{ type: 'l', site: 100 }, { type: 'v', site: 200 }],
        }
    },
    computed: {
        ...mapGetters(['chartData']),
        publicUrl() {
            return `http://${window.location.host}${window.location.pathname}#/view/${this.$route.params.id}`
        },
        wrapStyle() {
            return {
                transform: `scale(${this.scale})`,
            }
        },
        screenStyle() {
            return {
                backgroundColor: this.chartData.bgcolor,
                backgroundImage: `url(${this.chartData.bgimage})`,
                backgroundSize: this.chartData.bgimagesize,
            }
        }
    },
    methods: {
        handleWheel(e) {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault()
                const nextScale = parseFloat(
                    Math.max(0.2, this.scale - e.deltaY / 500).toFixed(2)
                )
                // this.scale = nextScale;
                this.$emit('update:scale', nextScale)
            }
        },
        // 右键菜单
        handleContextMenu(e, item = {}, index) {
            this.$nextTick(() => {
                this.$refs.contentmenu.show(e.clientX, e.clientY, item, index)
            })
        },
        // 隐藏菜单
        hideCompentMenu() {
            this.$refs.contentmenu.hide()
        },
        handleSpaceDown() {
            this.screenDraggable = true
        },
        handleSpaceUp() {
            this.screenDraggable = false
        },
        handleActivated(index) {
            this.$store.commit('setActiveComponentByIndex', index)
        },
        // handleDeleteComponent(index) {
        //     this.$store.commit('deleteComponent', index)
        // },
        handleResize(widget, arg) {
            const item = widget
            item.x = arg.left
            item.y = arg.top
            item.w = arg.width
            item.h = arg.height
        },
        handleDrag(widget, arg) {
            const item = widget
            item.x = arg.left
            item.y = arg.top
        },
        generateData(item) {
            this.$parent.generateData(item)
        },
        handleCopyItem(item) {
            console.log(item)
        }
    },
}
</script>

<style lang="scss" scoped>
$lighterBlue: #409eff;
.canvasBox{
    height: 100%;

    .edit-view {
        position: relative;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        overflow: scroll;
        outline: 0;
    }
}

.screen-box {
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
  .control-box {
    position: absolute;
    right: 10px;
    // display: none;
    top: -20px;
        & > .drawing-item-copy,
        & > .drawing-item-delete {
            display: inline-flex;
            background: #ffffff;
            margin-left: 10px;
            cursor: pointer;
            font-size: 30px;
            border: 1px solid gray;
            border-radius: 100%;
            width: 40px;
            height: 40px;
            justify-content: center;
            align-items: center;
        }
    }
    & > .drawing-item-copy,
    & > .drawing-item-delete {
        display: none;
        position: absolute;
        top: -10px;
        width: 22px;
        height: 22px;
        line-height: 22px;
        text-align: center;
        border-radius: 50%;
        font-size: 12px;
        border: 1px solid;
        cursor: pointer;
        z-index: 1;
        &:hover {
          border-color:red;
        }
    }
    & > .drawing-item-copy {
        right: 56px;
        color: $lighterBlue;
        background: #fff;
        &:hover {
            background: $lighterBlue;
            color: #fff;
        }
    }
    & > .drawing-item-delete {
        right: 24px;
        border-color: #f56c6c;
        color: #f56c6c;
        background: #fff;
        &:hover {
            background: #f56c6c;
            color: #fff;
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
