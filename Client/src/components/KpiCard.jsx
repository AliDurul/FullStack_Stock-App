import { amber, deepPurple, pink } from "@mui/material/colors"
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import PaymentsIcon from "@mui/icons-material/Payments"
import { Avatar, Box, Grid, Paper, Typography } from "@mui/material"
import { useSelector } from "react-redux"

const KpiCard = () => {

    const {sales, purchases} = useSelector(state=> state.stock)

     const totalSales = sales.map(item=> Number(item.price_total)).reduce((acc,sale)=> acc + sale,0)   
     const totalPurchases = purchases.map(item=> Number(item.price_total)).reduce((acc,sale)=> acc + sale,0)  


    const cartData = [
        { id: 1, icon: <MonetizationOnIcon />, bgColor: deepPurple[100], color: deepPurple[700], title: "Sales", value: `$${totalSales}` },
        { id: 2, icon: <ShoppingCartIcon />, bgColor: pink[100], color: pink[700], title: "Profit", value: `$${totalSales - totalPurchases}` },
        { id: 3, icon: <PaymentsIcon />, bgColor: amber[100], color: amber[700], title: "Purchases", value: `$${totalPurchases}`},
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
                                    <Typography variant="h4" color="initial">{item.value}</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    ))
                }
            </Grid>
   
    )
}

export default KpiCard