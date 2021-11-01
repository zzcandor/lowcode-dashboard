<template>
    <div class="index">
        <div class="header">
            <img
                src="@/assets/img/bg/header.png"
                alt=""
                class="header-bg"
                width="100%"
                height="210px"
            />
            <div class="title">
                <p>
                    红星云-Dashbord<br />
                    <small>可视化数据大屏</small>
                </p>
            </div>
            <el-menu
                class="nav"
                mode="horizontal"
                :default-active="activeName"
                background-color="rgba(0,0,0,0)"
                text-color="#fff"
                active-text-color="#00baff"
                @select="handleSelect"
            >
                <el-menu-item index="1">
                    <i class="el-icon-menu" />
                    大屏管理
                </el-menu-item>
                <el-menu-item index="2">
                    <i class="el-icon-location-information" />
                    地图管理
                </el-menu-item>
                <el-menu-item index="3">
                    <i class="el-icon-folder-opened" />
                    分类管理
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-set-up" />
                    数据源管理
                </el-menu-item>
            </el-menu>
        </div>
        <div
            v-if="['1'].includes(activeName)"
            class="main"
        >
            <list v-if="activeName === '1'" />
        </div>
        <el-scrollbar
            v-else
            class="main"
        >
            <maps v-if="activeName === '2'" />
        </el-scrollbar>
    </div>
</template>
<script>
import list from './List'
import maps from './Map'
export default {
    name: 'Index',
    components: {
        list,
        maps,
    },
    data() {
        return {
            activeName: '1',
        }
    },
    created() {

    },
    methods: {
        handleSelect(key) {
            this.activeName = key
        },
    }
}
</script>
<style lang="scss">
.index {
  height: 100%;
  .header {
    position: relative;
    padding: 0;
    height: auto !important;
    &-bg{
        filter: brightness(0.5) contrast(200%);
    }
    .nav {
      margin: 0 20px;
      width: 100%;
      position: absolute;
      bottom: 10px;
      border: none;
      .el-menu-item {
        background-color: rgba(0, 0, 0, 0) !important;
      }
    }
    .title {
      position: absolute;
      top: 30px;
      left: 30px;
      font-size: 34px;
      color: rgb(0, 186, 255);
      font-weight: 500;
    }
    .title small {
      font-size: 18px;
    }
  }
  .main {
    width: 100%;
    height: calc(100% - 220px);
  }
}
</style>
