<template>
    <div
        class="bordercontainer"
        :style="{ opacity: item.data.datacon.opacity }"
    />
</template>

<script>
export default {
    name: 'CMask',
    props: ['item'],
}
</script>

<style scoped lang="scss">
.bordercontainer {
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    &.border1 {
        border: 50px solid transparent;
        border-image: url("./../../assets/img/borders/1.png") 50;
    }

    &.border2 {
        border: 50px solid transparent;
        border-image: url("./../../assets/img/borders/2.png") 50;
    }

    &.border3 {
        border: 50px solid transparent;
        border-image: url("./../../assets/img/borders/3.png") 50;
    }
}
</style>
