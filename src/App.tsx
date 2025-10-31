import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

function App() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((count) => count + 1);
  const decrement = () => setCount((count) => count - 1);
  const reset = () => setCount(0);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 2,
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            Simple Counter
          </Typography>
          
          <Typography
            variant="h1"
            component="div"
            sx={{
              my: 4,
              color: 'primary.main',
              fontWeight: 'bold',
            }}
          >
            {count}
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ mt: 3 }}
          >
            <Button
              variant="contained"
              color="error"
              startIcon={<RemoveIcon />}
              onClick={decrement}
              size="large"
            >
              Decrement
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<RestartAltIcon />}
              onClick={reset}
              size="large"
            >
              Reset
            </Button>
            
            <Button
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
              onClick={increment}
              size="large"
            >
              Increment
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}

export default App;
