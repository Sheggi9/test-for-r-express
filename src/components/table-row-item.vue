<template>
    <div class="table-rows">
      <div class="table-row table-row_title-wrapper">
        <div class="table-row-title-text">Title</div>
        <input type="text" class="table-row-title-value" :class="{error : title == ''}" :value="title" @input="updateTitle({$event, index, title})">
        <div class="table-row_error" v-if="title == ''">Min symbols: 1</div>
      </div>
      <div class="table-row table-row_description-wrapper">
        <div class="table-row-description-text">Description</div>
        <input type="text" class="table-row-title-value" :class="{error : description == ''}" :value="description" @input="updateDescription({$event, index, lastDescription})">
        <div class="table-row_error" v-if="description == ''">Min symbols: 1</div>
      </div>
      <div class="table-row table-row_price-wrapper">
        <div class="table-row-price-text">Price</div>
        <input type="text" class="table-row-title-value" :class="{error : !this.isNumber}" :value="price" @input="updatePrice({$event, index, price})">
        <div class="table-row_error" v-if="this.price == ''">Min symbols: 1</div>
        <div class="table-row_error" v-if="!this.isNumber && this.price.length >= 1">Not a number</div>
      </div>
      <div class="table-row table-row_data-wrapper">
        <div class="table-row-data-text">Data</div>
        <div class="table-row-data-value">{{time}}</div>
      </div>
      <div class="table-row table-row_del-wrapper">
        <button class="table-del-product" @click="deleteProduct(index)">Удалить</button>
      </div>
    </div>
</template>

<script>
export default {
  props: [
    'index',
    'title',
    'description',
    'price',
    'time'
  ],
  name: 'table-row-item',
  data () {
    return {
      lastTitle: this.title,
      lastDescription: this.description,
      lastPrice: this.price,
      isNumber: true
    }
  },
  methods: {
    updateTitle (event) {
      this.$store.commit('appStore/updateTitle', {event})
    },
    updateDescription (event) {
      this.$store.commit('appStore/updateDescription', {event})
    },
    updatePrice (event) {
      this.$store.commit('appStore/updatePrice', {event})
      const reg = new RegExp('^\\d+$')
      let priceValue = event.$event.target.value.trim()
      if (reg.test(priceValue)) {
        this.isNumber = true
      } else {
        this.isNumber = false
      }
    },
    deleteProduct (index) {
      this.$store.commit('appStore/deleteProduct', index)
    },
    checkPrice () {
      const reg = new RegExp('^\\d+$')
      if (reg.test(this.price)) {
        this.isNumber = true
      } else {
        this.isNumber = false
      }
    }
  },
  mounted () {
    this.checkPrice()
  },
  updated () {
    this.checkPrice()
  }
}
</script>

<style lang="scss" scoped>
  div,input{
    box-sizing: border-box;
  }
  .table-rows{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 10px 0 0;
    border: 1px solid black;
  }
  .table-row{
    width: 100%;
    min-width: 100px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 10px 10px;
  }
  .table-del-product{
    height: 22px;
    max-width: 75px;
    min-width: 75px;
    align-self: center;
    margin-right: 0;
  }
  .error{
    border: 1px solid red;
  }
  .table-row-title-value{
    width: 100%;
  }
  .table-row-price-text{
    width: 100%;
  }
  .table-row_del-wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
