<template>
<span>
    <span class="color-indicator" :data-color="isAvailable ? 'green' : 'gray'">●</span>
    <span v-if="isAvailable">В наличии</span>
    <span v-if="!isAvailable">Закончились</span>
</span>
</template>

<script>
export default {
    name: 'AvailabilityIndicator',
    props: {
        isAvailable: {
            type: Boolean,
            required: true
        }
    }
}
</script>

<style sroped>
.color-indicator[data-color="green"] {
    color: #1DB954;
}

.color-indicator[data-color="gray"] {
    color: lightgray;
}
</style>