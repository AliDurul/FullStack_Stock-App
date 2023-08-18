/* eslint-disable react/jsx-key */
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { btnStyle } from '../styles/globalStyles';
import useStockCall from '../hooks/useStockCall';




export default function SaleTable() {

  const { sales } = useSelector(state => state.stock)
  const { deleteStockData } = useStockCall()

  const columns = [
    { field: 'createds', headerName: 'Date', headerAlign: "center", flex: 1, align: "center", },
    {
      field: 'brand',
      headerName: 'Brand',
      headerAlign: "center",
      align: "center",
      flex: 2
    },
    {
      field: 'product',
      headerName: 'Product',
      headerAlign: "center",
      align: "center",
      flex: 2
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      sortable: false,
      type: 'number',
      headerAlign: "center",
      align: "center",
      flex: 1,

    },
    {
      field: 'price',
      headerName: 'Price',
      headerAlign: "center",
      // type: 'number',
      align: "center",
      flex: 1
    },
    {
      field: 'price_total',
      headerName: 'Amount',
      headerAlign: "center",
      // type: 'number',
      align: "center",
      flex: 1
    },
    {
      field: 'actions',
      headerName: 'Actions',
      headerAlign: "center",
      type: "actions",
      align: "center",
      flex: 1,
      getActions: (params) => [
        < GridActionsCellItem
          icon={< DeleteForeverIcon />}
          label='Delete'
          sx={btnStyle}
          onClick={() => deleteStockData("purchases", params.id)} />
      ],
    },
  ];


  return (
    <Box sx={{ width: '100%', mt: 5 }}>
      <DataGrid
        rows={sales}
        columns={columns}
        // pageSize={10}
        // pageSizeOptions={[10, 30, 50]}
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
  );
}
