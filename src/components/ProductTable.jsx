/* eslint-disable react/jsx-key */
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { btnStyle } from '../styles/globalStyles';
import useStockCall from '../hooks/useStockCall';




export default function ProductTable() {

  const { products } = useSelector(state => state.stock)
  const { deleteStockData } = useStockCall()

  const columns = [
    { field: 'id', headerName: '#', headerAlign: "center", flex: 0.5, align: "center", },
    {
      field: 'category',
      headerName: 'Category',
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: 'brand',
      headerName: 'Brand',
      headerAlign: "center",
      align: "center",
      flex: 2
    },
    {
      field: 'name',
      headerName: 'Name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      headerAlign: "center",
      align: "center",
      flex: 2,

    },
    {
      field: 'stock',
      headerName: 'Stock',
      headerAlign: "center",
      type: 'number',
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
          onClick={() => deleteStockData("products", params.id)} />
      ],
    },
  ];


  return (
    <Box sx={{ width: '100%', mt: 5 }}>
      <DataGrid
        rows={products}
        columns={columns}
 
        pageSizeOptions={[10, 30, 50]}
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
  );
}
