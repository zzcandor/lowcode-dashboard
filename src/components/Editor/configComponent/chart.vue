<template>
    <div class="config-box">
        <div class="title">数据配置</div>
        <el-select
            v-model="currentElement.data.datacon.type"
            placeholder="请选择"
            style="width: 100%; margin-bottom: 10px"
            @change="handleChartDataChange"
        >
            <el-option label="静态JSON" value="raw" />
            <el-option label="我的数据源" value="connect" />
            <el-option label="GET接口" value="get" />
        </el-select>
        <vue-json-editor
            v-if="currentElement.data.datacon.type === 'raw'"
            v-model="currentElement.data.datacon.data"
            mode="code"
            :show-btns="true"
            @json-save="handleChartDataChange"
        />
        <el-select
            v-if="currentElement.data.datacon.type === 'connect'"
            v-model="currentElement.data.datacon.connectId"
            placeholder="请选择"
            style="width: 100%; margin-bottom: 10px"
            @change="handleChartDataChange"
        >
            <el-option
                v-for="(item, index) in connectList"
                :key="index"
                :label="item.name"
                :value="item._id"
            />
        </el-select>
        <el-input
            v-if="currentElement.data.datacon.type === 'get'"
            v-model="currentElement.data.datacon.getUrl"
            type="textarea"
            :rows="5"
            style="margin-bottom: 10px"
        />
        <el-row v-if="currentElement.data.datacon.type === 'get'">
            <el-col :span="8">
                <p style="margin-top: 8px">刷新时间</p>
            </el-col>
            <el-col :span="16">
                <el-input-number
                    v-model="currentElement.data.datacon.interval"
                    :min="1"
                    :max="10"
                    style="width: 100%"
                    @change="handleChartDataChange"
                />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import vueJsonEditor from 'vue-json-editor'

export default {
    name: 'Chart',
    inject: ['CElement'],
    components: {
        vueJsonEditor,
    },
    computed: {
        currentElement() {
            return this.CElement()
        }
    },
    methods: {
        handleChartDataChange() {
            this.$parent.$parant.generateData(this.currentElement)
        },

    }
}
</script>

<style scoped>

</style>
