import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';





const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
    text: {
      // primary: '#8dcaff',
      primary: '#ffffff',
      secondary: '#18ffff',
      disabled: '#1de9b6',
    },
    background: {
      default: '#454f54',
      paper: '#000000',
    },
    divider: '#18ffff',
  },
  components: {
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-child(odd)': {
            backgroundColor: '#000000', // set the background color for odd rows
          },
          '&:nth-child(even)': {
            backgroundColor: '#232323', // set the background color for even rows
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '1.2rem', // adjust the font size as desired
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#8dcaff',
          }
        }
      }
    }
  }
});





const columns = [
  { id: 'loanTerm', 
    label: 'Loan Term', 
    align: 'center',
    minWidth: 50 },

  { id: 'rate', 
    label: 'Interest Rate', 
    align: 'center',
    minWidth: 80 },

  { id: 'principal', 
    label: 'Principal', 
    align: 'center',
    minWidth: 170 },

  {
    id: 'totalInterest',
    label: 'Total Interest Paid',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US', {style: 'currency', currency: 'USD'}),
  },

  { id: 'totalAmt', 
  label: 'Total Amount Paid', 
  align: 'center',
  minWidth: 170 },

  {
    id: 'intToPrincipal',
    label: '% of payment as interest',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US', {style: 'currency', currency: 'USD'}),
  },

];

function createData(loanTerm, rate, principal, totalInterest, totalAmt, intToPrincipal) {
  return {loanTerm, rate, principal , totalInterest, totalAmt, intToPrincipal};
}

export default function ConclusionTable(props) {

  const rows = [
    createData(props.d.loanTerm, props.d.interestRate, 
      props.d.principal, props.totalInterest, 
      (props.d.principal + props.totalInterest).toFixed(2), 
      `${(props.totalInterest * 100/props.d.principal).toFixed(2)}%`),
  ];


  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{  }}>
        <TableContainer sx={{ maxHeight: 800 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{fontSize:'1.2rem', fontWeight:'bold', minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </ThemeProvider>
  )


}