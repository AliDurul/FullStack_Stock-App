import { createSlice } from "@reduxjs/toolkit"

const stockSlice = createSlice({
  name: "stock",

  initialState: {
    loading: false,
    error: false,
    sales: [],
    purchases: [],
    firms: [],
    categories: [],
    brands: [],
    products: [],
    
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true
      state.error = false
    },
    getStockSuccess: (state, { payload }) => {
      state.loading = false
      state[payload.url] = payload.data
    },
    getProdCatBrandsSuccess: (state,{payload}) => {
      state.loading = false
      state.products=payload[0]
      state.categories=payload[1]
      state.brands=payload[2]
    },
    fetchFail: (state) => {
      state.loading = false
      state.error = true
    },
  },
})

export const { fetchStart, fetchFail, getStockSuccess,getProdCatBrandsSuccess } =
  stockSlice.actions
export default stockSlice.reducer
