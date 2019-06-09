import { observable, action, computed } from 'mobx'

class Store {
  @observable _products = [
    {
      id: 1,
      name: 'Рубашка поло',
      price: 2200,
      isAvailable: true,
      isVisible: true,
      photo: require('./assets/products_polo.png'),
      options: [
        {
          name: 'Some', 
          price: 2200, 
          isAvailable: true, 
          articul: 32578765
        }
      ]
    },
    {
      id: 2,
      name: 'Толстовка мягкая',
      price: 3500,
      isAvailable: true,
      isVisible: true,
      photo: require('./assets/products_polo.png'),
      options: [
        {
          name: 'Синяя', 
          price: 2200, 
          isAvailable: true, 
          articul: 32578765
        },
        {
          name: 'Жлтая', 
          price: 2200, 
          isAvailable: true, 
          articul: 32578765
        }
      ]
    },
    {
      id: 3,
      name: 'Кепка',
      price: 1200,
      isAvailable: false,
      isVisible: true,
      photo: require('./assets/products_polo.png'),
      options: [
        {
          name: 'Красная', 
          price: 2200, 
          isAvailable: true, 
          articul: 32578765
        }
      ]
    }
  ]
  @observable filters = {
    'tags': null, 
    'name': null
  }
  @observable isAllChecked = false

  @computed get products() {
    const filtered = this._products.filter(product => {
      if (this.filters.onMainPage) {
        if (!product.onMainPage) {
          return false
        }
      }

      if (!this.filters.showNotVisible) {
        if (!product.isVisible) {
          return false
        }
      }

      if (this.filters.name) {
        const match = product.name.toLowerCase().indexOf(this.filters.name.toLowerCase()) >= 0
        
        if (!match) {
          return false
        }
      }

      return true
    })

    return filtered
  }

  @action sortProducts(field, type='asc') {
    this._products = this._products.slice().sort((a, b) => {
      if (typeof a[field] === 'number' || typeof a[field] === 'boolean') {
        return a[field] - b[field]
      } else if (typeof a[field] === 'string') {
        return a[field][0] > b[field][0] ? 1 : -1
      } 

      throw new Error(`Unexpected sort field type: ${typeof a[field]} (field: ${field})`)
    })

    if (type === 'desc') {
      this._products = this._products.slice().reverse()
    }
  }

  @action updateVisibility(productId, optionIdx, value) {
    const productIdx = this._products.findIndex(product => product.id === productId)
    let newProducts = this._products.slice()
    
    if (optionIdx !== undefined) {      
      let newOptions = newProducts[productIdx].options.slice()
      newOptions[optionIdx].isVisible = value
      newProducts[productIdx].options = newOptions
    } else {
      newProducts[productIdx].isVisible = value
    }

    this._products = newProducts
  }

  @action toggleProductCheck(productId) {
    const productIdx = this._products.findIndex(product => product.id === productId)
    let newProducts = this._products.slice()

    newProducts[productIdx].isChecked = !newProducts[productIdx].isChecked

    this._products = newProducts
  }

  @action updateFilter(filterName, filterValue) {
    this.filters = {...this.filter, [filterName]: filterValue}
  }

  @action checkAll() {
    this.isAllChecled = !this.isAllChecled
    this._products = this._products.map(product => ({...product, isChecked: this.isAllChecled}))
  }
}        

const store = new Store()
export default store
