import axios from 'axios'
// 创建axios实例
const instance = axios.create({
    timeout: 1000 * 10,
})

export default {
    data() {
        return {
            timer: '', // 动态
            key: '', // 更新锁
        }
    },
    watch: {
        dataConfig(val) {
            console.log(val)
            this.updateData()
        },
        immediate: true,
        deep: true,
    },
    computed: {
        isApi() {
            return this.dataConfig.dataType === 2
        },
    },
    methods: {
        init() {
            // this.updateData()
        },
        // 更新数据核心方法
        updateData() {
            console.log(666)
            return new Promise((resolve, reject) => {
                this.resetData && this.resetData()
                if (this.key) return
                this.key = true
                const callback = () => {
                    this.key = false
                    // 动态数据
                    console.log(this.dataConfig)
                    if (this.isApi && this.dataConfig.requestType && this.dataConfig.url) {
                        instance[this.dataConfig.requestType](this.dataConfig.url, this.dataConfig.query).then(res => {
                            if (res.data === 200) {
                                this.dataConfig.data = res.data
                            } else {
                                this.$message.error('接口报错')
                            }
                        }).catch(() => {
                            this.$message.error('接口报错')
                        })
                    } else {
                        // 静态数据
                        if (typeof this.dataConfig.dataFormatter === 'function') {
                            this.dataConfig.data = this.dataConfig.dataFormatter(this.dataConfig.data)
                        } else {
                            // this.dataConfig.data = this.data;
                        }
                    }
                }
                this.$nextTick(() => {
                    callback()
                    clearInterval(this.checkChart)
                    if (this.dataConfig.time !== 0 && this.disabled) {
                        this.timer = setInterval(() => {
                            callback()
                        }, this.dataConfig.time)
                    }
                })
            })
        },
    },
    mounted() {
        this.init()
    }
}
