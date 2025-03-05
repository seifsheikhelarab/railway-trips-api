import express from 'express';
import mongoose from 'mongoose';

import Trip from './model.js';

const router = express.Router();

router.get('/trips', (req, res) => {

    let { 
            page = 1,
            limit = 10,
            date_from,
            date_till,
            sort,
            departure = '',
            destination = ''
        } 
        = req.query;

        let filter = {};

        //Sorting Logic
        if(req.query.sort){
        sort = sort.split(',').join(' ');
        console.log(sort);
    };

        //Date Logic
        let fromDate = new Date(0).toISOString();
        let tillDate = new Date(8640000000000000).toISOString();

        if(req.query.date_from){
            const formattedFromDate = date_from.split('-');
            fromDate = new Date(formattedFromDate[2], formattedFromDate[1]-1, formattedFromDate[0]);
        }
        if(req.query.date_till){
            const formattedTillDate = date_till.split('-');
            tillDate = new Date(formattedTillDate[2], formattedTillDate[1]-1, formattedTillDate[0]);
        }

        //Departure and Destination Logic
        if (departure) {
            filter.departurePlace = departure;
        }
        if (destination) {
            filter.destination = destination;
        }

    Trip.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .where('startDate').gte(fromDate).lte(tillDate)
        .sort(sort)
        .then(trips => res.json(trips))
        .catch(err => res.status(500).json({ error: err.message }));
});



router.post('/trips', (req, res) => {

    const {
        departurePlace,
        destination,
        startDate,
        duration,
        numberOfPassengers
    } = req.body;

    if(numberOfPassengers<=1){
        return res.status(400).json({error: "Number of passengers must be greater than 1"});
    }

    const formattedDate = startDate.split('-');
    let formattedStartDate = new Date(formattedDate[2], formattedDate[1]-1, formattedDate[0]);

    const newTrip = new Trip({
        departurePlace,
        destination,
        startDate: formattedStartDate,
        duration,
        numberOfPassengers
    });

    newTrip.save()
        .then(trip => res.status(201).json(trip))
        .catch(err => res.status(500).json({ error: err.message }));

});

export default router;