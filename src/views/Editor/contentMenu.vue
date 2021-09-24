<template>
    <div
        v-show="contentMenu"
        class="contentmenu"
        :style="styleName"
        @click="contentMenu = false"
    >

        <div
            class="contentmenu__item"
            @click="handleDel()"
        > <i class="el-icon-close" />删除图层
        </div>
        <div
            class="contentmenu__item"
            @click="handleCopy()"
        ><i class="el-icon-document" />复制图层
        </div>
        <div
            class="contentmenu__item"
            @click="handleTop()"
        ><i class="el-icon-arrow-up" />置顶图层
        </div>
        <div
            class="contentmenu__item"
            @click="handleBottom()"
        ><i class="el-icon-arrow-down" />置底图层
        </div>
        <div
            class="contentmenu__item"
            @click="handleStepTop()"
        ><i class="el-icon-arrow-up" />上移一层
        </div>
        <div
            class="contentmenu__item"
            @click="handleStepBottom()"
        ><i class="el-icon-arrow-down" />下移一层
        </div>
    </div>
</template>

<script>
export default {
    name: 'Contentmenu',
    data() {
        return {
            contentMenu: false,
            contentMenuX: 0,
            contentMenuY: 0,
            component: {},
            componentIndex: ''
        }
    },
    inject: ['contain'],
    computed: {
        styleName() {
            return {
                left: this.contentMenuX + 'px',
                top: this.contentMenuY + 'px'
            }
        }
    },
    methods: {
        show(X = 0, Y = 0, component, index) {
            this.contentMenuX = X
            this.contentMenuY = Y
            this.contentMenu = true
            this.componentIndex = index
            this.component = component
        },
        hide() {
            this.contentMenuX = 0
            this.contentMenuY = 0
            this.contentMenu = false
        },
        handleStepBottom() {
            this.handleCommon(false, true)
        },
        handleStepTop() {
            this.handleCommon(true, true)
        },
        // 删除组件的方法
        handleDel() {
            this.$confirm(`是否删除所选图层?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.commit('deleteComponent', this.index)
            })
        },
        // 复制组件的方法
        handleCopy() {
            this.$store.dispatch('handleAddComponentFromIcon', this.component.data.settings.id)
        },
        // 图层的上下移动方法
        handleCommon(first = false, step = false) {
            // 交换数组元素
            var swapItems = function(arr, index1, index2) {
                arr[index1] = arr.splice(index2, 1, arr[index1])[0]
                return arr
            }
            const obj = this.contain.activeObj
            const data = this.deepClone(obj)
            const params = this.contain.findnav(obj.index, true)
            if (params.pcount !== 0) {
                if (params.len < 1) return
                if (step) {
                    if (first && params.count === 0) return
                    if (!first && params.count === params.len) return
                    const count = first ? params.count - 1 : params.count + 1
                    swapItems(params.parent.children, params.count, count)
                } else {
                    if (first) {
                        if (params.count === 0) return
                        params.parent.children.splice(params.count, 1)
                        params.parent.children.unshift(data)
                    } else {
                        if (params.count === params.len) return
                        params.parent.children.splice(params.count, 1)
                        params.parent.children.push(data)
                    }
                }
            } else {
                if (this.contain.nav.length < 1) return
                if (step) {
                    if (first && params.count === 0) return
                    if (!first && params.count === params.len) return
                    const count = first ? params.count - 1 : params.count + 1
                    swapItems(this.contain.nav, params.count, count)
                } else {
                    if (first) {
                        if (params.count === 0) return
                        this.contain.nav.splice(params.count, 1)
                        this.contain.nav.unshift(data)
                    } else {
                        if (params.count === params.len) return
                        this.contain.nav.splice(params.count, 1)
                        this.contain.nav.push(data)
                    }
                }
            }
        },
        handleTop() {
            this.handleCommon(true)
        },
        handleBottom() {
            this.handleCommon()
        }
    }
}
</script>

<style scoped lang="scss">
.contentmenu {
    width: 160px;
    position: fixed;
    z-index: 99999;
    list-style: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    padding: 0;
    background: #27343e;
    color: #bcc9d4;
    .contentmenu__item {
        z-index: 10000;
        list-style: none;
        padding: 8px 12px;
        cursor: pointer;
        position: relative;
        font-size: 12px;
    }
    .contentmenu__item:hover {
        background-color: rgba(0, 192, 222, 0.1);
    }
    .contentmenu__item i {
        margin-right: 5px;
    }
    .contentmenu__item :first-child {
        padding-top: 5px;
    }
}

</style>
