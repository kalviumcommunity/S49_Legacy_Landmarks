const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs');


const requestFilesDir = './docs.bruno/';


const readRequestFile = (fileName) => {
  const filePath = requestFilesDir + fileName;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

// Create Resource route
router.post('/create-resource', async (req, res) => {
  try {
    const createRequest = readRequestFile('create_resource.json');
    const response = await axios.post(createRequest.post.url, createRequest.post.body, {
      headers: { Authorization: createRequest.post.auth }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status || 500).json({ error: error.message });
  }
});

// Read Resource route
router.get('/read-resource/:id', async (req, res) => {
  try {
    const resourceId = req.params.id;
    const readRequest = readRequestFile('read_resource.json');
    readRequest.get.url = readRequest.get.url.replace('RESOURCE_ID', resourceId);
    const response = await axios.get(readRequest.get.url, {
      headers: { Authorization: readRequest.get.auth }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status || 500).json({ error: error.message });
  }
});

// Update Resource route
router.put('/update-resource/:id', async (req, res) => {
  try {
    const resourceId = req.params.id;
    const updateRequest = readRequestFile('update_resource.json');
    updateRequest.put.url = updateRequest.put.url.replace('RESOURCE_ID', resourceId);
    const response = await axios.put(updateRequest.put.url, updateRequest.put.body, {
      headers: { Authorization: updateRequest.put.auth }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status || 500).json({ error: error.message });
  }
});

// Delete Resource route
router.delete('/delete-resource/:id', async (req, res) => {
  try {
    const resourceId = req.params.id;
    const deleteRequest = readRequestFile('delete_resource.json');
    deleteRequest.delete.url = deleteRequest.delete.url.replace('RESOURCE_ID', resourceId);
    const response = await axios.delete(deleteRequest.delete.url, {
      headers: { Authorization: deleteRequest.delete.auth }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status || 500).json({ error: error.message });
  }
});

module.exports = router;
