import React, { useContext, useEffect, useMemo, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { createGrammar, deleteGrammarApi, fetchGrammar } from '../../http/grammarAPI';
import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteGrammar = ({ show, onHide }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (!show) return;
    const fetch = async () => {
      setLoading(true);
      await fetchGrammar()
        .then((res) => setData(res))
        .finally(() => setLoading(false));
    };
    fetch();
  }, [show]);

  const [searchTerm, setSearchTerm] = useState('');
  const filteredData = useMemo(() => {
    if (searchTerm === '') return data;
    return data.filter((item) => {
      if (
        item.id.toString().includes(searchTerm) ||
        item.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dayjs(item.createdAt).format('DD-MM-YYYY').includes(searchTerm)
      ) {
        return true;
      }
      return false;
    });
  }, [searchTerm, data]);
  const deleteGrammar = async (id) => {
    setLoading(true);
    await deleteGrammarApi(id)
      .then(() => {
        setData((prev) => prev.filter((item) => item.id !== id));
      })
      .finally(() => setLoading(false));
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Delete grammar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Box sx={{ maxHeight: '600px' }}>
          <Typography>Grammars:</Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            <Stack spacing={1}>
              <TextField
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Topic</TableCell>
                      <TableCell>Created At</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData.map((oneItem) => (
                      <TableRow key={oneItem.id}>
                        <TableCell>{oneItem.id}</TableCell>
                        <TableCell>{oneItem.topic}</TableCell>
                        <TableCell>
                          {dayjs(new Date(oneItem.createdAt)).format('DD-MM-YYYY')}
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => deleteGrammar(oneItem.id)}>
                            <DeleteIcon sx={{ color: 'red' }} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          )}
        </Box>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteGrammar;
