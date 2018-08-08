<style scoped>



</style>

<template>

<div class="container">
    We are at an article {{ serverOrClient }}
</div>

</template>

<script>

export default {
    name: 'Article',
    asyncData({
        req
    }) {
        return {
            serverOrClient: req ? 'server' : 'client'
        }
    },
    data() {

    },
}

</script>
