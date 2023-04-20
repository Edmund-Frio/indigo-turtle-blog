import React, { useState } from 'react';
import { Avatar, Box } from '@mui/material';

const IMAGE_STYLE = {
  borderRadius: '50%',
  width: '100px',
  height: '100px',
  margin: '30px',
};

function ProfilePictureIcon(): JSX.Element {
  // we need to add a profile picture to the user model. Default turtle image will load in and then be replaced with uploaded picture if available
  return (
    <Box>
      <Avatar
        className="profilePicture"
        src={require('./turtleCircle.png')}
        alt=""
        style={IMAGE_STYLE}
      />
    </Box>
  );
}

export { ProfilePictureIcon };
