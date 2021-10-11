import axios from 'axios'

export default {
    data() {
        return {
            timer: '', // 动态
            key: '', // 更新锁
        }
    },
    watch: {
        config() {
            this.updateData()
        }
    },
    computed: {
        isApi() {
            return this.config.dataType === 2
        },
    },
    methods: {
        init() {
            this.updateData()
        },
        // 更新数据核心方法
        updateData() {
            return new Promise((resolve, reject) => {
                this.resetData && this.resetData()
                if (this.key) return
                this.key = true
                const callback = () => {
                    this.key = false
                    // 动态数据
                    if (this.isApi && this.config.requestType && this.config.url) {
                        axios[this.config.requestType](this.config.url, this.config.query).then(res => {
                            if (res.data === 200) {
                                this.config.data = res.data
                            } else {
                                this.$message.error('接口报错')
                            }
                        }).catch(() => {
                            this.$message.error('接口报错')
                        })
                    } else {
                        // 静态数据
                        if (typeof this.config.dataFormatter === 'function') {
                            this.config.data = this.config.dataFormatter(this.config.data)
                        } else {
                            // this.config.data = this.data;
                        }
                    }
                }
                this.$nextTick(() => {
                    callback()
                    clearInterval(this.checkChart)
                    if (this.config.time !== 0 && this.disabled) {
                        this.timer = setInterval(() => {
                            callback()
                        }, this.config.time)
                    }
                })
            })
        },
    },
    mounted() {
        this.init()
    }
}
