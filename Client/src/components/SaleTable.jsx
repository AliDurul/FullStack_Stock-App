/* eslint-disable react/jsx-key */
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridRowEditStopReasons, GridRowModes, GridToolbar } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { btnStyle } from '../styles/globalStyles';
import useStockCall from '../hooks/useStockCall';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';





export default function SaleTable() {

    const { sales, brands, products } = useSelector(state => state.stock)
    const { deleteStockData, updateStockData } = useStockCall()
    const [rowModesModel, setRowModesModel] = useState({});
    let brandNames = []
    let productNames = []

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {

        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

    };

    const processRowUpdate = (newRow) => {

        let brandID = brands.filter(brand => brand.name === newRow.brand).map(item => item.id)
        let productID = products.filter(product => product.name === newRow.product).map(item => item.id)

        let updatedData = {
            brand_id: brandID[0],
            product_id: productID[0],
            quantity: newRow.quantity,
            price: newRow.price
        }
        updateStockData('sales', newRow.id, updatedData)

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
    const columns = [
        { field: 'createds', headerName: 'Date', headerAlign: "center", flex: 1, align: "center" },
        {
            field: 'brand',
            valueGetter: (params) => params.row.brand_id?.name,
            headerName: 'Brand',
            headerAlign: "center",
            align: "center",
            editable: true,
            type: 'singleSelect',
            valueOptions: brandNames,
            flex: 2

        },
        {
            field: 'product',
            valueGetter: (params) => params.row.product_id?.name,

            headerName: 'Product',
            headerAlign: "center",
            align: "center",
            editable: true,
            type: 'singleSelect',
            valueOptions: productNames,
            flex: 2
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            sortable: false,
            type: 'number',
            headerAlign: "center",
            align: "center",
            editable: true,
            flex: 1,

        },
        {
            field: 'price',
            headerName: 'Price',
            headerAlign: "center",
            type: 'number',
            align: "center",
            editable: true,
            flex: 1
        },
        {
            field: 'price_total',
            headerName: 'Amount',
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
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ]
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
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
                rows={sales}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                pageSize={10}
                pageSizeOptions={[10, 30, 50]}
                disableRowSelectionOnClick
                slots={{ toolbar: GridToolbar }}
            />
        </Box>
    );
}
