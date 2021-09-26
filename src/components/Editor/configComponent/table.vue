<template>
    <div>
        <div class="config-box">
            <!--            <el-select-->
            <!--                v-model="currentElement.data.config.type"-->
            <!--                placeholder="请选择"-->
            <!--                style="width: 100%; margin-bottom: 10px"-->
            <!--                @change="handleChartDataChange"-->
            <!--            >-->
            <!--                <el-option label="静态JSON" value="raw" />-->
            <!--                <el-option label="我的数据源" value="connect" />-->
            <!--                <el-option label="GET接口" value="get" />-->
            <!--            </el-select>-->
            <vue-json-editor
                v-model="currentElement.data.config"
                mode="code"
                :show-btns="true"
                @json-save="handleChartDataChange"
            />
            <!--            <div class="title">表头</div>-->
            <!--            <div>-->
            <!--                <el-input @change="changeData" v-model="currentElement.data.config.header" placeholder="请输入" style="width: 100%; margin-bottom: 10px"></el-input>-->
            <!--            </div>-->
            <!--            <div class="title">表数据</div>-->
            <!--            <div>-->
            <!--                <el-input @change="changeData" v-model="currentElement.data.config.data" placeholder="请输入" style="width: 100%; margin-bottom: 10px"></el-input>-->
            <!--            </div>-->
            <!--            <div class="title">表行数</div>-->
            <!--            <div>-->
            <!--                <el-input v-model="currentElement.data.config.rowNum"></el-input>-->
            <!--            </div>-->
            <!--            <div class="title">表头背景色</div>-->
            <!--            <div>-->
            <!--                <el-color-picker-->
            <!--                    v-model="currentElement.data.config.headerBGC"-->
            <!--                    show-alpha="show-alpha"-->
            <!--                />-->
            <!--            </div>-->
            <!--            <div class="title">奇数行背景色</div>-->
            <!--            <div>-->
            <!--                <el-color-picker-->
            <!--                    v-model="currentElement.data.config.oddRowBGC"-->
            <!--                    show-alpha="show-alpha"-->
            <!--                />-->
            <!--            </div>-->
            <!--            <div class="title">偶数行背景色</div>-->
            <!--            <div>-->
            <!--                <el-color-picker-->
            <!--                    v-model="currentElement.data.config.evenRowBGC"-->
            <!--                    show-alpha="show-alpha"-->
            <!--                />-->
            <!--            </div>-->
            <!--            <div class="title">轮播时间间隔(ms)</div>-->
            <!--            <div>-->
            <!--                <numberInput @change="changeData" v-model="currentElement.data.config.waitTime"></numberInput>-->
            <!--            </div>-->
            <!--            <div class="title">表头高度</div>-->
            <!--            <div>-->
            <!--                <numberInput @change="changeData" v-model="currentElement.data.config.headerHeight"></numberInput>-->
            <!--            </div>-->
            <!--            <div class="title">列宽度</div>-->
            <!--            <div>-->
            <!--                <numberInput @change="changeData" v-model="currentElement.data.config.columnWidth"></numberInput>-->
            <!--            </div>-->
            <!--            <div class="title">显示行号</div>-->
            <!--            <div>-->
            <!--                <el-radio @change="changeData" v-model="currentElement.data.config.index" :label="true">是</el-radio>-->
            <!--                <el-radio @change="changeData" v-model="currentElement.data.config.index" :label="false">false</el-radio>-->
            <!--            </div>-->
            <!--            <div class="title">行号表头</div>-->
            <!--            <div>-->
            <!--                <el-input @change="changeData" v-model="currentElement.data.config.indexHeader"></el-input>-->
            <!--            </div>-->
            <!--            <div class="title">轮播方式</div>-->
            <!--            <div>-->
            <!--                <el-radio @change="changeData" v-model="currentElement.data.config.carousel" label="single">single</el-radio>-->
            <!--                <el-radio @change="changeData" v-model="currentElement.data.config.carousel" label="page">page</el-radio>-->
            <!--            </div>-->
            <!--            <div class="title">悬浮暂停轮播</div>-->
            <!--            <div>-->
            <!--                <el-radio @change="changeData" v-model="currentElement.data.config.hoverPause" :label="true">是</el-radio>-->
            <!--                <el-radio @change="changeData" v-model="currentElement.data.config.hoverPause" :label="false">false</el-radio>-->
            <!--            </div>-->
        </div>
    </div>
</template>

<script>
export default {
    name: 'TableConfig',
    inject: ['CElement'],
    computed: {
        currentElement() {
            return this.CElement()
        }
    },
    methods: {
        handleChartDataChange(val) {
            console.log(val)
            // this.currentElement.data.config = {...this.currentElement.data.config}
        }
    }
}
</script>

<style scoped>

</style>
