<template>
    <div
        class="textcontainer"
        :style="{
                                            fontFamily: item.data.datacon.fontFamily,
                                            fontWeight: item.data.datacon.bold ? 'bold' : 'normal',
                                            fontStyle: item.data.datacon.italic ? 'italic' : 'normal',
                                            color: item.data.datacon.color,
                                            fontSize: item.data.datacon.fontSize + 'px',
                                            textStroke: item.data.datacon.stroke
                                                ? item.data.datacon.strokeSize +
                                                    'px ' +
                                                    item.data.datacon.strokeColor
                                                : '0',
                                            textShadow: item.data.datacon.shadow
                                                ? '5px 5px ' +
                                                    item.data.datacon.shadowBlur +
                                                    'px ' +
                                                    item.data.datacon.shadowColor
                                                : 'none',
                                        }"
        v-text="item.data.datacon.text"
    />
</template>

<script>
export default {
    name: "Ctextcontainer",
    props: ['item'],
}
</script>

<style scoped lang="scss">
.textcontainer {
    word-wrap: break-word;
}
</style>
