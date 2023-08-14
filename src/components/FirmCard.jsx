/* eslint-disable react/prop-types */
import * as React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import EditIcon from "@mui/icons-material/Edit"
import { btnStyle } from '../styles/globalStyles';
import FirmEditModal from './FirmEditModal';
import useStockCall from '../hooks/useStockCall';

export default function FirmCard({firm}) {
 const  { address, image, name, phone } = firm
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const {deleteStockData} = useStockCall()

  
  return (
    <>
      <Card sx={{
        p: 2,
        width: "300px",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center"

      }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">{name}</Typography>
          <Typography variant="body2" color="text.secondary">{address}</Typography>
        </CardContent>
        <CardMedia
          sx={{ height: 140, p: 1, objectFit: "contain" }}
          image={image}
          title={name}
          component={"img"}
        />
        <Typography variant="body2" color="text.secondary">{phone}</Typography>
        <CardActions>
          <EditIcon onClick={handleOpen} sx={btnStyle} />
          <DeleteOutlineIcon onClick={()=>deleteStockData('firms',firm.id )} sx={btnStyle} />
        </CardActions>
      </Card>
      <FirmEditModal setOpen={setOpen} firm={firm} open={open}/>
    </>
  );
}
