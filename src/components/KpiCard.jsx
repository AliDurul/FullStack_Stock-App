import { amber, deepPurple, pink } from "@mui/material/colors"
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import PaymentsIcon from "@mui/icons-material/Payments"
import { Avatar, Box, Grid, Paper, Typography } from "@mui/material"

const KpiCard = () => {

    const cartData = [
        { id: 1, icon: <MonetizationOnIcon />, bgColor: deepPurple[100], color: deepPurple[700], title: "Sales", value: "48000" },
        { id: 2, icon: <ShoppingCartIcon />, bgColor: pink[100], color: pink[700], title: "Profit", value: "48000" },
        { id: 3, icon: <PaymentsIcon />, bgColor: amber[100], color: amber[700], title: "Purchases", value: "48000" },
    ]

    return (

            <Grid justifyContent="center" spacing={3} container sx={{}}>
                {
                    cartData.map((item) => (
                        <Grid key={item.id} item>
                            <Paper elevation={5} sx={{ display: 'flex', gap: 3, p:2, alignItems:'center', justifyContent:"center",width:'320px'}} >
                                <Avatar sx={{
                                    bgcolor: item.bgColor,
                                    color: item.color,
                                    width: 70,
                                    height: 70,
                                    "& .MuiSvgIcon-root": { fontSize: '2rem' }
                                }}>
                                    {item.icon}
                                </Avatar>
                                <Box>
                                    <Typography variant="button" color="initial">{item.title}</Typography>
                                    <Typography variant="h4" color="initial">${item.value}</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    ))
                }
            </Grid>
   
    )
}

export default KpiCard