/* eslint-disable react/prop-types */
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import useStockCall from '../hooks/useStockCall';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function FirmUpdateModal({ setOpen, open }) {

   

  const handleClose = () => setOpen(false);

  const { createStockData } = useStockCall()


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
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
             Add a New Firm
            </Typography>

            <Formik
              initialValues={{
                name: "",
                phone: "",
                image: "",
                address: ""
              }}
              onSubmit={(values) => {
                handleClose
                createStockData("firms",values)
                console.log(values);
              }}

            >
              {
                ({ handleChange, values }) => (
                  <Form>
                    <Box id="transition-modal-description" sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
                      <TextField
                        label="Firm Name"
                        name="name"
                        id="FirmName"
                        type="text"
                        variant="outlined"
                        onChange={handleChange}
                        value={values.name}
                        required

                      />
                      <TextField
                        label="Address"
                        name="address"
                        id="Address"
                        type="tel"
                        variant="outlined"
                        onChange={handleChange}
                        value={values.address}
                        required


                      />
                      <TextField
                        label="Phone"
                        name="phone"
                        id="Phone"
                        type="text"
                        variant="outlined"
                        onChange={handleChange}
                        value={values.phone}
                        required

                      />
                      <TextField
                        label="Image"
                        name="image"
                        id="Image"
                        type="url"
                        variant="outlined"
                        onChange={handleChange}
                        value={values.image}
                        required

                      />
                      <Button variant="contained" type="submit" onClick={handleClose}>
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
