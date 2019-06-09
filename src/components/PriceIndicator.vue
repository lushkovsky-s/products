<template>
    <span v-if="price">{{ price | formatNumber }} {{ currency }}</span>
</template>

<script>
export default {
    name: 'PriceIndicator',
    props: {
        price: {
            type: Number
        },
        currency: {
            type: String,
            default: '₽'
        }
    },
    filters: {
        formatNumber: value => {
        const thousands = parseInt(value / 1000)
        const rest = value % 1000

        return `${thousands} ${rest}`
        }
    }
}
</script>