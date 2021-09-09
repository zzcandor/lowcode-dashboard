<template>
  <div>
    <div class="config-box">
      <div class="title">输入文本</div>
      <el-input
          v-model="currentElement.data.datacon.text"
          type="textarea"
          :rows="5"
          style="margin-bottom: 10px"
      />
    </div>
    <div class="config-box">
      <div class="title">字体字号</div>
      <el-select
          v-model="currentElement.data.datacon.fontFamily"
          placeholder="请选择"
          style="width: 100%; margin-bottom: 10px"
      >
        <el-option-group label="英文字体">
          <el-option
              label="Molengo"
              value="Molengo"
          ><span
              :style="{ fontFamily: 'Molengo' }"
          >Molengo</span></el-option>
          <el-option
              label="Lobster"
              value="Lobster"
          ><span
              :style="{ fontFamily: 'Lobster' }"
          >Lobster</span></el-option>
        </el-option-group>
        <el-option-group label="中文字体">
          <el-option
              label="思源黑体"
              value="Noto Sans SC"
          ><span
              :style="{ fontFamily: 'Noto Sans SC' }"
          >思源黑体</span></el-option>
          <el-option
              label="思源宋体"
              value="Noto Serif SC"
          ><span
              :style="{ fontFamily: 'Noto Serif SC' }"
          >思源宋体</span></el-option>
          <el-option
              label="站酷庆科黄油体"
              value="ZCOOL QingKe HuangYou"
          ><span
              :style="{ fontFamily: 'ZCOOL QingKe HuangYou' }"
          >站酷庆科黄油体</span></el-option>
          <el-option
              label="站酷小薇体"
              value="ZCOOL XiaoWei"
          ><span
              :style="{ fontFamily: 'ZCOOL XiaoWei' }"
          >站酷小薇体</span></el-option>
        </el-option-group>
      </el-select>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-color-picker
              v-model="currentElement.data.datacon.color"
              show-alpha="show-alpha"
          />
        </el-col>
        <el-col :span="20">
          <el-input v-model="currentElement.data.datacon.fontSize">
            <template slot="append">px</template>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <div
              class="btn"
              :class="{ active: currentElement.data.datacon.bold }"
              @click="
                                    currentElement.data.datacon.bold =
                                        !currentElement.data.datacon.bold
                                "
          >
            <i class="iconfont icon-bold"/>
          </div>
          <div
              class="btn"
              :class="{ active: currentElement.data.datacon.italic }"
              @click="
                                    currentElement.data.datacon.italic =
                                        !currentElement.data.datacon.italic
                                "
          >
            <i class="iconfont icon-italic"/>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="config-box">
      <div class="title">
        描边
        <el-switch
            v-model="currentElement.data.datacon.stroke"
            style="float: right"
        />
      </div>
      <el-row v-show="currentElement.data.datacon.stroke" :gutter="20">
        <el-col :span="4">
          <el-color-picker
              v-model="currentElement.data.datacon.strokeColor"
          />
        </el-col>
        <el-col :span="20">
          <el-input v-model="currentElement.data.datacon.strokeSize">
            <template slot="append">px</template>
          </el-input>
        </el-col>
      </el-row>
    </div>
    <div class="config-box">
      <div class="title">
        阴影
        <el-switch
            v-model="currentElement.data.datacon.shadow"
            style="float: right"
        />
      </div>
      <el-row v-show="currentElement.data.datacon.shadow" :gutter="20">
        <el-col :span="4">
          <el-color-picker
              v-model="currentElement.data.datacon.shadowColor"
          />
        </el-col>
        <el-col :span="20">
          <el-input v-model="currentElement.data.datacon.shadowBlur">
            <template slot="append">px</template>
          </el-input>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

export default {
  name: "textConfig",
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
