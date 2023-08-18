/* eslint-disable react-hooks/exhaustive-deps */
import { Button,  Typography } from "@mui/material"
import { useEffect } from "react"
import useStockCall from "../hooks/useStockCall"
import { useState } from "react"
import PurchaseModal from "../modals/PurchaseModal"
import PurchaseTable from "../components/PurchaseTable"

const Purchases = () => {
  const { getStockData } = useStockCall()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true)
  


  useEffect(() => {
    getStockData("firms")
    getStockData("purchases")
    getStockData("brands")
  }, [])
 


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