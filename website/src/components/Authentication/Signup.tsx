import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { MyField } from './MyField';
import {
  Root,
  Form as StyledForm,
  Card as MuiCard,
  StyledCardHeader,
  StyledTextField,
  StyledButton,
  StyledText,
} from './Styles';
import { createTheme, ThemeProvider, Button, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { text } from 'stream/consumers';
import { SERVER_URL } from 'utils/constants';

interface Values {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const theme = createTheme(); // create a default theme object

export const RegisterForm = ({
  setUser,
}: {
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  /*
  const onSubmit = async (values: Values): Promise<void> => {
    try {
      const response = await axios.post("http://localhost:4000/register", {
        username: values.username,
        email: values.email,
        password: values.password,
        withCredentials: true
      });

      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }
  */

  const instance = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true,
  });

  const onSubmit = async (values: Values): Promise<void> => {
    try {
      const response = await instance.post('/register', {
        username: values.username,
        email: values.email,
        password: values.password,
      });
      setUser(response.data as User);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={async (values) => {
          await onSubmit(values);
        }}
      >
        {({ values }) => (
          <Root>
            <MuiCard theme={theme}>
              <StyledCardHeader title="Sign Up" />
              <StyledText theme={theme}>
                Already a User?{' '}
                <Button
                  style={{ color: '#67F3BF' }}
                  onClick={(event) => {
                    event.preventDefault();
                    navigate('/login');
                  }}
                >
                  Sign In
                </Button>
              </StyledText>
              <StyledForm>
                <div>
                  <Field
                    name="username"
                    placeholder="username"
                    type="text"
                    component={MyField}
                    as={StyledTextField}
                  />
                </div>

                <div>
                  <Field
                    name="email"
                    placeholder="email"
                    type="text"
                    component={MyField}
                    as={StyledTextField}
                  />
                </div>

                <div>
                  <Field
                    name="password"
                    placeholder="password"
                    type="password"
                    component={MyField}
                    as={StyledTextField}
                  />
                </div>

                <div>
                  <Field
                    name="confirmPassword"
                    placeholder="confirmPassword"
                    type="password"
                    component={MyField}
                    as={StyledTextField}
                  />
                </div>

                <div>
                  <StyledButton theme={theme} type="submit">
                    Register
                  </StyledButton>
                </div>
              </StyledForm>
            </MuiCard>
          </Root>
        )}
      </Formik>
    </ThemeProvider>
  );
};
