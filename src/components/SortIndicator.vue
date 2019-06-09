<template>
    <span>
        <span v-if="sort === 'asc'">↓</span>
        <span v-if="sort === 'desc'">↑</span>
    </span>
</template>

<script>
export default {
    name: 'SortIndicator',
    props: ['sort']
}
</script>