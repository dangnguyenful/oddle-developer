import { styled } from '@mui/material/styles';
import { red, green, blue } from '@mui/material/colors';

const Root = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    maxWidth: '587px',
  },
  [theme.breakpoints.up('md')]: {
    maxWidth: '468px',
  }
}));

export default Root;