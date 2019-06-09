<template>
<table>
    <tr>
        <th>
            <input 
                type="checkbox" 
                :checked="isAllChecked ? true : false"
                v-on:click="checkAll()" 
            />
        </th>
        <th></th> <!-- Photo -->
        <th v-on:click="onSortableHeaderClick('name')">
            Название 
            <SortIndicator :sort="sortOrders.name" />
        </th>
        <th v-on:click="onSortableHeaderClick('price')">
            Цена, ₽
            <SortIndicator :sort="sortOrders.price" />
        </th>
        <th>Артикул</th>
        <th v-on:click="onSortableHeaderClick('isAvailable')">
            Запас товара
            <SortIndicator :sort="sortOrders.isAvailable" />    
        </th>
        <th>Опубликован</th>
        <th></th> <!-- 3 dots -->
    </tr>
    <ProductRow
        v-for="product in products"
        :key="product.id"
        :id="product.id"
        :name="product.name"
        :price="product.price"
        :photo="product.photo"
        :isAvailable="product.isAvailable"
        :isVisible="product.isVisible"
        :isChecked="product.isChecked"
        :options="product.options"
        @visibilityChange="(value, productId, optionIdx) => $emit('visibilityChange', value, productId, optionIdx)"
        @checked="$emit('productChecked', product.id)"
    />
</table>
</template>

<script>
import ProductRow from './ProductRow'
import SortIndicator from './SortIndicator'
import Store from '../store'

export default {
  name: 'ProductsTable',
  components: { ProductRow, SortIndicator },
  data() {
    return {
        sortOrders: {
            name: null,
            price: null,
            isAvaibale: null
        }
    }
  },
  methods: {
    onSortableHeaderClick: function(fieldName) {
      let order = this.sortOrders[fieldName]
      
      order = !order || order === 'desc' ? 'asc' : 'desc'

      // Reset all orders
      Object.keys(this.sortOrders).forEach(key => this.sortOrders[key] = null)

      this.sortOrders[fieldName] = order
      Store.sortProducts(fieldName, order) 
    }
  },
  fromMobx: { Store }
}
</script>

<style scoped>
table {
    border-collapse: collapse;
}

th {
    font-family: Object Sans;
    font-size: 15px;
    line-height: 17px;
    padding: 12px 0;
    text-align: left;
    cursor: pointer;
}
</style>
