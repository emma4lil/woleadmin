<template>
    <div>
        <h3>To be worked on...</h3>
        flyer-{{$route.params}}
        <br>
        {{id}}
    </div>
</template>

<script>
export default {
    data () {
        return {
            id: "string"
        }
    },
    mounted () {
        this.id = this.$route.params.id
    }
}
</script>