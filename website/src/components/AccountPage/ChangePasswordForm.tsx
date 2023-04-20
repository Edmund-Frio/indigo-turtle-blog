import React, { useContext, useState } from 'react';
import axios from 'axios';
import Popup from './Popup';
import { Box, Button, Container, FilledInput, Input } from '@mui/material';
import { Label } from '@mui/icons-material';
import { myContext } from 'components/Context';
import { useNavigate } from 'react-router';
import { SERVER_URL } from 'utils/constants';

const FORM_CONTAINER_STYLE = {
  paddingTop: '40px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
};

const INPUT_STYLE = {
  height: '35px',
};

function ChangePasswordForm(): JSX.Element {
  const navigate = useNavigate();
  const unconfirmedCtx = useContext(myContext);
  if (unconfirmedCtx.username === undefined) navigate('/');
  const ctx: User = unconfirmedCtx as User;

  const [currentPassword, setCurrentPassword] = useState(ctx.password);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // submits password change
  const handleSubmitPassword = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      axios
        .patch(`${SERVER_URL}/user/updatePassword/${ctx.uid as string}`, {
          activeUser: ctx.username,
          newPassword,
        })
        .then((response) => {
          setPasswordError('Password changed');
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
        })
        .catch((error) => {
          console.error(error);
          setPasswordError('An error occurred while changing the password.');
        });
    }
  };
  return Popup(
    <Container sx={FORM_CONTAINER_STYLE}>
      Change your password
      <form
        className=""
        onSubmit={handleSubmitPassword}
        action="/changePassword"
        method="POST"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <label htmlFor="password">Current password:</label>
        <FilledInput
          type="password"
          id="currentPassword"
          name="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          style={INPUT_STYLE}
        />

        <label htmlFor="newPassword">New Password:</label>
        <FilledInput
          type="password"
          id="newPassword"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          style={INPUT_STYLE}
        />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <FilledInput
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={INPUT_STYLE}
        />

        <Box style={{ color: 'red' }}>{passwordError}</Box>

        <Button className="btn submitBtn" type="submit">
          Submit
        </Button>
      </form>
    </Container>,
    'Change Password'
  );
}

export { ChangePasswordForm };
