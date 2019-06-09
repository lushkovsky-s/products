<template>
  <span class="container">
    <input class="input" type="text" :placeholder="placeholder" @input="onInput"/>
    <img class="icon" src="./../assets/icon_search.svg" alt="seach icon" />
  </span>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    placeholder: {
      type: String,
      required: false,
      default: 'Search'
    }
  },
  methods: {
    onInput: function(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style scoped>
.container {
  position: relative;

  margin-left: 16px;
  width: 100%;
  height: 100%;
}

.icon {
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
}

.input {
  width: 100%;
  height: 100%;

  padding: 12px 40px;

  background: #F2F5F6;
  border-radius: 54px;
  font-family: Inter;
  font-size: 15px;
  line-height: 26px;
  border: none;
  letter-spacing: -0.01em;
}
</style>
