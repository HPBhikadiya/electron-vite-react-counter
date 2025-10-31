import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
} from '@mui/material';
import { Visibility as VisibilityIcon } from '@mui/icons-material';

interface Order {
  id: string;
  customer: string;
  date: string;
  items: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

const orders: Order[] = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    date: '2024-01-15',
    items: 3,
    total: 299.97,
    status: 'pending',
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    date: '2024-01-14',
    items: 1,
    total: 1299.99,
    status: 'processing',
  },
  {
    id: 'ORD-003',
    customer: 'Bob Johnson',
    date: '2024-01-13',
    items: 5,
    total: 149.95,
    status: 'shipped',
  },
  {
    id: 'ORD-004',
    customer: 'Alice Brown',
    date: '2024-01-12',
    items: 2,
    total: 259.98,
    status: 'delivered',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'processing':
      return 'info';
    case 'shipped':
      return 'primary';
    case 'delivered':
      return 'success';
    case 'cancelled':
      return 'error';
    default:
      return 'default';
  }
};

export default function Orders() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Orders
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Manage and track all customer orders.
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small" color="primary">
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
