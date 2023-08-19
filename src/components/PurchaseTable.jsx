/* eslint-disable react/jsx-key */
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridRowEditStopReasons, GridRowModes, GridToolbar } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { btnStyle } from '../styles/globalStyles';
import useStockCall from '../hooks/useStockCall';
import { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';




export default function PurchaseTable() {

  const { brands, products, purchases, firms } = useSelector(state => state.stock)
  const { deleteStockData, updateStockData } = useStockCall()
  const [rowModesModel, setRowModesModel] = useState({});
  let brandNames = []
  let productNames = []
  let firmNames = []




  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = (newRow) => {

    let brandID = brands.filter(brand => brand.name === newRow.brand).map(item => item.id)
    let productID = products.filter(product => product.name === newRow.product).map(item => item.id)

    let updatedData = {
      firm_id:newRow.firm_id,
      brand_id: brandID[0],
      product_id: productID[0],
      quantity: newRow.quantity,
      price: newRow.price
    }
    updateStockData('purchases', newRow.id, updatedData)

    return newRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  brands.forEach(element => {
    brandNames.push(element.name)
  });

  products.forEach(element => {
    productNames.push(element.name)
  });

  firms.forEach(element => {
    firmNames.push(element.name)
  });

  const columns = [
    { field: 'createds', headerName: 'Date', headerAlign: "center", flex: 1, align: "center", },
    {
      field: 'firm',
      headerName: 'Firm',
      flex: 2,
      headerAlign: "center",
      align: "center",
      // editable: true,
      // type: 'singleSelect',
      // valueOptions: firmNames
    },
    {
      field: 'brand',
      headerName: 'Brand',
      headerAlign: "center",
      align: "center",
      flex: 2,
      editable: true,
      type: 'singleSelect',
      valueOptions: brandNames
    },
    {
      field: 'product',
      headerName: 'Product',
      headerAlign: "center",
      align: "center",
      flex: 2,
      editable: true,
      type: 'singleSelect',
      valueOptions: productNames
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      sortable: false,
      type: 'number',
      headerAlign: "center",
      editable: true,
      align: "center",
      flex: 1,

    },
    {
      field: 'price',
      headerName: 'Price',
      headerAlign: "center",
      type: 'number',
      editable: true,
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
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={() => setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              sx={btnStyle}
              onClick={() => setRowModesModel({
                ...rowModesModel,
                [id]: { mode: GridRowModes.View, ignoreModifications: true },
              })}
              color="inherit"
            />,
          ]
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            sx={btnStyle}
            onClick={() => setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })}
            color="inherit"
          />,
          < GridActionsCellItem
            icon={< DeleteForeverIcon />}
            label='Delete'
            sx={btnStyle}
            onClick={() => deleteStockData("sales", id)} />
        ]



      }
    },
  ];


  return (
    <Box sx={{ width: '100%', mt: 5 }}>
      <DataGrid
        rows={purchases}
        columns={columns}
        pageSize={10}
        pageSizeOptions={[10, 30, 50]}
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
      />
    </Box>
  );
}
