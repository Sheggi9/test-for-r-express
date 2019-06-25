const state = {
  shoppingList: [],
  newProduct: {
    title: '',
    description: '',
    price: '',
    time: ''
  },
  monthNames: [
    'Января',
    'Ферваля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря'
  ],
  titleError: undefined,
  descriptionError: undefined,
  priceError: undefined
}
const mutations = {
  updateTitle (state, { event }) {
    state.shoppingList[event.index].title = event.$event.target.value.trim()
  },
  updateDescription (state, { event }) {
    state.shoppingList[event.index].description = event.$event.target.value.trim()
  },
  updatePrice (state, { event }) {
    state.shoppingList[event.index].price = event.$event.target.value.trim()
  },
  setTitle (state, title) {
    const titleTrim = title.trim()
    state.newProduct.title = titleTrim
  },
  setDescription (state, description) {
    const descriptionTrim = description.trim()
    state.newProduct.description = descriptionTrim
  },
  setPrice (state, price) {
    const priceTrim = price.trim()
    state.newProduct.price = priceTrim
  },
  addProduct (state) {
    state.shoppingList.push(state.newProduct)
  },
  resetInputFields (state) {
    state.newProduct = {
      title: '',
      description: '',
      price: '',
      time: ''
    }
  },
  getData (state) {
    let newDate = new Date()
    let day = newDate.getDate()
    let month = newDate.getMonth()
    let hours = newDate.getHours()
    let minutes = newDate.getMinutes()
    let seconds = newDate.getSeconds()
    newDate = day + ' ' + state.monthNames[month] + ' ' + newDate.getFullYear() + ', ' + hours + ':' + minutes + ':' + seconds
    state.newProduct.time = newDate
  },
  deleteProduct (state, index) {
    state.shoppingList.splice(index, 1)
  },
  setTitleError (state, error) {
    state.titleError = error
  },
  setDescriptionError (state, error) {
    state.descriptionError = error
  },
  setPriceError (state, error) {
    state.priceError = error
  }
}
const actions = {
  addProduct ({rootState, commit}) {
    commit('getData')
    commit('addProduct')
    commit('resetInputFields')
  },
  validateTitle ({rootState, state, commit}, defStatus) {
    if (state.newProduct.title.length === 0) {
      commit('setTitleError', 'Min symbols: 1')
    } else {
      commit('setTitleError', undefined)
    }
  },
  validateDescription ({rootState, state, commit}, defStatus) {
    if (state.newProduct.description.length === 0) {
      commit('setDescriptionError', 'Min symbols: 1')
    } else {
      commit('setDescriptionError', undefined)
    }
  },
  validatePrice ({rootState, state, commit}, defStatus) {
    const reg = new RegExp('^\\d+$')
    if (state.newProduct.price.length === 0) {
      commit('setPriceError', 'Min numbers: 1')
    } else if (!reg.test(state.newProduct.price)) {
      commit('setPriceError', 'Price must be a number')
    } else {
      commit('setPriceError', undefined)
    }
  },
  validateForm ({rootState, state, commit, dispatch}) {
    dispatch('validateTitle')
    dispatch('validateDescription')
    dispatch('validatePrice')
    if (state.titleError === undefined && state.descriptionError === undefined && state.priceError === undefined) {
      dispatch('addProduct')
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
