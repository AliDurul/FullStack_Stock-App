import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import useStockCall from '../hooks/useStockCall'



const Firms = () => {


  const {getStockData} = useStockCall()




  useEffect(() => {
    getStockData('firms')
  }, [])


  return <div>

    <Typography variant="h4" color="red" mb={3}>Firms</Typography>
    <Button variant="contained">NEW FIRM</Button>

    <Grid container spacing={0}>
      {/* {
        firms?.map((firm) => (
          <Grid item key={firm.id}>
            <FirmCard />
          </Grid>
        ))
      } */}


    </Grid>

  </div>
}

export default Firms
