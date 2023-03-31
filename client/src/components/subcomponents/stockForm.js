import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff6d00',
    },
    secondary: {
      main: '#ffea00',
    },
    text: {
      primary: '#8dcaff',
      secondary: '#18ffff',
    },
    background: {
      default: '#000000',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#8dcaff'
          }
        }
      }
    }
  }
});

export default function StockForm(props) {
  const [ticker, setTicker] = React.useState('SPY');
  const [startDate, setStartDate] = React.useState('2010-01-29');
  const [endDate, setEndDate] = React.useState('2023-03-12');


  React.useEffect(() => {
  }, [ticker, startDate, endDate]);

  const clickHandler = () => {
    let newObj = {
      ticker:ticker, 
      startDate:startDate, 
      endDate:endDate
    }
    console.log('form obj: ', newObj)
    props.setStockParams(newObj);
  }

  return (
    <ThemeProvider theme={theme}>
      <Box 
        component="form"
        sx={{
          pt: 4,
          pb: 2,
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="ticker"
          defaultValue={ticker}
          onChange={(e) => setTicker(e.target.value)}
        />
        <TextField
          label="start-date"
          defaultValue={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          label="end-date"
          defaultValue={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <Box display="flex" justifyContent="center">
          <Button onClick={clickHandler} variant="contained">Update</Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
