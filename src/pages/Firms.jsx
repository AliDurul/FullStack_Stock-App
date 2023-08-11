import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchStart, getFirmsSuccess } from '../features/stockSlice'
import { fetchFail } from '../features/stockSlice'


const Firms = () => {
const dispatch = useNavigate()
  const {token} = useSelector(state=> state.auth)

  const getFirms = async () => {
    dispatch(fetchStart)
    try {
      const { data } = await axios(`${import.meta.env.VITE_BASE_URL}/stock/firms/`, {
        headers: {Authorization:`Token ${token}` }
      })
      dispatch(getFirmsSuccess(data))
      console.log(data);
    } catch (error) {
      console.log(error);
      dispatch(fetchFail)
    }
  }
  useEffect(() => {
    getFirms()
  }, [])


  return <div>
    <Typography variant="h4" color="red" mb={3}>Firms</Typography>
    <Button variant="contained">NEW FIRM</Button>

  </div>
}

export default Firms
