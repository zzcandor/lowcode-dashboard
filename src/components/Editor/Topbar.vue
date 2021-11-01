<template>
    <div class="header">
        <div class="left_btn">
            <div class="item publish-btn" @click="handleImg">截屏</div>
        </div>
        <div class="filename">{{ $parent.title }}</div>
        <i
            class="btn iconfont icon-preview"
            :class="{ active: $parent.preview }"
            @click="$parent.preview = !$parent.preview"
        />
        <div class="publish-btn" @click="saveChartData">发布</div>
    </div>
</template>

<script>
import html2canvas from 'html2canvas'
export default {
    data() {
        return {}
    },
    computed: {
        pageTitle() {
            return this.$route.meta.title
        },
    },
    methods: {
        // 截屏
        handleImg() {
            this.$store.commit('setActiveComponentByIndex', -1)
            this.$confirm('是否导出大屏图片？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                html2canvas(document.querySelector('#screen')).then(function(canvas) {
                    let oImg = new Image()
                    oImg = canvas.toDataURL('image/png') // 导出图片
                    console.log(oImg)
                    var oA = document.createElement('a')
                    oA.download = ''// 设置下载的文件名，默认是'下载'
                    oA.href = oImg
                    document.body.appendChild(oA)
                    oA.click()
                    oA.remove() // 下载之后把创建的元素删除
                })
            })
        },
        saveChartData() {
            this.$parent.saveChartData()
        },
    },
}
</script>

<style lang="scss" scoped>
.header {
  height: 100%;
  display: flex;
  align-items: center;
  background: #1d1e1f;
  padding: 0 20px;
    .left_btn{

    }
}

.filename {
  flex: 1;
  text-align: center;
  font-size: 16px;
  color: #ffffff;
}

.btn {
  width: 32px;
  height: 32px;
  line-height: 32px;
  margin-right: 8px;
  text-align: center;
  border-radius: 18px;
  transition: all 0.3s ease;
  color: #aaa;
  &:hover {
    cursor: pointer;
    background-color: #666666;
    color: #ffffff;
  }
  .iconfont {
    font-size: 32px;
  }
  &.active {
    background-color: rgba(255, 255, 255, 0.1);
    color: #409eff;
  }
}

.publish-btn {
  height: 36px;
  line-height: 36px;
  color: #ffffff;
  background: #353535;
  border-radius: 18px;
  padding: 0 18px;
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    background: #666666;
  }
}
</style>
