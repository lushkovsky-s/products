<template>
  <div id="app">
    <div>
      <h1>Все товары</h1>
    </div>
    <div class="row-commands">
      <button class="btn-primary">Новый товар</button>
      <button class="btn-secondary btn-noborder">
        <img src="./assets/icon_import.svg">&nbsp;Импорт
      </button>
      <button class="btn-secondary btn-noborder">
        <img src="./assets/icon_export.svg">&nbsp;Экспорт
      </button>
    </div>
    <div class="row-filters">
      <button class="row-filters__filters-button btn-secondary">
        <img src="./assets/icon_filter.svg">&nbsp;Фильтры
      </button>
      <SearchBar 
        class="row-filters__searchbar" 
        placeholder="Поиск товаров"
        @input="onSearchBarInput"  
      />
      <div class="row-filters__checkboxes-area">
        <div class="checkbox">
          <input 
            type="checkbox" 
            class="checkbox__input"
            @change="(e) => onFilterClick('onlyMainPage', e.target.checked)"  
          />
          <span class="checkbox__label">На главной</span>
        </div>
        <div class="checkbox">
          <input 
            type="checkbox" 
            class="checkbox__input"
            @change="(e) => onFilterClick('showNotVisible', e.target.checked)" 
          /> 
          <span class="checkbox__label">Скрытые</span>
        </div>
      </div>
    </div>
    <div>
      <ProductsTable 
        @visibilityChange="onVisibilityChange"
        @productChecked="onProductChecked"
      />
    </div>
  </div>
</template>

<script>
import ProductsTable from './components/ProductsTable'
import SearchBar from './components/SearchBar'
import Store from './store'

export default {  
  name: 'App',
  components: { ProductsTable, SearchBar },
  methods: {
    onProductChecked(productId) {
      Store.toggleProductCheck(productId)
    },
    onFilterClick(filterName, filterValue) {
      Store.updateFilter(filterName, filterValue)
    },
    onVisibilityChange(value, productId, optionIdx) {
      Store.updateVisibility(productId, optionIdx, value)
    },
    onSearchBarInput(input) {
      Store.updateFilter('name', input)
    }
  }
}
</script>

<style>
@font-face {
  font-family: "Object Sans";
  src: url('./../static/ObjectSans-Regular.otf');
}

@font-face {
  font-family: "Inter";
  src: url('./../static/Inter-Regular.ttf');
}

#app {
  padding: 64px 135px;
}

h1 {
  font-family: Object Sans;
  font-size: 48px;
  line-height: 50px;
  letter-spacing: 0.01em;
  color: #333333;
  margin: 0;
}

.btn-primary {
  background: #1DB954;
  border-radius: 80px;
  color: #fff;
  border: none;
  padding: 14px 28px;
  font-family: Object Sans;
  font-size: 12px;
  line-height: 12px;
  text-align: center;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.btn-secondary {
  opacity: 0.5;
  border-radius: 51px;
  background: transparent;
  border: 1px solid #B4BBC1;
  font-family: Object Sans;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.01em;
  color: #82888D;
  padding: 7px 16px;
}

.btn-secondary img {
  vertical-align: middle;
}

.row-commands {
  margin: 31px 0;
}

.row-filters {
  margin-bottom: 40px;
  display: flex;
}

.row-filters__filters-button {
  flex: 2
}

.row-filters__searchbar {
  flex: 10;
  margin-left: 16px;
}

.row-filters__checkboxes-area {
  flex: 8;
  margin-left: 16px;
}

.checkbox {
  display: inline-block;
  margin-top: 7px;
  margin-right: 10px;
  font-family: Object Sans;
  font-size: 12px;
}

.checkbox__input {
  display: inline-block;
  vertical-align: middle;
}

.checkbox__label {
  display: inline-block;
  vertical-align: middle;
}

table {
  width: 100%;
}

.btn-noborder {
  border: none;
}

input[type="checkbox"] {
  appearance: none;
  background-color: #fff;
  border: 1px solid #8E8E93;
  width: 20px;
  height: 20px;
  display: inline-block;
  position: relative;
}

input[type="checkbox"]:checked {
  background-color: #1DB954;
  border: none;
}

input[type='checkbox']:checked:before {
  content: '✔';
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
}
</style>
