<template>
    <div>
        <div style="width: 100%;" class="d-flex justify-start">
            <div>
                <v-card flat outlined width="mx-auto">
                    <v-card-text>
                        <h2 class="primary--text">{{ text }}</h2>
                    </v-card-text>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PageHeader",
    props: ["text"],
    data() {
        return {
            text: "Hello World"
        }
    },
}
</script>