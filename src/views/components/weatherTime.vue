<template>
    <div class="weather-con" :style="{ background: valueData.data.datacon.backgroundColor }">
        <div class="weather-pm">
            <span>PM2.5</span>
            <span>{{ valueData.data.datacon.airQuality }}</span>
        </div>
        <div class="weather-data">
            <div class="flex-item">
                <img
                    :src="valueData.data.datacon.weatherUrl"
                    alt=""
                />
                <span class="weather">{{ valueData.data.datacon.weather }}</span>
            </div>
            <div class="flex-item">
                <img
                    :src="valueData.data.datacon.temperatureUrl"
                    alt=""
                />
                <span class="temperature">{{ valueData.data.datacon.temperature }}℃</span>
            </div>
            <div class="dateTime-item">
                <p class="time">{{ nowtime }}</p>
                <p class="date">{{ nowdate }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
    props: {
        item: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            date: new Date()
        }
    },
    computed: {
        valueData() {
            return this.item
        },
        nowdate() {
            return dayjs(this.date).format('YYYY-MM-DD')
        },
        nowtime() {
            return dayjs(this.date).format('hh:mm:ss')
        },
    },
    created() {
        setInterval(() => {
            this.date = new Date()
        }, 1000)
    },
}
</script>
<style lang="scss">
.weather-con {
    font-size: 18px;
    color: #b7cadf;
    height: 100%;
    width: 100%;
    min-height: 100px;
    min-width: 400px;
    background-color: rgba(4, 20, 17, 0.88);
    // padding: 20px;
    .weather-pm {
        display: flex;
        align-items: center;
        color: #b7cadf;
        padding: 20px;
        span {
            padding-left: 5px;
        }
    }
    .weather-data {
        display: flex;
        height: calc(100% - 108px);
        align-items: center;
        justify-content: space-around;
        img {
            width: 17px;
            height: 28px;
        }
        .flex-item {
            display: flex;
            align-items: center;
            font-size: 24px;
            font-weight: 600;
        }
        .dateTime-item {
            text-align: center;
            .time {
                font-size: 20px;
                font-weight: 600;
                margin: 0;
            }
            .date {
                font-size: 14px;
                margin: 0;
            }
        }
    }
}
</style>
