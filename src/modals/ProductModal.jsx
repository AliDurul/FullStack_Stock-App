/* eslint-disable react/prop-types */
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import useStockCall from '../hooks/useStockCall';
import { modalStyle } from '../styles/globalStyles';
import { useSelector } from 'react-redux';



export default function ProductModal({ open, setOpen }) {

    const { createStockData } = useStockCall()
    const { categories } = useSelector(state => state.stock)
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
                            initialValues={{
                                name: "",
                                category_id: "",
                                brand_id: ""
                            }}

                            onSubmit={(values) => {

                                createStockData('products', values)
                                console.log(values);
                                handleClose()

                            }}
                        >
                            {
                                ({ handleChange, handleBlur, values }) => (
                                    <Form>
                                        <Typography variant={"h6"} color={"error"} mb={2}> Add New Product  </Typography>
                                        <Box
                                            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                                        >
                                            <FormControl fullWidth>
                                                <InputLabel id="Categories">Categories</InputLabel>
                                                <Select
                                                    labelId="Categories"
                                                    name="category_id"
                                                    id="Categories"
                                                    label="Categories"
                                                    onChange={handleChange}
                                                    value={values.category_id}
                                                >
                                                    {
                                                        categories.map(brand => <MenuItem key={brand.id} value={brand.id}>{brand.name}</MenuItem>)
                                                    }
                                                </Select>
                                            </FormControl>

                                            <FormControl fullWidth>
                                                <InputLabel id="Brands">Brands</InputLabel>
                                                <Select
                                                    labelId="Brands"
                                                    name="brand_id"
                                                    id="Brands"
                                                    label="Brands"
                                                    onChange={handleChange}
                                                    value={values.brand_id}
                                                >
                                                    {
                                                        brands.map(brand => <MenuItem key={brand.id} value={brand.id}>{brand.name}</MenuItem>)
                                                    }
                                                </Select>
                                            </FormControl>

                                            <TextField
                                                label="Product Name"
                                                name="name"
                                                id="name"
                                                type="text"
                                                variant="outlined"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.name}
                                            />
                                            <Button variant="contained" type="submit">
                                                Submit
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