/* eslint-disable react/prop-types */
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { Form } from "formik"
import { object, string } from "yup"

export const registerSchema = object({
  username: string()
    .max(10, "Username must be less than 10 characters.")
    .required("username is required"),
  first_name: string()
    .max(20, "The name must be less than 20 characters.")
    .required("first name is required"),
  last_name: string()
    .max(20, "Surname must be less than 30 characters.")
    .required("Last name is required"),

  email: string().email().required("Email is required."),
  password: string()
    .required("password is required.")
    .min(8, "password must be at least 8 characters")
    .max(20, "password must be at most 20 characters.")
    .matches(/\d+/, "Password bir sayi içermelidir.")
    .matches(/[a-z]/, "Password must contain one lowercase letter.")
    .matches(/[A-Z]/, "Password must contain one uppercase letter.")
    .matches(/[!,?{}><%&$#£+-.]+/, "Password must contain one special character."),
})

const RegisterForm = ({values,handleChange,errors,touched,handleBlur}) => {

  
  return (
    <div>
      <Form>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="User Name"
            name="username"
            id="userName"
            type="text"
            variant="outlined"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.username && Boolean(errors.username)}
            helperText={errors.username}
          />
          <TextField
            label="First Name"
            name="first_name"
            id="firstName"
            type="text"
            variant="outlined"
            value={values.first_name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.first_name && Boolean(errors.first_name)}
            helperText={errors.first_name}
          />
          <TextField
            label="Last Name"
            name="last_name"
            id="last_name"
            type="text"
            variant="outlined"
            value={values.last_name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.last_name && Boolean(errors.last_name)}
            helperText={errors.last_name}
          />
          <TextField
            label="Email"
            name="email"
            id="email"
            type="email"
            variant="outlined"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={errors.email}
          />
          <TextField
            label="password"
            name="password"
            id="password"
            type="password"
            variant="outlined"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={errors.password}
          />
          <Button type="submit" variant="contained" size="large">
            Submit
          </Button>
        </Box>
      </Form>
    </div>
  )
}

export default RegisterForm
