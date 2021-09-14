
<template>
    <div class="weather-con">
        <div class="weather-pm">
            <span>PM2.5</span>
            <span>{{ valueData.airQuality }}</span>
        </div>
        <div class="weather-data">
            <div class="flex-item">
                <img
                    src="../../assets/img/temperature.png"
                    alt=""
                />
                <span class="weather">{{ valueData.weather }}</span>
            </div>
            <div class="flex-item">
                <img

                    src="../../assets/img/temperature.png"
                    alt=""
                />
                <span class="temperature">{{ valueData.temperature }}℃</span>
            </div>
            <div class="dateTime-item">
                <p class="time">{{ valueData.time }}</p>
                <p class="date">{{ valueData.date }}</p>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    props: ['item'],
    computed:{
        valueData(){
            return this.item.data.datacon
        }
    }
};
</script>

<style lang="scss">
    .weather-con{
        font-size: 18px;
        color: #b7cadf;
        // width: 376px;
        background-color: rgba(4,20,17,.88);
        color: #bfe1cf;
        padding: 20px;
        .weather-pm{
            display: flex;
            align-items: center;
            color: #b7cadf;
            padding: 0px 10px;
        }
        .weather-data{
            display: flex;
            align-items: center;
            justify-content: space-around;
            img{
                width: 17px; height: 28px;
            }
            .flex-item{
                display: flex;
                align-items: center;
                font-size: 24px;
                font-weight: 600;
            }
            .dateTime-item{
                text-align: center;
                .time{
                    font-size: 20px;
                    font-weight: 600;
                    margin: 0;
                }
                .date{
                    font-size: 14px;
                    margin: 0;
                }
            }
        }
    }
</style>
