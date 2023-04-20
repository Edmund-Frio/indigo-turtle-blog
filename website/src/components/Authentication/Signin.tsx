import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, createTheme, ThemeProvider } from '@mui/material';
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
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { myContext } from 'components/Context';
import { SERVER_URL } from 'utils/constants';

interface Values {
  username: string;
  password: string;
}

const theme = createTheme(); // create a default theme object

export const AuthForm = ({
  setUser,
}: {
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}): JSX.Element => {
  const ctx = useContext(myContext);
  const navigate = useNavigate();
  const instance = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true,
  });

  const onSubmit = async (values: Values): Promise<void> => {
    try {
      const response = await instance.post('/login', {
        username: values.username,
        password: values.password,
      });
      // FIXME: NEED TO SET CONTEXT HERE
      setUser(response.data);
      navigate('/postspage');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values) => {
          await onSubmit(values);
        }}
      >
        {({ values }) => (
          <Root>
            <MuiCard theme={theme}>
              <StyledCardHeader title="Sign In" />
              <StyledText theme={theme}>
                Not a User?{' '}
                <Button
                  style={{ color: '#67F3BF' }}
                  onClick={(event) => {
                    event.preventDefault();
                    navigate('/register');
                  }}
                >
                  Sign Up
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
                    name="password"
                    placeholder="password"
                    type="password"
                    component={MyField}
                    as={StyledTextField}
                  />
                </div>

                <div>
                  <StyledButton theme={theme} type="submit">
                    Log In
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
