<template>
    <div>
        <div class="config-box">
            <div class="title">上传图片</div>
            <el-upload
                class="bg-uploader"
                action="http://localhost:3000/api/uploadfile/"
                :show-file-list="false"
                :on-success="handleImageUploadSuccess"
                :before-upload="beforeUpload"
            >
                <div
                    v-if="currentElement.data.datacon.img"
                    class="bg-preview-wrapper"
                >
                    <img
                        class="bg-preview"
                        :src="currentElement.data.datacon.img"
                    />
                </div>
                <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <el-row>
                <el-col v-show="currentElement.data.datacon.img" :span="24">
                    <el-select
                        v-model="currentElement.data.datacon.imgSize"
                        placeholder="请选择"
                        style="width: 100%"
                    >
                        <el-option label="覆盖" value="cover" />
                        <el-option label="平铺" value="contain" />
                        <el-option label="拉伸" value="100% 100%" />
                    </el-select>
                </el-col>
            </el-row>
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
    name: 'TextConfig',
    inject: ['CElement'],
    computed: {
        currentElement() {
            return this.CElement()
        }
    },
    methods: {
        handleImageUploadSuccess(res, file) {
            this.currentElement.data.datacon.img = res.url
        },
        beforeUpload(file) {
            const isPic = file.type === 'image/jpeg' || file.type === 'image/png'
            const isLt4M = file.size / 1024 / 1024 < 4

            if (!isPic) {
                this.$message.error('图片只能是 JPG 或 PNG 格式!')
            }
            if (!isLt4M) {
                this.$message.error('图片大小不能超过 4MB!')
            }
            return isPic && isLt4M
        },
        handleScreenBgDelete() {
            this.chartData.bgimage = ''
        },
    }
}
</script>

<style scoped>

</style>
