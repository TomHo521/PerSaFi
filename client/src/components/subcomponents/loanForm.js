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
export default function LoanForm(props) {
  const [principal, setPrincipal] = React.useState(100000);
  const [interestRate, setInterestRate] = React.useState(5);
  const [loanTerm, setLoanTerm] = React.useState(30);
  const [paymentsPerYear, setPaymentsPerYear] = React.useState(12);

  React.useEffect(() => {
    const newLoanData = {
      principal: Number(principal),
      interestRate: Number(interestRate),
      loanTerm: Number(loanTerm),
      paymentsPerYear: Number(paymentsPerYear),
    };
    props.setTable(newLoanData);
  }, [principal, interestRate, loanTerm, paymentsPerYear]);

  return (
    <ThemeProvider theme={theme}>
      <Box 
        component="form"
        sx={{
          pb: 2,
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Principal"
          defaultValue={principal}
          onChange={(e) => setPrincipal(e.target.value)}
        />
        <TextField
          label="Interest Rate (%)"
          step="0.01"
          defaultValue={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />
        <TextField
          label="Loan Term (years)"
          defaultValue={loanTerm}
          onChange={(e) => setLoanTerm(e.target.value)}
        />
        <TextField
          label="Payments Per Year"
          defaultValue={paymentsPerYear}
          onChange={(e) => setPaymentsPerYear(e.target.value)}
        />
        <Box display="flex" justifyContent="center">
          <Button onClick={props.setTableParams} variant="contained">Compute</Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
