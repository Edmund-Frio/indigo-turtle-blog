import React, { useContext, useEffect, useState } from 'react';
import { myContext } from 'components/Context';
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from 'utils/constants';

const CENTER_STYLE = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const INPUT_STYLE = {};

export function CreatePost(): JSX.Element {
  const ctx = useContext(myContext);
  const theme = useTheme();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (ctx.username === undefined) navigate('/');
  });

  const handleTitle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => setTitle(e.target.value);

  const handleContent = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => setContent(e.target.value);

  const handleTags = (e: SelectChangeEvent<string[]>): void => {
    const value = e.target.value;
    setTags(typeof value === 'string' ? value.split(', ') : value);
  };

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    // TODO: Please create an object, post, with author, title, content and tags.
    // TODO: Please check if it works or not.
    if (ctx.username === undefined) navigate('/');

    const post = {
      author: ctx.username as string,
      title,
      content,
      tags,
    };

    axios
      .post(`${SERVER_URL}/createposts`, post)
      .catch((error) => console.error(error));
    navigate('/postspage');
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      style={{
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: theme.palette.secondary.dark,
        padding: '20px',
        borderRadius: 20,
        maxWidth: '60vw',
      }}
      gap={2}
    >
      <Grid item>
        <Typography variant="h3" align="center">
          Create Post
        </Typography>
      </Grid>

      <Grid item>
        <Box sx={CENTER_STYLE}>
          <Typography paddingRight={2}>Title</Typography>
          <TextField
            variant="standard"
            defaultValue={title}
            inputProps={{ style: INPUT_STYLE }}
            onChange={handleTitle}
          />
        </Box>
      </Grid>
      <Grid item>
        <Box sx={CENTER_STYLE}>
          <Typography paddingRight={2}>Content</Typography>
          <TextField
            variant="standard"
            multiline
            defaultValue={content}
            onChange={handleContent}
            sx={{ width: '45vw' }}
          ></TextField>
        </Box>
      </Grid>
      <Grid item>
        <Box sx={CENTER_STYLE}>
          <Typography paddingRight={2}>Tags</Typography>
          <Select
            variant="standard"
            multiple
            defaultValue={[]}
            onChange={(e: SelectChangeEvent<string[]>) => handleTags(e)}
          >
            {[
              'Travel',
              'Cooking',
              'Hobbies',
              'Music',
              'Career',
              'Programming',
            ].map((option: string) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Grid>

      <Grid item style={CENTER_STYLE}>
        <Button
          variant="contained"
          onClick={() => navigate('/postspage')}
          style={{
            backgroundColor: theme.palette.primary.light,
            maxWidth: '150px',
          }}
        >
          Exit
        </Button>
      </Grid>

      <Grid item style={CENTER_STYLE}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          style={{
            backgroundColor: theme.palette.primary.light,
            maxWidth: '150px',
          }}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}
