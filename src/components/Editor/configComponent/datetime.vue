<template>
    <div>
        <el-form
            class="config-box"
            label-width="100px"
            label-position="left"
            size="mini"
        >
            <el-form-item label="时间格式">
                <el-select v-model="config.format" placeholder="请选择">
                    <el-option
                        v-for="item in dicOption.format"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="字体行高">
                <el-input v-model="config.lineHeight" />
            </el-form-item>
            <el-form-item label="字体大小">
                <el-input v-model="config.fontSize" />
            </el-form-item>
            <el-form-item label="字体背景">
                <el-color-picker
                    v-model="config.backgroundColor"
                    show-alpha="show-alpha"
                />
            </el-form-item>
            <el-form-item label="字体颜色">
                <el-color-picker
                    v-model="config.color"
                    show-alpha="show-alpha"
                />
            </el-form-item>
            <el-form-item label="对齐方式">
                <el-select v-model="config.textAlign" placeholder="请选择">
                    <el-option
                        v-for="item in dicOption.textAlign"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="文字粗细">
                <el-select v-model="config.fontWeight" placeholder="请选择">
                    <el-option
                        v-for="item in dicOption.fontWeight"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { dicOption } from '../config'
export default {
    name: 'DatetimeConfig',
    inject: ['CElement'],
    data() {
        return {
            dicOption: dicOption
        }
    },
    computed: {
        config() {
            return this.CElement().data.config
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
</style>
