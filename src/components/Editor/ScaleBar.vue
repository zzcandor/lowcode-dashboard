<template>
    <div class="panel">
        <!-- .canvas-view
  vue-draggable-resizable(
    :w="100"
    :h="80"
    :parent="true"
    class-name="canvas-box"
    class-name-dragging="canvas-box-dragging"
    :resizable="false")
  -->
        <div class="control-bar"><i class="btn el-icon-minus" @click="zoomOut" />
            <div class="scale-mount">{{ value * 100 }}%</div>
            <i class="btn el-icon-plus" @click="zoomIn" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Number
        }
    },
    data() {
        return {
        }
    },
    watch: {
        scale() {

        },
    },
    methods: {
        zoomOut() {
            if (this.value > 0.1) {
                const scale = parseFloat((this.value - 0.1).toFixed(1))
                this.$emit('input', scale)
            }
        },
        zoomIn() {
            if (this.value < 1) {
                const scale = parseFloat((this.value + 0.1).toFixed(1))
                this.$emit('input', scale)
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.panel {
  width: 130px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  background: #191c21;
  border: 1px solid #cccccc;
}

.control-bar {
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  height: 32px;
  color: #666666;
  padding: 0 6px;

  .btn {
    width: 24px;
    height: 24px;
    line-height: 24px;
    border-radius: 14px;
    font-size: 12px;
    transition: all 0.3s ease;

    &:hover {
      cursor: pointer;
      background-color: #dddddd;
      color: #333333;
    }
  }

  .scale-mount {
    flex: 1;
    font-size: 14px;
  }
}

.canvas-view {
  position: relative;
  background: #1e1e1ee9;
  width: 144px;
  margin: 6px 8px;
  height: 120px;
}

.canvas-box {
  background: rgba(255, 255, 255, 0.08);
  transition: all 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
  }
}

.canvas-box-dragging, .canvas-box-dragging:hover {
  background: rgba(255, 255, 255, 0.16);
}
</style>
