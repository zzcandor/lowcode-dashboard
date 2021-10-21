<template>
    <div class="dataBuild">
        <el-form
            label-width="120px"
            label-position="left"
            size="mini"
        >
            <el-form-item label="数据类型">
                <el-radio v-model="activeObj.dataType" :label="1">静态数据</el-radio>
                <el-radio v-model="activeObj.dataType" :label="2">接口</el-radio>
                <!--                <el-radio v-model="activeObj.dataType" :label="3">SQL</el-radio>-->
            </el-form-item>
            <el-form-item label="刷新时间">
                <number-input v-model="activeObj.refreshTime" />
            </el-form-item>
            <template v-if="isApi">
                <el-form-item label-width="0">
                    <el-button
                        size="mini"
                        type="primary"
                        class="block"
                        @click="handleSql"
                    >
                        编辑Api接口
                    </el-button>
                </el-form-item>
            </template>
            <el-form-item
                v-if="isStatic"
                label-width="0"
            >
                <el-button
                    size="mini"
                    type="primary"
                    class="block"
                    @click="handleSql"
                >
                    <span>编辑静态数据</span>
                </el-button>
            </el-form-item>
            <el-form-item label-width="0">
                <el-button
                    size="mini"
                    type="primary"
                    class="block"
                    @click="getData"
                >刷新数据
                </el-button>
            </el-form-item>
        </el-form>
        <el-dialog
            append-to-body
            :close-on-click-modal="false"
            :visible.sync="show"
            width="60%"
        >
            <el-form
                size="small"
                label-width="130px"
            >
                <div v-show="isApi">
                    <el-form-item label="接口地址">
                        <el-input v-model="activeObj.url" />
                    </el-form-item>
                    <el-form-item label="请求方式">
                        <el-select v-model="activeObj.requestType" placeholder="请选择">
                            <el-option label="GET" value="get" />
                            <el-option label="POST" value="post" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="请求参数">
                        <monacoEditor v-model="queryEditor" />
                    </el-form-item>
                </div>
                <el-form-item label="响应数据">
                    <monacoEditor v-model="editorVal" />
                </el-form-item>
                <el-form-item v-show="isApi" label="数据处理">
                    <div class="monacoEditor">
                        <monacoEditor v-model="dataFormatEditor" />
                        <monacoEditor v-model="tip" />
                    </div>
                </el-form-item>
                <el-form-item label-width="0px">
                    <el-button
                        size="small"
                        type="primary"
                        @click="getData"
                    >刷新数据
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'DataBuild',
    inject: ['CElement'],
    props: {
        activeObj: {
            type: Object,
        },
        dataVal: {
            type: [String, Number, Array, Object]
        }
    },
    data() {
        return {
            show: false,
            db: '',
            sql: '',
            DIC: {
                sql: [],
            },
            editorVal: '', // 数据
            queryEditor: '', // 参数数据
            dataFormatEditor: '', // 数据处理方法
            tip: '',
        }
    },
    computed: {
        isStatic() {
            return this.activeObj.dataType === 1
        },
        isApi() {
            return this.activeObj.dataType === 2
        },
    },
    created() {
        this.tip = `
//data为返回的数据
/**
 * 说明：只有样式编辑、数据处理、组件事件方法需要返回函数
 * 静态数据或者配置数据直接返回JSON对象即可
 * 不写的话采用默认加载
*/
#数据处理/样式处理
(data)=>{
  //处理数据逻辑
  return {
    //返回图表的标准数据结构体
  }
}

#事件处理
({name,type,value,data})=>{
  //直接写执行的逻辑即可
  console.log(data,name)
}

#提示处理
(name,data) => {
  return 返回需要展示的文本
}

#文本框/图片框/Iframe框等通用数据格式
{
  value:'xxxxx'
}

#柱状图数据格式
{
  "categories": [
    "苹果",
  ],
  "series": [{
    "name": "手机品牌",
    "data": [
      1000879,
    ]
  }]
}

#折线图数据格式
{
  "categories": [
    "苹果",
  ],
  "series": [{
    "name": "手机品牌",
    "data": [
      1000879,
    ]
  }]
}

#饼图数据格式
[{
    "name": "PC",
    "value": 97,
    "url": "http://www.baidu.com"
},{
    "name": "PC",
    "value": 97,
    "url": "http://www.baidu.com"
}]

#象型图数据格式
{
  "categories": [
    "苹果",
  ],
    "series": [{
      "name": "手机品牌",
      "data": [
        1000879,
      ]
    }]
}
#雷达图数据格式
{
  indicator: [{
    name: '销售',
    max: 6500
  }],
  series: [{
    data: [{
      value: [4300, 10000, 28000, 35000, 50000, 19000],
      name: '预算分配（Allocated Budget）'
    }]
  }]
}
#散点图数据格式
[{
  data: [
    [1, 8.04],
    [2, 6.95]
  ]
},
{
  data: [
    [1, 4.04],
    [2, 3.95]
  ]
}]
#漏斗图数据格式
[{
  value: 335,
  name: '直接访问'
},
{
  value: 310,
  name: '邮件营销'
},
{
  value: 234,
  name: '联盟广告'
}]

#轮播图数据格式
[{
  value: '图片地址'
},
{
  value: '图片地址2'
}]

#地图数据格式
[{
  "name": "测试坐标1",
  "value": 1,
  "lng": 118.30078125,
  "lat": 36.91915611148194,
  "zoom": 1
},
{
  "name": "测试坐标2",
  "value": 1,
  "lng": 112.21435546875,
  "lat": 37.965854128749434,
  "zoom": 1
}]
 `
    },
    methods: {
        getData() {
            let value = this.dataFormatEditor
            if (value) {
                try {
                    eval('(' + value + ')')
                    if (['query', 'data'].includes(this.type)) {
                        value = eval('(' + value + ')')
                    }
                    this.activeObj.dataFormatter = value
                } catch (error) {
                    this.$message.error('数据格式有误')
                }
            }
            this.activeObj.query = this.queryEditor

            if (this.isStatic) {
                this.activeObj.data = this.editorVal
            }
        },
        handleChartDataChange(val) {
            console.log(val)
        },
        handleSql() {
            this.show = true
            if (this.isStatic) {
                this.editorVal = this.dataVal
            } else {
                this.editorVal = ''
            }
        }
    }
}
</script>

<style scoped lang="scss">
/deep/ .el-form-item__label {
    color: #fff;
}

/deep/ .el-input__inner {
    color: #fff;
}

.block {
    width: 100%;
}

/deep/ .el-dialog__header {
    background-color: #000;
}

/deep/ .el-dialog__body {
    background-color: #000;
}

/deep/ .jsoneditor-menu {
    display: none;
}

.monacoEditor {
    display: flex;
}
</style>
