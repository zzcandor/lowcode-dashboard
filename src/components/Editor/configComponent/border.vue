<template>
    <div>
        <div class="config-box">
            <div class="title">边框样式</div>
            <el-select
                v-model="currentElement.data.datacon.borderId"
                placeholder="请选择"
                style="width: 100%; margin-bottom: 10px"
            >
                <el-option label="古典-棕" :value="1" />
                <el-option label="古典-白" :value="2" />
                <el-option label="科技" :value="3" />
            </el-select>
        </div>
        <div class="config-box">
            <div class="title">透明度</div>
            <el-slider
                v-model="currentElement.data.datacon.opacity"
                :max="1"
                :step="0.01"
                show-input="show-input"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: 'BorderConfig',
    inject: ['CElement'],
    computed: {
        currentElement() {
            return this.CElement()
        }
    },
}
</script>

<style scoped>

</style>
