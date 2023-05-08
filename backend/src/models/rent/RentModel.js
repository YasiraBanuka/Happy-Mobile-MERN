import mongoose from 'mongoose'

const { Schema } = mongoose

const RentSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    cusName: {
        type: String,
        required: true
    },
    cusAddress: {
        type: String,
        required: true
    },
    cusContact: {
        type: String,
        required: true
    },
    cusEmail: {
        type: String,
        required: true
    },
    itemType: {
        type: String,
        required: true
    },
    itemBrand: {
        type: String,
        required: true
    },
    itemQuantity: {
        type: String,
        required: true
    },
    rentPeriod: {
        type: String,
        required: true
    }
})

// RentData is collection name
const Rent = mongoose.model('RentData', RentSchema);

export default Rent;