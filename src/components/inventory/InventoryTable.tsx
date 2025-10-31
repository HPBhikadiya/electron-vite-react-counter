import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import type { InventoryItem } from '../../types/inventory';

interface InventoryTableProps {
  items: InventoryItem[];
  onEdit: (item: InventoryItem) => void;
  onDelete: (id: number) => void;
}

function getStatusColor(status: InventoryItem['status']) {
  switch (status) {
    case 'in_stock':
      return 'success';
    case 'low_stock':
      return 'warning';
    case 'out_of_stock':
      return 'error';
    default:
      return 'default';
  }
}

function getStatusLabel(status: InventoryItem['status']) {
  return status.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

export default function InventoryTable({ items, onEdit, onDelete }: InventoryTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>SKU</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.sku}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>${item.price.toFixed(2)}</TableCell>
              <TableCell>
                <Chip
                  label={getStatusLabel(item.status)}
                  color={getStatusColor(item.status) as any}
                  size="small"
                />
              </TableCell>
              <TableCell align="right">
                <IconButton size="small" onClick={() => onEdit(item)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton size="small" onClick={() => onDelete(item.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
