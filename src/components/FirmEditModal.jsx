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
import { modalStyle } from '../styles/globalStyles';


export default function FirmEditModal({ setOpen, open, firm }) {

  const handleClose = () => setOpen(false);

  const { updateStockData } = useStockCall()
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
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>

            <Formik
              initialValues={{
                name: firm.name,
                phone: firm.phone,
                image: firm.image,
                address: firm.address
              }}
              onSubmit={(values) => {
                updateStockData("firms", firm.id, values)
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

                      />
                      <TextField
                        label="Address"
                        name="address"
                        id="Address"
                        type="address"
                        variant="outlined"
                        onChange={handleChange}
                        value={values.address}

                      />
                      <TextField
                        label="Phone"
                        name="phone"
                        id="Phone"
                        type="tel"
                        variant="outlined"
                        onChange={handleChange}
                        value={values.phone}

                      />
                      <TextField
                        label="Image"
                        name="image"
                        id="Image"
                        type="url"
                        variant="outlined"
                        onChange={handleChange}
                        value={values.image}


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
