import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import type { InventoryItem } from '../../types/inventory';

interface InventoryDialogProps {
  open: boolean;
  editingItem: InventoryItem | null;
  formData: Partial<InventoryItem>;
  onChange: (data: Partial<InventoryItem>) => void;
  onClose: () => void;
  onSave: () => void;
}

export default function InventoryDialog({
  open,
  editingItem,
  formData,
  onChange,
  onClose,
  onSave,
}: InventoryDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editingItem ? 'Edit Item' : 'Add New Item'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              value={formData.name || ''}
              onChange={(e) => onChange({ ...formData, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="SKU"
              value={formData.sku || ''}
              onChange={(e) => onChange({ ...formData, sku: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Category"
              value={formData.category || ''}
              onChange={(e) => onChange({ ...formData, category: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Quantity"
              value={formData.quantity ?? 0}
              onChange={(e) => onChange({ ...formData, quantity: parseInt(e.target.value) || 0 })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Price"
              value={formData.price ?? 0}
              onChange={(e) => onChange({ ...formData, price: parseFloat(e.target.value) || 0 })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Status"
              value={formData.status || 'in_stock'}
              onChange={(e) =>
                onChange({ ...formData, status: e.target.value as InventoryItem['status'] })
              }
              SelectProps={{ native: true }}
            >
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave} variant="contained">
          {editingItem ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
