/* eslint-disable react-hooks/exhaustive-deps */
import { Button,  Typography } from "@mui/material"
import { useEffect } from "react"
import useStockCall from "../hooks/useStockCall"
import { useState } from "react"
import SaleModal from "../modals/SaleModal"
import SaleTable from "../components/SaleTable"

const Sales = () => {
  const { getStockData } = useStockCall()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true)
  


  useEffect(() => {
    getStockData("products")
    getStockData("brands")
    getStockData("sales")
  }, [])
 


  return (
    <div>
      <Typography variant="h4" color={"red"} mb={3} >Sales</Typography>
      <Button onClick={handleOpen} variant="contained" >NEW SALE</Button>

      <SaleTable/>

      <SaleModal open={open} setOpen={setOpen}  />

    </div>
  )
}

export default Sales