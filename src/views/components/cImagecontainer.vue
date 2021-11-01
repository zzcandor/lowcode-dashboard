<template>
    <div
        class="imagecontainer"
        :style="{
            backgroundImage: `url(${item.data.datacon.img})`,
            backgroundSize: item.data.datacon.imgSize,
            opacity: item.data.datacon.opacity,
        }"
    >
        <div v-show="!item.data.datacon.img" class="placeholder" />
    </div>
</template>

<script>
export default {
    name: 'Cimagecontainer',
    props: ['item'],
}
</script>

<style scoped lang="scss">
.imagecontainer {
    width: 100%;
    height: 100%;

    .placeholder {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
    }
}
</style>
