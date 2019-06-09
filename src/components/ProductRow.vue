<template>
  <tbody>
    <tr>
      <td><input type="checkbox" :checked="isChecked ? true : false" /></td>
      <td>
        <img
          v-if="photo"
          :src="photo"
          class="product-img"
          alt="product image"
        />
      </td>
      <td>
        {{ name }}
      </td>
      <td>
        <PriceIndicator :price="price" />
      </td>
      <td>
        <span class="articul atricul-one" v-if="options.length === 1">
          {{ options[0].articul }}
        </span>
        <span 
          class="articul articul-many" 
          v-if="options.length !== 1"
          v-on:click="onExpandClick()"  
        >
          {{ options.length }} варианта ˅
        </span>
      </td>
      <td>
        <AvailabilityIndicator :isAvailable="isAvailable" />
      </td>
      <td>
        <VisibilityToggler />
      </td>
      <td>
        <img src="../assets/three_dots.svg" alt="more" />
      </td>
    </tr>
    <tr class="row-expanded" v-show="expanded" v-for="(option, index) in options" :key="index">
      <td 
        v-if="index === 0" 
        :rowspan="options.length" 
        class="row-expanded__cell-colapse"  
      >
        <div
          class="row-expanded__cell-colapse__btn"
          v-on:click="onColapseClick()"
        >
          <span class="row-expanded__cell-colapse__btn__icon">︿</span>
        </div>
      </td>
      <td class="row-expanded__cell-img">
        <img class="row-expanded__cell-img__img" :src="photo" alt="option img" />
      </td>
      <td>{{ option.name }}</td>
      <td><PriceIndicator :price="option.price" /></td>
      <td>{{ option.articul }}</td>
      <td><AvailabilityIndicator :isAvailable="option.isAvailable" /></td>
      <td><VisibilityToggler /></td>
      <td><img src="../assets/three_dots.svg" alt="more" /></td>
    </tr>
  </tbody>
</template>

<script>
import AvailabilityIndicator from './AvailibilityIndicator'
import VisibilityToggler from './VisibilityToggler'
import PriceIndicator from './PriceIndicator'

export default {
  name: 'ProductRow',
  components: { AvailabilityIndicator, VisibilityToggler, PriceIndicator },
  data() { 
    return {
      expanded: false
    }
  },
  methods: {
    onExpandClick: function() {
      this.expanded = true
    },
    onColapseClick: function() {
      this.expanded = false
    }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      validator: price => price >= 0
    },
    options: {
      type: Array,
      required: true,
      validator: options => {
        const requiredFields = ['articul', 'name', 'price', 'isAvailable']
        const rightStructure = options.every(o => requiredFields.every(field => o[field]))
        const rightCount = options.length > 0

        const isValid = rightStructure && rightCount

        if (!isValid) {
          console.error(`"options" prop validation: rightStructure=${rightStructure} rightCount=${rightCount}`)
        }

        if (!rightStructure) {
          options.forEach((option, idx) => {
            requiredFields.forEach(field => {
              if (!option[field]) {
                console.log(`Missed field "${field}" on option ${idx}`)
              }
            })
          })
        }

        return isValid
      }
    },
    isAvailable: {
      type: Boolean,
      required: true
    },
    photo: {
      type: String
    },
    isChecked: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>
td {
  padding: 12px 0;

  background: #FFFFFF;
  border-top: 1px solid #E8EAED;
  border-bottom: 1px solid #E8EAED;
  box-sizing: border-box;
  border-radius: 6px;
  font-family: Inter;
  font-size: 15px;
  line-height: 26px;
  letter-spacing: -0.01em;
  color: #333333;
}

.product-img {
  border-radius: 50%;
  width: 50px;
}

.articul-one {
    color: #333333;
    opacity: 0.6;
}

.articul-many {
    color: #00A53A;
    cursor: pointer;
}

.row-expanded__cell-colapse {
  padding: 10px 0;
  position: relative;
}

.row-expanded__cell-colapse__btn {
  position: absolute;
  width: 100%;
  height: 90%;
  top: 5%;
  
  cursor: pointer;
  background: #F2F5F6;
  border-radius: 6px;
  color: #535557;
  text-align: center;
  vertical-align: middle;
}

.row-expanded__cell-colapse__btn__icon {
  position: absolute;
  top: 50%;
  left: 50%;  
  transform: translate(-50%, -50%);
}

.row-expanded__cell-img {
  text-align: right;
  padding: 10px 20px;
  width: 83px;
  border: none;
}

.row-expanded__cell-img__img {
  border-radius: 50%;
  width: 40px;
  height: 40px;
}
</style>
