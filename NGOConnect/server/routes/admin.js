const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

// Route to view pending NGOs
router.get('/pending-ngos', authenticate, authorize('admin'), adminController.getPendingNgos);

// Route to approve an NGO
router.post('/approve-ngo/:id', authenticate, authorize('admin'), adminController.approveNgo);

// Route to reject an NGO
router.post('/reject-ngo/:id', authenticate, authorize('admin'), adminController.rejectNgo);

module.exports = router;