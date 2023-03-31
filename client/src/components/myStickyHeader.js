import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
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
  { id: 'period', 
    label: 'Period', 
    align: 'center',
    minWidth: 50 },
  { id: 'pmt', 
    label: 'Total Monthly Payment', 
    align: 'center',
    minWidth: 170 },
  {
    id: 'ppmt',
    label: 'Principal Paid',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US', {style: 'currency', currency: 'USD'}),
  },
  {
    id: 'ipmt',
    label: 'Interest Paid',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US', {style: 'currency', currency: 'USD'}),
  },
  {
    id: 'ratio_i',
    label: '% of payment as interest',
    minWidth: 50,
    align: 'center',
    format: (value) => value.toLocaleString('en-US', {style: 'currency', currency: 'USD'}),
  },
  {
    id: 'loan',
    label: 'Loan Remaining',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US', {style: 'currency', currency: 'USD'}),
  },
];


export default function StickyHeadTable(props) {
  //console.log('inside child: ', props.rows)
  const rows = props.rows;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(12);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ /*width: '100%', height: '100%', */overflow: 'hidden' }}>
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
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
        <TablePagination
          rowsPerPageOptions={[12, 24, 96]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </ThemeProvider>
  );
}