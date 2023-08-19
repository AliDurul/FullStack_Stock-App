/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Typography } from "@mui/material"
import { useEffect } from "react"
import useStockCall from "../hooks/useStockCall"
import { useSelector } from "react-redux"
import { useState } from "react"
import ProductTable from "../components/ProductTable"
import ProductModal from "../modals/ProductModal"
import lading from '../assets/loading1.gif'
import errorMes from '../assets/no-result-found.avif'

const Firms = () => {
  const { products, error, loading } = useSelector(state => state.stock)
  const { getProdCatBrands } = useStockCall()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true)



  useEffect(() => {
    // getStockData("products")
    // getStockData("categories")
    // getStockData("brands")
    getProdCatBrands()

  }, [])

  if (error) {
    return <Box sx={{ display: "flex", justifyContent: 'center', height: "80vh", alignItems: 'center' }}>
      <img src={errorMes} alt="" />
    </Box>
  } else if (loading) {
    return <Box sx={{ display: "flex", justifyContent: 'center', height: "80vh", alignItems: 'center' }}>
      <img src={lading} alt="" />
    </Box>
  }



  return (
    <div>
      <Typography variant="h4" color={"red"} mb={3} >Products</Typography>
      <Button onClick={handleOpen} variant="contained" >NEW PRODUCT</Button>

      <ProductModal open={open} setOpen={setOpen} />

      <ProductTable products={products} />

    </div>
  )
}

export default Firms