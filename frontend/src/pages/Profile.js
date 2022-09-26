import * as Yup from 'yup';
import {useState, useEffect, useRef} from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
// material
import {
    Stack,
    TextField,
    IconButton,
    InputAdornment,
    Alert,
    AlertTitle,
    Container,
    Typography,
    Grid,
    Card,
    Box,
    Link,
    Button,
    CardContent,
    CardActions,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Checkbox, Avatar, TablePagination
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from "@mui/material/LinearProgress";
import {sentenceCase} from "change-case";
import {register, editProfile} from "../redux/actions/authActions";

import Page from "../components/Page";

import {UserListHead, UserListToolbar, UserMoreMenu} from "../sections/@dashboard/user";

import Scrollbar from "../components/Scrollbar";
import Label from "../components/Label";

import SearchNotFound from "../components/SearchNotFound";
import Iconify from "../components/Iconify";
// component
// import {Iconify from 'src/components/Iconify';
// ----------------------------------------------------------------------
import UserUpdateCall from '../redux/calls/UserUpdateCall';

export default function Profile() {
     const dispatch = useDispatch();
  const navigate = useNavigate();
  const anchorRef = useRef(null);

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
     const [showPassword, setShowPassword] = useState(false);
     const userRgister = useSelector((state) => state.userRgister);
    const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    repass: Yup.string(),
  });

const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',

    },

    validationSchema: RegisterSchema,
    onSubmit: () => {
      dispatch(editProfile(values.firstName, values.lastName, values.email, values.password));
    },
  })
    const { error: registerError, loading: registerLoading } = userRgister;
const { errors, touched, values, handleSubmit, isSubmitting, getFieldProps } = formik;
  return (
          <Page title="Profile">
      <Container>
        {userInfo ? <UserUpdateCall /> : null}

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>

        </Stack>
          <Card>
          <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                 <FormikProvider value={formik}>

      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"

              {...getFieldProps('firstName')}
              InputProps={{
              startAdornment: (
                <InputAdornment position="start">
              {userInfo ? <>{userInfo.first_name}</> : 'John Doe'}
                </InputAdornment>
              ),
            }}
              error={Boolean(touched.first_name && errors.first_name)}
              helperText={touched.first_name && errors.first_name}

            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
                InputProps={{
              startAdornment: (
                <InputAdornment position="start">
              {userInfo ? <>{userInfo.last_name}</> : 'John Doe'}
                </InputAdornment>
              ),
            }}
              error={Boolean(touched.last_name && errors.last_name)}
              helperText={touched.last_name && errors.last_name}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
              InputProps={{
              startAdornment: (
                <InputAdornment position="start">
              {userInfo ? <>{userInfo.email}</> : 'John Doe'}
                </InputAdornment>
              ),
            }}
            {...getFieldProps('email')}

            error={Boolean(touched.email && errors.email)}

            helperText={touched.email && errors.email}

          />
        <TextField
              fullWidth
              label="Bio"
              {...getFieldProps('lastName')}

              error={Boolean(touched.last_name && errors.last_name)}
              helperText={touched.last_name && errors.last_name}
            />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          {registerError ? (
            <Alert severity="error">
              <AlertTitle>Edit</AlertTitle>
              {registerError}
            </Alert>
          ) : null}

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={registerLoading ? isSubmitting : null}
          >
            Update
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>

              </Box>
          </Card>


      </Container>
    </Page>
  );
}
