<template>
    <div>
        <el-form
            class="config-box"
            label-width="100px"
            label-position="left"
            size="mini"
        >
            <dataBuild :active-obj="config" />
            <!--            <vue-json-editor-->
            <!--                v-model="config"-->
            <!--                mode="code"-->
            <!--                :show-btns="false"-->
            <!--                @json-save="handleChartDataChange"-->
            <!--            />-->
            <el-form-item label="表行数">
                <el-input v-model="config.rowNum" />
            </el-form-item>
            <el-form-item label="表头背景色">
                <el-color-picker
                    v-model="config.headerBGC"
                    show-alpha="show-alpha"
                />
            </el-form-item>
            <el-form-item label="奇数行背景色">

                <el-color-picker
                    v-model="config.oddRowBGC"
                    show-alpha="show-alpha"
                />
            </el-form-item>
            <el-form-item label="偶数行背景色">

                <el-color-picker
                    v-model="config.evenRowBGC"
                    show-alpha="show-alpha"
                />
            </el-form-item>
            <el-form-item label="轮播时间间隔(ms)">

                <numberInput v-model="config.waitTime" @change="changeData" />
            </el-form-item>
            <el-form-item label="表头高度">

                <numberInput v-model="config.headerHeight" @change="changeData" />
            </el-form-item>
            <el-form-item label="显示行号">
                <el-radio v-model="config.index" :label="true" @change="changeData">是</el-radio>
                <el-radio v-model="config.index" :label="false" @change="changeData">否</el-radio>
            </el-form-item>
            <el-form-item label="行号表头">
                <el-input v-model="config.indexHeader" @change="changeData" />
            </el-form-item>
            <el-form-item label="轮播方式">

                <el-radio v-model="config.carousel" label="single" @change="changeData">单行</el-radio>
                <el-radio v-model="config.carousel" label="page" @change="changeData">整页</el-radio>
            </el-form-item>
            <el-form-item label="悬浮暂停轮播">

                <el-radio v-model="config.hoverPause" :label="true" @change="changeData">是</el-radio>
                <el-radio v-model="config.hoverPause" :label="false" @change="changeData">否</el-radio>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import dataBuild from '@/components/Editor/configComponent/dataBuild'
import common from '@/views/components/common'
export default {
    name: 'TableConfig',
    inject: ['CElement'],
    components: {
        dataBuild
    },
    mixins: [common],
    computed: {
        config() {
            return this.CElement().data.config
        }
    },
    methods: {
        handleChartDataChange(val) {
            console.log(val)
        },
        changeData() {

        },
    }
}
</script>

<style scoped lang="scss">
/deep/.el-form-item__label{
    color: #fff;
}
/deep/.el-input__inner{
    color: #fff;
}
</style>
