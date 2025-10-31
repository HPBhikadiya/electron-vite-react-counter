import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import InventoryTable from '../components/inventory/InventoryTable';
import InventoryDialog from '../components/inventory/InventoryDialog';
import type { InventoryItem } from '../types/inventory';

const initialItems: InventoryItem[] = [
  {
    id: 1,
    name: 'Laptop Pro 15"',
    sku: 'LAP-001',
    quantity: 45,
    price: 1299.99,
    category: 'Electronics',
    status: 'in_stock',
  },
  {
    id: 2,
    name: 'Wireless Mouse',
    sku: 'ACC-002',
    quantity: 5,
    price: 29.99,
    category: 'Accessories',
    status: 'low_stock',
  },
  {
    id: 3,
    name: 'USB-C Cable',
    sku: 'ACC-003',
    quantity: 0,
    price: 19.99,
    category: 'Accessories',
    status: 'out_of_stock',
  },
];

export default function Inventory() {
  const [items, setItems] = useState<InventoryItem[]>(initialItems);
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [formData, setFormData] = useState<Partial<InventoryItem>>({
    name: '',
    sku: '',
    quantity: 0,
    price: 0,
    category: '',
    status: 'in_stock',
  });

  const handleOpen = (item?: InventoryItem) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        sku: '',
        quantity: 0,
        price: 0,
        category: '',
        status: 'in_stock',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingItem(null);
    setFormData({
      name: '',
      sku: '',
      quantity: 0,
      price: 0,
      category: '',
      status: 'in_stock',
    });
  };

  const handleSave = () => {
    if (editingItem) {
      setItems(
        items.map((item) =>
          item.id === editingItem.id
            ? ({ ...formData, id: editingItem.id } as InventoryItem)
            : item,
        ),
      );
    } else {
      const newItem: InventoryItem = {
        ...formData,
        id: Math.max(...items.map((i) => i.id), 0) + 1,
      } as InventoryItem;
      setItems([...items, newItem]);
    }
    handleClose();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Inventory Management
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>
          Add Item
        </Button>
      </Box>

      <InventoryTable items={items} onEdit={handleOpen} onDelete={handleDelete} />

      <InventoryDialog
        open={open}
        editingItem={editingItem}
        formData={formData}
        onChange={setFormData}
        onClose={handleClose}
        onSave={handleSave}
      />
    </Box>
  );
}
