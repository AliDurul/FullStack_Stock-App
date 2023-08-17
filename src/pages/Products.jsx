/* eslint-disable react-hooks/exhaustive-deps */
import { Button,  Typography } from "@mui/material"
import { useEffect } from "react"
import useStockCall from "../hooks/useStockCall"
import { useSelector } from "react-redux"
import { useState } from "react"
import ProductTable from "../components/ProductTable"
import ProductModal from "../modals/ProductModal"

const Firms = () => {
  const { products } = useSelector(state => state.stock)
  const { getStockData } = useStockCall()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true)
  


  useEffect(() => {
    getStockData("products")
    getStockData("categories")
    getStockData("brands")
  }, [])
 


  return (
    <div>
      <Typography variant="h4" color={"red"} mb={3} >Products</Typography>
      <Button onClick={handleOpen} variant="contained" >NEW PRODUCT</Button>

      <ProductModal open={open} setOpen={setOpen}  />

      <ProductTable products={products} />

    </div>
  )
}

export default Firms