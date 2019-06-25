<template>
  <div class="main">
      <table-row-item :key="index" v-for="(item, index) in shoppingList"
                      :index = index
                      :title = item.title
                      :description = item.description
                      :price = item.price
                      :time = item.time
      ></table-row-item>
    <div class="form">
      <div class="form-input">
        <input class="form-input_set-title" :value="newProduct.title" :class="{error: titleError}" @input="setTitle" type="text" placeholder="Введите название товара">
        <div class="form-input_error">{{titleError}}</div>
      </div>
      <div class="form-input">
        <input class="form-input_set-description" :value="newProduct.description" :class="{error: descriptionError}" @input="setDescription" type="text" placeholder="Введите описание товара">
        <div class="form-input_error">{{descriptionError}}</div>
      </div>
      <div class="form-input">
        <input class="form-input_set-price" :value="newProduct.price" :class="{error: priceError}" @input="setPrice" type="text" placeholder="Введите цену товара">
        <div class="form-input_error">{{priceError}}</div>
      </div>
      <div class="form-input">
        <button class="form-add-product" @click="addProduct">Добавить</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import TableRowItem from '@/components/table-row-item'

export default {
  name: 'tList',
  components: {TableRowItem},
  methods: {
    setTitle (e) {
      this.$store.commit('appStore/setTitle', e.target.value)
      this.$store.dispatch('appStore/validateTitle')
    },
    setDescription (e) {
      this.$store.commit('appStore/setDescription', e.target.value)
      this.$store.dispatch('appStore/validateDescription')
    },
    setPrice (e) {
      this.$store.commit('appStore/setPrice', e.target.value)
      this.$store.dispatch('appStore/validatePrice')
    },
    addProduct () {
      this.$store.dispatch('appStore/validateForm')
    }
  },
  computed: {
    ...mapState({
      shoppingList: state => state.appStore.shoppingList,
      titleError: state => state.appStore.titleError,
      descriptionError: state => state.appStore.descriptionError,
      priceError: state => state.appStore.priceError,
      newProduct: state => state.appStore.newProduct
    })
  },
  mounted () {
    this.$store.commit('appStore/setTitleError', '')
    this.$store.commit('appStore/setDescriptionError', '')
    this.$store.commit('appStore/setPriceError', '')
    this.$store.commit('appStore/setTitle', '')
    this.$store.commit('appStore/setDescription', '')
    this.$store.commit('appStore/setPrice', '')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  div,input{
    box-sizing: border-box;
  }
  .main{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .form{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 10px 0 0;
    border: 1px solid black;
  }
  .form-input{
    width: 100%;
    min-width: 100px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 5px 10px;
  }
  .form-input_set-title,.form-input_set-description,.form-input_set-price{
    width: 100%;
  }
  .form-add-product{
    height: 22px;
  }
  .error{
    border: 1px solid red
  }
</style>
