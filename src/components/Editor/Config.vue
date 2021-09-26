<template>
    <div class="config">
        <p style="color: #ffffff">{{ currentElement.w }}</p>
        <div v-if="!currentElement.w" class="public-config">
            <background />
        </div>
        <div v-if="currentElement.w" class="component-config">
            <div class="panel-selector">
                <div class="radio-group">
                    <div
                        class="radio-btn"
                        :class="{ active: thisKey === 'general' }"
                        @click="thisKey = 'general'"
                    >
                        基础
                    </div>
                    <div
                        class="radio-btn"
                        :class="{ active: thisKey === 'data' }"
                        @click="thisKey = 'data'"
                    >
                        {{ btnName[currentElement.data.type] }}
                    </div>
                </div>
            </div>
            <div v-show="thisKey === 'general'" class="panel">
                <general />
            </div>
            <div v-show="thisKey === 'data'" class="panel">
                <component :is="currentElement.data.type + 'Config'" />
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
import configComponents from './configComponent/components'
export default {
  mixins:[configComponents],
  inject:['CElement','chartData'],
  data() {
    return {
      user: {
        uid: localStorage.getItem("uid"),
        username: localStorage.getItem("user"),
      },
      editorSettings: {
        parentBg: 0, // 0代表背景颜色，1代表背景图片
        parentBgUrl: "",
      },
      thisKey: "general",
      connectList: [],
        btnName:{
            chart:'数据',
            text:'文字',
            image:'图片',
            border:'边框',
            table:'表格',
        },
    };
  },
  computed:{
    currentElement(){
      return this.CElement()
    }
  },
  mounted() {
    this.$http
      .get("/connect?uid=" + this.user.uid)
      .then((res) => {
        const { errno, data } = res.data;
        if (errno === 0) {
          this.connectList = data.connectList;
        }
      })
      .catch(() => {});
  },
  methods: {

  },
};
</script>

<style lang="scss">
  .el-input__inner {
    background-color: #262c33;
  }
  .vdr.active:before {
    outline: 2px dashed #3a8ee6 !important;
  }
</style>

<style lang="scss" scoped>
.config,
.component-config {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  background: #191c21;
  color: #FFF;
  box-shadow: -4px 0 4px #00000005;
  padding: 0;
  overflow: hidden;
}

.public-config,
.component-config .panel {
  flex: 1;
  overflow-y: scroll;
}

.panel-selector {
  z-index: 100;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.06);
  .radio-group {
    text-align: center;
    .radio-btn {
      display: inline-block;
      padding: 10px 20px;
      margin: 0 10px;
      color: #999999;
      &.active {
        color: #fff;
        border-bottom: 2px solid #212121;
      }
    }
  }
}

/deep/.config-box {
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  margin: 0;
  padding: 14px 20px;
  .title {
    font-weight: bold;
    font-size: 0.86rem;
    margin-bottom: 12px;
  }
  .btn {
    display: inline-block;
    width: 32px;
    height: 32px;
    line-height: 32px;
    margin: 5px 5px 5px 0;
    text-align: center;
    border-radius: 8px;
    transition: all 0.3s ease;
    color: #999;
    &:hover {
      cursor: pointer;
      background-color: rgba(64, 160, 255, 0.1);
      color: #666666;
    }
    &.active {
      background-color: rgba(64, 160, 255, 0.1);
      color: #409eff;
    }
    .iconfont {
      font-size: 22px;
    }
  }
}

.component-config /deep/ .jsoneditor-menu {
  display: none;
}

.num-input {
  .el-input-group__prepend {
    background-color: #262c33 !important;
  }
}

.code-box {
  width: 260px;
  max-height: 200px;
  border: 1px solid #eeeeee;
  border-radius: 4px;
  padding: 6px;
  overflow: scroll;
  box-sizing: border-box;
}

// image upload
.bg-uploader /deep/ .el-upload {
  border: 1px dashed #d9d9d9;
  width: 260px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.bg-uploader /deep/ .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.bg-preview-wrapper {
  width: 100%;
  height: 150px;
  .bg-preview {
    max-width: 100%;
    height: 100%;
    margin: 0 auto;
  }
}
</style>
