import { Typography } from "@mui/material"
import KpiCard from "../components/KpiCard"
import Charts from "../components/Charts"

const Home = () => {
  return <div>
    <Typography variant="h4" color={"red"} mb={3} >Dashboard</Typography>

    <KpiCard/>
    <Charts/>

  </div>
}

export default Home
