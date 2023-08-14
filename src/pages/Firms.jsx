import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import useStockCall from '../hooks/useStockCall'
import { useSelector } from 'react-redux'
import FirmCard from '../components/FirmCard'



const Firms = () => {

const {firms} = useSelector(state=> state.stock)
  const {getStockData} = useStockCall()




  useEffect(() => {
    getStockData('firms')
  }, [])


  return <div>

    <Typography variant="h4" color="red" mb={3}>Firms</Typography>
    <Button variant="contained">NEW FIRM</Button>

    <Grid container spacing={5} justifyContent={"center"} mt={3}>
      {
        firms?.map((firm) => (
          <Grid item key={firm.id}>
            <FirmCard  {...firm}/>
          </Grid>
        ))
      }
    </Grid>

  </div>
}

export default Firms
