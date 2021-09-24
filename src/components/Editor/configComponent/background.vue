<template>
    <div>
        <div class="config-box">
            <div class="title">画布大小</div>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-input v-model.number="chartData.w" class="num-input">
                        <template slot="prepend">w</template>
                    </el-input>
                </el-col>
                <el-col :span="12">
                    <el-input v-model.number="chartData.h">
                        <template slot="prepend">h</template>
                    </el-input>
                </el-col>
            </el-row>
        </div>
        <div class="config-box">
            <div class="title">背景配置</div>
            <el-select
                v-model="editorSettings.parentBg"
                placeholder="请选择"
                style="width: 100%"
            >
                <el-option label="背景颜色" :value="0" />
                <el-option label="背景图片" :value="1" />
            </el-select>
            <el-row
                v-show="editorSettings.parentBg === 0"
                :gutter="20"
                style="margin-top: 12px"
            >
                <el-col :span="4">
                    <el-color-picker v-model="chartData.bgcolor" />
                </el-col>
                <el-col :span="20">
                    <el-input
                        v-model="chartData.bgcolor"
                        readonly="readonly"
                    />
                </el-col>
            </el-row>
            <el-row
                v-show="editorSettings.parentBg === 1"
                :gutter="20"
                style="margin-top: 12px"
            >
                <el-col :span="24">
                    <el-upload
                        class="bg-uploader"
                        action="http://localhost:3000/api/uploadfile/"
                        :show-file-list="false"
                        :on-success="handleScreenBgUploadSuccess"
                        :before-upload="beforeUpload"
                    >
                        <div v-if="chartData.bgimage" class="bg-preview-wrapper">
                            <img class="bg-preview" :src="chartData.bgimage" />
                        </div>
                        <i class="el-icon-plus avatar-uploader-icon" />
                    </el-upload>
                </el-col>
                <el-col v-show="chartData.bgimage" :span="24">
                    <el-select
                        v-model="chartData.bgimagesize"
                        placeholder="请选择"
                        style="width: 100%"
                    >
                        <el-option label="覆盖" value="cover" />
                        <el-option label="平铺" value="contain" />
                        <el-option label="拉伸" value="100% 100%" />
                    </el-select>
                </el-col>
                <el-col
                    v-show="chartData.bgimage"
                    :span="24"
                    style="margin-top: 16px"
                >
                    <el-button
                        type="danger"
                        plain="plain"
                        style="width: 100%"
                        @click="handleScreenBgDelete"
                    >删除
                    </el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Background',
    inject: ['chartData'],
    data() {
        return {
            editorSettings: {
                parentBg: 0, // 0代表背景颜色，1代表背景图片
                parentBgUrl: '',
            },
        }
    },
    methods: {
        handleScreenBgUploadSuccess(res, file) {
            // console.log(res);
            this.chartData.bgimage = res.url
            // console.log(file);
            // this.imageUrl = URL.createObjectURL(file.raw);
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

<style scoped lang="scss">

</style>
