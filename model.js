import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
    departurePlace: { type: String, required: true },
    destination: { type: String, required: true },
    startDate: { type: Date, required: true },
    duration: { type: Number, required: true },
    numberOfPassengers: { type: Number, required: true },
});

export default mongoose.model('Trip', tripSchema);