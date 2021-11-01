<template>
    <el-container class="list">
        <!-- <el-aside width="200px">
            <el-menu
                :default-active="activeName"
                background-color="#171b22"
                text-color="#fff"
                active-text-color="#00baff"
                @select="handleSelect"
            >
                <el-menu-item
                    v-for="item in typelist"
                    :key="item.categoryValue"
                    :index="item.categoryValue"
                    @click="getList(item.categoryValue)"
                >
                    <i class="el-icon-s-order" />
                    {{ item.categoryKey }}
                </el-menu-item>
            </el-menu>

        </el-aside> -->
        <el-container>
            <el-header class="page">
                <el-pagination
                    layout="total, sizes, prev, pager, next, jumper"
                    background
                    size="mini"
                    :page-size="page.size"
                    :current-page.sync="page.page"
                    :total="page.total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                />
            </el-header>
            <el-main class="content">
                <div
                    class="content__item content__item--add"
                    @click="addNewChart"
                >
                    <div>
                        <i class="el-icon-plus" />
                        <p>新建大屏</p>
                    </div>
                </div>
                <div
                    v-for="(item,i) in chartList"
                    :key="i"
                    class="content__item"
                    @mouseover="item._menu = true"
                    @mouseout="item._menu = false"
                >
                    <div class="content__info">
                        <img
                            v-if="item.img"
                            :src="item.img"
                            alt=""
                        />
                        <div
                            v-show="item._menu"
                            class="content__menu"
                        >
                            <div
                                class="content__btn"
                                @click="editChart(item._id)"
                            >
                                编辑
                            </div>
                            <div
                                class="content__btn"
                                @click="viewChart(item._id)"
                            >
                                访问
                            </div>
                        </div>
                    </div>
                    <div class="content__main">
                        <span class="content__name">{{ item.title }}</span>
                        <div class="content__menulist">
                            <div class="content__view">
                                <el-tooltip content="删除">
                                    <i
                                        class="el-icon-delete"
                                        @click="deleteChart(item._id)"
                                    />
                                </el-tooltip>
                                <el-tooltip content="编辑">
                                    <i
                                        class="el-icon-edit"
                                        @click="editChart(item._id)"
                                    />
                                </el-tooltip>
                                <el-tooltip content="预览">
                                    <i
                                        class="el-icon-view"
                                        @click="viewChart(item._id)"
                                    />
                                </el-tooltip>
                                <el-tooltip content="复制">
                                    <i
                                        class="el-icon-copy-document"
                                        @click="copyChart(item)"
                                    />
                                </el-tooltip>
                            </div>
                            <!-- <span
                                class="content__status"
                                :class="{ 'content__status--active': item.status }"
                            >
                                {{ item.status ? '已发布' : '未发布' }}
                            </span> -->
                        </div>

                    </div>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
    name: 'List',
    data() {
        return {
            user: {
                uid: localStorage.getItem('uid'),
                username: localStorage.getItem('user'),
            },
            page: {
                page: 1,
                size: 10,
                total: 100,
            },
            chartList: [],
            analyseData: [],
            analyseVisible: false,
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        getData() {
            this.$http
                .get(`/chart?uid=${this.user.uid}&pageNo=${this.page.page ?? ''}&pageSize=${this.page.size ?? ''}`)
                .then((res) => {
                    const { errno, data } = res.data
                    if (errno === 0) {
                        this.chartList = data.chartList
                        this.page.total = data.total
                        this.chartList.forEach((ele, index) => {
                            this.$set(this.chartList[index], '_menu', false)
                        })
                    }
                })
                .catch(() => {})
        },
        handleSizeChange(val) {
            this.page.size = val
            this.getData()
        },
        handleCurrentChange(val) {
            this.page.page = val
            this.getData()
        },
        editChart(id) {
            this.$router.push(`/edit/${id}`)
        },
        addNewChart() {
            this.$prompt('输入大屏标题', '创建大屏项目', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            })
                .then(({ value }) => {
                    this.$http
                        .post('/chart', {
                            title: value,
                            uid: this.user.uid,
                        })
                        .then((res) => {
                            const { errno, data } = res.data
                            if (errno === 0) {
                                this.$message({
                                    type: 'success',
                                    message: '创建成功',
                                })
                                // this.getData();
                                this.editChart(data._id)
                            }
                        })
                        .catch(() => {})
                })
                .catch(() => {})
        },
        renameChart(row) {
            this.$prompt('输入大屏标题', '重命名', {
                inputValue: row.title,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            })
                .then(({ value }) => {
                    this.$http
                        .put(`/chart/${row._id}`, {
                            title: value,
                        })
                        .then((res) => {
                            const { errno } = res.data
                            if (errno === 0) {
                                this.$message({
                                    type: 'success',
                                    message: '保存成功',
                                })
                                setTimeout(() => {
                                    this.getData()
                                }, 100)

                                // this.editChart(data._id);
                            }
                        })
                        .catch(() => {})
                })
                .catch(() => {})
        },
        copyChart(row) {
            this.$prompt('输入大屏标题', '复制大屏项目', {
                inputValue: row.title + '_复制',
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            })
                .then(({ value }) => {
                    this.$http
                        .post(`/chart/import/${row._id}`, {
                            title: value,
                            uid: this.user.uid,
                        })
                        .then((res) => {
                            const { errno } = res.data
                            if (errno === 0) {
                                this.$message({
                                    type: 'success',
                                    message: '创建成功',
                                })
                                this.getData()
                                // this.editChart(data._id);
                            }
                        })
                        .catch(() => {})
                })
                .catch(() => {})
        },
        deleteChart(id) {
            this.$confirm('是否删除大屏项目？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    this.$http.delete(`/chart/${id}`).then((res) => {
                        const { errno } = res.data
                        if (errno === 0) {
                            this.$message({
                                type: 'success',
                                message: '已删除',
                            })
                            setTimeout(() => {
                                this.getData()
                            }, 100)
                            // this.editChart(data._id);
                        }
                    })
                })
                .catch(() => {})
        },
        viewChart(id) {
            this.$router.push(`/view/${id}`)
        },
        openChartAnalyse(row) {
            this.analyseVisible = true
            this.analyseData = [
                {
                    key: '创建时间',
                    value: this.$dayjs(row.createdAt).format('YYYY-MM-DD HH:mm'),
                },
                {
                    key: '修改时间',
                    value: this.$dayjs(row.updatedAt).format('YYYY-MM-DD HH:mm'),
                },
                {
                    key: '访问人数',
                    value: row.view,
                },
            ]
        },
    },
}
</script>
<style lang="scss">
.list{
  height: 100%;
  .el-menu{
    border-right: none;
  }
  .el-menu.el-menu--horizontal {
    border-color: rgb(33, 37, 40);
    border-width: 2px;
  }
  .page{
    padding: 20px 0 0 0;
    display: flex;
    justify-content: center;
  }
  .el-menu i {
    margin-right: 5px;
  }
  .content{
    display: flex;
    flex-wrap: wrap;
    &::-webkit-scrollbar {
    display: none;
    }
    &__item{
      position: relative;
      margin: 16px;
      display: flex;
      flex-direction: column;
      width: 266px;
      height: 184px;
      border: 1px solid #3a4659;
      box-sizing: border-box;
      overflow: hidden;
      &:hover {
        box-shadow: 0 0 20px 0 #000;
        border: 1px solid #00baff;
      }
      &--add {
        height: 184px;
        width: 266px;
        border: 1px solid #00baff;
        font-size: 14px;
        color: #8eeeff;
        background-image: linear-gradient(-90deg, rgba(0, 222, 255, .39) 0, rgba(0, 174, 255, .19) 100%);
        box-shadow: 0 0 10px 0 rgba(55, 224, 255, .3);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        i {
          display: block;
          padding-bottom: 10px;
          text-align: center;
          font-size: 19px;
        }
        p {
          letter-spacing: 2px;
        }

      }
    }
    &__main {
      font-size: 12px;
      width: 100%;
      height: 36px;
      display: flex;
      align-items: center;
      position: absolute;
      bottom: 0;
      justify-content: space-between;
      background: #1d262e;
      box-sizing: border-box;
      padding: 0 10px;
      color: #bcc9d4;
      a{
        color:#bcc9d4;
      }
      i{
        margin-right: 1px;
      }
    }
    &__view{
      margin-right: 2px;
    }
    &__menulist{
      display: flex;
      i{
        margin-right: 10px;
      }
    }
    &__status--active {
      color: #fff
    }
    &__name {
      width: 100px;
      padding: 0 5px;
      line-height: 28px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      border: 1px solid transparent;
    }
    &__info {
      position: relative;
      height: calc(100% - 36px);
    }
    &__menu {
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(29,38,46,0.8);
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    &__btn {
      margin: 5px 0;
      display: inline-block;
      vertical-align: middle;
      height: 32px;
      line-height: 32px;
      padding: 0 30px;
      box-sizing: border-box;
      outline: 0;
      text-align: center;
      font-size: 14px;
      background-image: linear-gradient(-225deg, #00d3f1 0, #12b3ff 100%);
      color: #293f52;
      border: none;
      transition: .3s ease;
      cursor: pointer
    }
    &__info{
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

</style>
