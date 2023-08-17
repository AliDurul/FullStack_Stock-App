/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, Typography } from "@mui/material"
import FrimCard from "../components/FirmCard"
import { useEffect } from "react"
import useStockCall from "../hooks/useStockCall"
import { useSelector } from "react-redux"
import FirmModal from "../modals/FirmModal"
import { useState } from "react"

const Firms = () => {
  const { firms } = useSelector(state => state.stock)

  const { getStockData } = useStockCall()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true)

  const [fakeFirm, setFakeFirm] = useState({ name: "", phone: "", image: "", address: "" })


  useEffect(() => {
    getStockData("firms")
  }, [])
 
const handleNewFrim = () => {
  setFakeFirm({ name: "", phone: "", image: "", address: "" }),
  setOpen(true)
}

  return (
    <div>
      <Typography variant="h4" color={"red"} mb={3} >Firms</Typography>
      <Button onClick={handleNewFrim} variant="contained" >NEW FIRM</Button>

      <FirmModal open={open} setOpen={setOpen} fakeFirm={fakeFirm} />

      <Grid container mt={3} spacing={5} justifyContent={"center"}>

        {
          firms.map(firm => (
            <Grid item key={firm.id}>
              <FrimCard handleOpen={handleOpen} setFakeFirm={setFakeFirm} firm={firm} />
            </Grid>
          ))
        }

      </Grid>

    </div>
  )
}

export default Firms