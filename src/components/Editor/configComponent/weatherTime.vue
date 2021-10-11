<template>
    <div>
        <div class="config-box">
            <vue-json-editor
                v-model="currentElement.data.datacon"
                mode="code"
                :show-btns="true"
                @json-save="handleChartDataChange"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: 'WeatherTimeConfig',
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
