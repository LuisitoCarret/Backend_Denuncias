const router = require('express').Router();
const {
  createComplaint,
  listComplaints,
  updateComplaint,
  deleteComplaint,
  getComplaintById
} = require('../controllers/complaintController');

router.post('/new', createComplaint);
router.get('/',  listComplaints);
router.patch('/:id', updateComplaint);
router.delete('/:id', deleteComplaint);
router.get('/:id', getComplaintById);

module.exports = router;
