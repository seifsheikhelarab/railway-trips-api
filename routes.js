import express from 'express';
import mongoose from 'mongoose';

import Trip from './model.js';

const router = express.Router();

router.get('/trips', (req, res) => {

    const { page = 1,
            limit = 10,
            date_from = new Date(0).toISOString(),
            date_till = new Date(8640000000000000).toISOString(), // max date in ms
            sort,
            departure} 
        = req.query;

        if(req.query.sort){
        sort = sort.split(',').join(' ');
        console.log(sort);
    };


    // if (req.query.date_from) {
    //     const fromDate = new Date(req.query.date_from.split('-').reverse().join('-')); 
    //     console.log(fromDate);
    // }

    // if (req.query.date_till) {
    //     const tillDate = new Date(req.query.date_till.split('-').reverse().join('-')); 
    //     console.log(tillDate);
    // }

    console.log(date_from);
    console.log(date_till);

    Trip.find()
        .skip((page - 1) * limit)
        .limit(limit)
        //.where('startDate').lte(date_from).gte(date_till)
        .sort(sort)
        .then(trips => res.json(trips))
        .catch(err => res.status(500).json({ error: err.message }));
});

export default router;