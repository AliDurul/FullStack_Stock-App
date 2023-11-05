/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, Typography } from "@mui/material"
import { useEffect } from "react"
import useStockCall from "../hooks/useStockCall"
import { useSelector } from "react-redux"
import { useState } from "react"
import BrandsModal from "../modals/BrandsModal"
import BrandCard from "../components/BrandCard"

const Brands = () => {

  const { getStockData } = useStockCall()

  const [open, setOpen] = useState(false);
  const [fakeBrand, setFakeBrand] = useState({ name: "",  image: "" })
  const { brands } = useSelector(state => state.stock)

  useEffect(() => {
    getStockData("brands")
  }, [])
 
  // FUNCTIONS
const handleNewBrands = () => {
  setFakeBrand({ name: "",  image: "" }),
  setOpen(true)
}
const handleOpen = () => setOpen(true)

  return (
    <div>
      <Typography variant="h4" color={"red"} mb={3} >Brands</Typography>
      <Button onClick={handleNewBrands} variant="contained" >NEW BRAND</Button>

      <BrandsModal open={open} setOpen={setOpen} fakeBrand={fakeBrand} />

      <Grid container mt={3} spacing={5} justifyContent={"center"}>

        {
          brands.map(brand => (
            <Grid item key={brand.id}>
              <BrandCard handleOpen={handleOpen} setFakeBrand={setFakeBrand} brand={brand} />
            </Grid>
          ))
        }

      </Grid>

    </div>
  )
}

export default Brands