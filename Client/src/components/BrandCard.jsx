/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import EditIcon from "@mui/icons-material/Edit"
import { btnStyle } from '../styles/globalStyles';
import useStockCall from '../hooks/useStockCall';

export default function BrandCard({ brand, handleOpen, setFakeBrand }) {

  
    const { image, name,id } = brand

    const {deleteStockData} = useStockCall()

    return (
        <Card sx={{
            width: "300px",
            height: "400px",
            display: "flex",
            flexDirection: "column",
            justifyContent:"space-between",
            padding:"16px",
            boxShadow: 10,
        }}>

            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
            </CardContent>
            <CardMedia
                component="img"
                alt="green iguana"
                height="160"
                image={image}
                sx={{ height:140, p:1, objectFit:"contain" }}
            />
            <CardActions sx={{padding:"16px", mx:"auto"} }>
                <EditIcon sx={btnStyle} onClick={()=>{handleOpen(), setFakeBrand(brand)}} />
                <DeleteOutlineIcon onClick={()=>deleteStockData('brands',id)}  sx={btnStyle} />
            </CardActions>
        
        </Card>
    );
}
