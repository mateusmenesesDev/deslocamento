import React, { useState } from 'react';

import { Delete } from '@mui/icons-material';
import {
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
export default function DeleteButton({
  handleDelete
}: {
  handleDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Tooltip arrow placement="left" title="Remover">
        <IconButton color="error" onClick={() => setOpen(true)}>
          <Delete />
        </IconButton>
      </Tooltip>
      <div>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Você tem certeza que deseja excluir?'}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleDelete}>Confirmar</Button>
            <Button onClick={() => setOpen(false)} autoFocus>
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
