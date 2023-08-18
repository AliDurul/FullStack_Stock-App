/* eslint-disable react/prop-types */
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import useStockCall from '../hooks/useStockCall';
import { modalStyle } from '../styles/globalStyles';
import { useSelector } from 'react-redux';



export default function SaleModal({ open, setOpen }) {

    const { createStockData } = useStockCall()
    const { products } = useSelector(state => state.stock)
    const { brands } = useSelector(state => state.stock)

    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={modalStyle}>

                        <Formik
                            initialValues={
                                {

                                    product_id: "",
                                    brand_id: "",
                                    quantity: "",
                                    price: ""
                                }
                            }

                            onSubmit={(values) => {
                                createStockData('sales', values)
                                handleClose()
                            }}
                        >
                            {
                                ({ handleChange, handleBlur, values }) => (
                                    <Form>
                                      
                                        <Box
                                            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                                        >
                                            <FormControl fullWidth>
                                                <InputLabel id="Brand">Brand</InputLabel>
                                                <Select
                                                    labelId="Brand"
                                                    name="brand_id"
                                                    id="Brand"
                                                    label="Brand"
                                                    onChange={handleChange}
                                                    value={values.brand_id}
                                                >
                                                    {
                                                        brands.map(brand => <MenuItem key={brand.id} value={brand.id}>{brand.name}</MenuItem>)
                                                    }
                                                </Select>
                                            </FormControl>
                                            <FormControl fullWidth>
                                                <InputLabel id="Product">Product</InputLabel>
                                                <Select
                                                    labelId="Product"
                                                    name="product_id"
                                                    id="Product"
                                                    label="Product"
                                                    onChange={handleChange}
                                                    value={values.product_id}
                                                >
                                                    {
                                                        products.map(product => <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>)
                                                    }
                                                </Select>
                                            </FormControl>

                                            <TextField
                                                label="Quantity"
                                                name="quantity"
                                                id="quantity"
                                                type="number"
                                                variant="outlined"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.quantity}
                                            />
                                            <TextField
                                                label="Price"
                                                name="price"
                                                id="price"
                                                type="number"
                                                variant="outlined"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.price}
                                            />
                                            <Button variant="contained" type="submit">
                                            Add New Sale 
                                            </Button>
                                        </Box>
                                    </Form>
                                )
                            }
                        </Formik>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}