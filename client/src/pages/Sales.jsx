/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button,  Typography } from "@mui/material"
import { useEffect } from "react"
import useStockCall from "../hooks/useStockCall"
import { useState } from "react"
import SaleModal from "../modals/SaleModal"
import SaleTable from "../components/SaleTable"
import { useSelector } from "react-redux"
import errorMes from '../assets/no-result-found.avif'
import loadingGif from '../assets/loading1.gif'

const Sales = () => {
  const { getStockData } = useStockCall()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true)
  const {error,loading} = useSelector(state=> state.stock)
   
  useEffect(() => {
    getStockData("products")
    getStockData("brands")
    getStockData("sales")
  }, [])
 
  if (error) {
    return <Box sx={{ display: "flex", justifyContent: 'center', height: "80vh", alignItems: 'center' }}>
      <img src={errorMes} alt="" />
    </Box>
  } else if (loading) {
    return <Box sx={{ display: "flex", justifyContent: 'center', height: "80vh", alignItems: 'center' }}>
      <img src={loadingGif} alt="" />
    </Box>
  }

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