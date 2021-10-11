<template>
    <div class="dataBuild">
        <el-form
            label-width="120px"
            label-position="left"
            size="mini"
        >
            <el-form-item label="数据类型">
                <el-radio v-model="activeObj.dataType" :label="1">静态数据</el-radio>
                <el-radio v-model="activeObj.dataType" :label="2">接口</el-radio>
                <!--                <el-radio v-model="activeObj.dataType" :label="3">SQL</el-radio>-->
            </el-form-item>
            <el-form-item label="刷新时间">
                <number-input v-model="activeObj.time" />
            </el-form-item>
            <template v-if="isApi || isSql">
                <el-form-item label-width="0">
                    <el-button
                        size="mini"
                        type="primary"
                        class="block"
                        @click="handleSql"
                    >
                        <span v-if="isSql">编辑SQL语句</span>
                        <span v-else-if="isApi">编辑Api接口</span>
                    </el-button>
                </el-form-item>
            </template>
            <el-form-item
                v-if="isStatic"
                label-width="0"
            >
                <el-button
                    size="mini"
                    type="primary"
                    class="block"
                    @click="handleSql"
                >
                    <span>编辑静态数据</span>
                </el-button>
            </el-form-item>
            <el-form-item label-width="0">
                <el-button
                    size="mini"
                    type="primary"
                    class="block"
                    @click="getData"
                >刷新数据</el-button>
            </el-form-item>
        </el-form>
        <el-dialog
            append-to-body
            :close-on-click-modal="false"
            :visible.sync="show"
            width="60%"
        >
            <el-form
                size="small"
                label-width="130px"
            >
                <div v-if="isSql">
                    <el-form-item label="数据源选择">
                        <el-select v-model="db" :dic="DIC.sql" />
                    </el-form-item>
                    <el-form-item
                        label="SQL语句"
                        label-position="top"
                    >
                        <vue-json-editor
                            v-model="editorVal"
                            mode="code"
                            :show-btns="false"
                            @json-save="handleChartDataChange"
                        />
                    </el-form-item>
                </div>
                <div v-else-if="isApi">
                    <el-form-item label="接口地址">
                        <el-input v-model="activeObj.url" />
                    </el-form-item>
                    <el-form-item label="请求方式">
                        <el-select v-model="activeObj.requestType" placeholder="请选择">
                            <el-option label="GET" value="get" />
                            <el-option label="POST" value="post" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="请求参数">
                        <vue-json-editor
                            v-model="queryEditor"
                            mode="code"
                            :show-btns="false"
                            @json-save="handleChartDataChange"
                        />
                    </el-form-item>
                </div>
                <el-form-item label="响应数据">
                    <vue-json-editor
                        v-model="editorVal"
                        mode="code"
                        :show-btns="false"
                        @json-save="handleChartDataChange"
                    />
                </el-form-item>
                <el-form-item label="数据处理">
                    <vue-json-editor
                        v-model="dataFormatEditor"
                        mode="code"
                        :show-btns="false"
                        @json-save="handleChartDataChange"
                    />
                </el-form-item>
                <el-form-item label-width="0px">
                    <el-button
                        size="small"
                        type="primary"
                        @click="getData"
                    >刷新数据</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'DataBuild',
    inject: ['CElement'],
    props: {
        activeObj: {
            type: Object,
        }
    },
    data() {
        return {
            show: false,
            db: '',
            sql: '',
            DIC: {
                sql: [],
            },
            editorVal: '', // 数据
            queryEditor: '', // 参数数据
            dataFormatEditor: '', // 数据处理方法
        }
    },
    computed: {
        isStatic() {
            return this.activeObj.dataType === 1
        },
        isApi() {
            return this.activeObj.dataType === 2
        },
        isSql() {
            return this.activeObj.dataType === 3
        },
    },
    methods: {
        getData() {
            this.activeObj.query = this.queryEditor
            this.activeObj.dataFormatter = this.dataFormatEditor
            if (this.isStatic) {
                this.activeObj.data = this.editorVal
            }
        },
        handleChartDataChange(val) {
            console.log(val)
        },
        handleSql() {
            this.show = true
            if (this.isStatic) {
                this.editorVal = this.activeObj.data
            } else {
                this.editorVal = ''
            }
        }
    },
}
</script>

<style scoped lang="scss">
/deep/.el-form-item__label{
    color: #fff;
}
/deep/.el-input__inner{
    color: #fff;
}
.block{
    width: 100%;
}
/deep/.el-dialog__header{
    background-color: #000;
}
/deep/.el-dialog__body{
    background-color: #000;
}
/deep/.jsoneditor-menu{
    display: none;
}
</style>
