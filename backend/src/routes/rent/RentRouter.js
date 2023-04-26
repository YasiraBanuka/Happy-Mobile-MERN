import express from 'express';
import { createOne, getAll, updateOne, deleteOne } from '../../controller/rent/RentCtrl.js';
// import { createOne, getAll, updateOne, deleteOne } from '../../controller/schedule/ScheduleCtrl.js';

const router = express.Router();

console.log('IN RentRouter');

// create a rent item
router.post('/rents', createOne);

// get all rents
router.get('/rents', getAll);

// update a rent by id
router.put('/rents/:id', updateOne);

// delete a rent by id
router.delete('/rents/:id', deleteOne);

export default router;
