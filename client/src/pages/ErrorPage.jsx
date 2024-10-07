import { Box } from "@mui/material"
import notfoundimg from "../assets/errorimg.jpg"


const ErrorPage = () => {
  return (
    <Box sx={{display: "flex", justifyContent: 'center', height: "80vh", alignItems: 'center'}}>
        <img src={notfoundimg} alt="" />
    </Box>
  )
}

export default ErrorPage