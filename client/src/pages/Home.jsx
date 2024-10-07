import { Typography } from "@mui/material"
import KpiCard from "../components/KpiCard"
import Charts from "../components/Charts"
import { useEffect } from "react"
import useStockCall from "../hooks/useStockCall"

const Home = () => {
const {getStockData} =  useStockCall()

useEffect(() => {
  getStockData('sales')
  getStockData('purchases')
}, [])


  return <div>
    <Typography variant="h4" color={"red"} mb={3} >Dashboard</Typography>

    <KpiCard/>
    <Charts/>

  </div>
}

export default Home
