import React, { useState } from 'react';
import axios from 'axios';
import Popup from './Popup';
import { SERVER_URL } from 'utils/constants';

function ProfilePictureForm(): JSX.Element {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [fileError, setFileError] = useState('');

  // validates the selected file to ensure it's an image and limtis size
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target?.files?.[0];
    if (file != null) {
      if (!file.type.includes('image')) {
        setFileError('Only image files are allowed');
      } else if (file.size > 5000000) {
        setFileError('File size cannot exceed 5MB');
      } else {
        setSelectedFile(file);
        setFileError('');
      }
    }
  };

  // sends API request with profile picture
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    axios
      .post(`${SERVER_URL}/changeProfilePicture`, { selectedFile })
      .then((response) => {
        setFileError('Profile picture changed');
      })
      .catch((error) => {
        console.error(error);
        setFileError('An error occurred while changing profile pictures.');
      });
  };
  // uses the popup component
  return Popup(
    <div>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="formContainer"
      >
        <label htmlFor="profilePicture">Change your profile picture:</label>
        <input
          type="file"
          id="profilePicture"
          name="profilePicture"
          accept=".jpg,.jpeg,.png"
          onChange={handleFileUpload}
          required
        />
        <span style={{ color: 'red' }}>{fileError}</span>
        <input className="btn" type="submit" value="Upload" />
      </form>
    </div>,
    'Change Profile Picture'
  );
}

export { ProfilePictureForm };
