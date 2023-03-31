import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
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

export default function BarChartForm(props) {

  const [interestRate, setInterestRate] = useState(5.5);
  const [startRange, setStartRange] = useState(4);
  const [endRange, setEndRange] = useState(7);
  const [stepSize, setStepSize] = useState(.5);
  const [principal, setPrincipal] = useState(100000);
  const [term, setTerm] = useState(30);
  

  React.useEffect(() => {
  }, [interestRate, principal, term, startRange, endRange, stepSize]);

  const clickHandler = () => {
    let newObj = {
      interestRate: parseFloat(interestRate),
      principal:parseFloat(principal),
      term:term,
      startRange:parseFloat(startRange),
      endRange:parseFloat(endRange),
      stepSize:parseFloat(stepSize),
    }
    //console.log('form obj: ', newObj)
    props.setBarChartParams(newObj);
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
        {/* <TextField
          label="Interest Rate"
          defaultValue={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        /> */}
        <TextField
          label="Principal"
          defaultValue={principal}
          onChange={(e) => setPrincipal(e.target.value)}
        />
        <TextField
          label="Term"
          defaultValue={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <TextField
          label="start of range"
          defaultValue={startRange}
          onChange={(e) => setStartRange(e.target.value)}
        />
        <TextField
          label="end of Range"
          defaultValue={endRange}
          onChange={(e) => setEndRange(e.target.value)}
        />
        <TextField
          label="step size"
          defaultValue={stepSize}
          onChange={(e) => setStepSize(e.target.value)}
        />
        <Box display="flex" justifyContent="center">
          <Button onClick={clickHandler} variant="contained">Update</Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
