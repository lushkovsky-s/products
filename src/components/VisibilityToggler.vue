<template>
<span>
    <img
      v-bind:style="{ opacity: isVisible ? .5 : 1 }"
      v-on:click="setVisibility(false)" 
      src="../assets/icon_invisible.svg" 
      alt="invisible" 
    />
    <img 
      v-bind:style="{ opacity: !isVisible ? .5 : 1 }"
      v-on:click="setVisibility(true)" 
      src="../assets/icon_visible.svg" 
      alt="visible" 
    />
</span>
</template>

<script>
export default {
  name: 'VisibilityToggler',
  props: {
    isVisible: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    setVisibility: function(value) {
      this.$emit('change', value)
    }
  }
}
</script>

<style scoped>
img {
  cursor: pointer;
}
</style>