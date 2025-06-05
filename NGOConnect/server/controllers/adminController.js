const User = require('../models/User');

// Get all pending NGOs
exports.getPendingNgos = async (req, res) => {
    try {
        const ngos = await User.find({ role: 'ngo', status: 'pending' });
        res.status(200).json({ ngos });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving pending NGOs', error });
    }
};

// Approve an NGO
exports.approveNgo = async (req, res) => {
    const { id } = req.params;
    try {
        const ngo = await User.findByIdAndUpdate(
            id,
            { status: 'approved' },
            { new: true }
        );
        if (!ngo) {
            return res.status(404).json({ message: 'NGO not found' });
        }
        res.status(200).json({ message: 'NGO approved', ngo });
    } catch (error) {
        res.status(500).json({ message: 'Error approving NGO', error });
    }
};

// Reject (delete) an NGO
exports.rejectNgo = async (req, res) => {
    const { id } = req.params;
    try {
        const ngo = await User.findByIdAndDelete(id);
        if (!ngo) {
            return res.status(404).json({ message: 'NGO not found' });
        }
        res.status(200).json({ message: 'NGO rejected and deleted', ngo });
    } catch (error) {
        res.status(500).json({ message: 'Error rejecting NGO', error });
    }
};