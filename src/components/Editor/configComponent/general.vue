<template>
    <div>
        <div class="config-box">
            <div class="title">控件名称</div>
            <el-input v-model="currentElement.name" />
        </div>
        <div class="config-box">
            <div class="title">组件位置</div>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-input v-model.number="currentElement.x">
                        <template slot="prepend">x</template>
                    </el-input>
                </el-col>
                <el-col :span="12">
                    <el-input v-model.number="currentElement.y">
                        <template slot="prepend">y</template>
                    </el-input>
                </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 4px">
                <el-col :span="12">
                    <el-input v-model.number="currentElement.w">
                        <template slot="prepend">w</template>
                    </el-input>
                </el-col>
                <el-col :span="12">
                    <el-input v-model.number="currentElement.h">
                        <template slot="prepend">h</template>
                    </el-input>
                </el-col>
            </el-row>
        </div>
        <div class="config-box">
            <div class="title">背景颜色</div>
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-color-picker
                        v-model="currentElement.bgcolor"
                        show-alpha="show-alpha"
                    />
                </el-col>
                <el-col :span="20">
                    <el-input
                        v-model="currentElement.bgcolor"
                        readonly="readonly"
                    />
                </el-col>
            </el-row>
        </div>
        <div class="config-box">
            <div class="title">Settings.json</div>
            <pre class="code-box" v-html="formatedJSON" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'General',
    inject: ['CElement'],
    computed: {
        formatedJSON() {
            return JSON.stringify(this.currentElement, null, 2)
        },
        currentElement() {
            return this.CElement()
        }
    },
}
</script>

<style scoped>

</style>
