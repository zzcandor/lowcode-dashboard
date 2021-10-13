<template>
    <div>
        <div class="config-box">
            <el-form
                class="config-box"
                label-width="100px"
                label-position="left"
                size="mini"
            >
                <el-form-item label="空气质量">
                    <el-select v-model="config.airQuality" placeholder="请选择">
                        <el-option
                            v-for="item in dicOption.airQuality"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="天气">
                    <el-select v-model="config.weather" placeholder="请选择">
                        <el-option
                            v-for="item in dicOption.weather"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="温度">
                    <el-input v-model="config.temperature" />
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script>
import { dicOption } from '../config'
export default {
    name: 'WeatherTimeConfig',
    inject: ['CElement'],
    data() {
        return {
            dicOption: dicOption
        }
    },
    computed: {
        config() {
            return this.CElement().data.datacon
        }
    }
}
</script>

<style scoped lang="scss">
/deep/.el-form-item__label{
    color: #fff;
    font-weight: bold;
}
/deep/.el-input__inner{
    color: #fff;
}
</style>
