/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button,  Typography } from "@mui/material"
import { useEffect } from "react"
import useStockCall from "../hooks/useStockCall"
import { useState } from "react"
import PurchaseModal from "../modals/PurchaseModal"
import PurchaseTable from "../components/PurchaseTable"
import { useSelector } from "react-redux"
import errorMes from '../assets/no-result-found.avif'
import loadingGif from '../assets/loading1.gif'

const Purchases = () => {
  const { getStockData } = useStockCall()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true)
  const {error,loading} = useSelector(state=> state.stock)


  useEffect(() => {
    getStockData("firms")
    getStockData("purchases")
    getStockData("brands")
    getStockData("products")
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
      <Typography variant="h4" color={"red"} mb={3} >Purchases</Typography>
      <Button onClick={handleOpen} variant="contained" >NEW PURCHASE</Button>

      <PurchaseModal open={open} setOpen={setOpen}  />
      <PurchaseTable/>

    </div>
  )
}

export default Purchases