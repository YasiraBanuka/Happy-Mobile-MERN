import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
// import ScheduleModel from './models/schedule/ScheduleModel.js'
// import IRequestModel from './models/schedule/RequestModel.js'
import RentModel from './models/rent/RentModel.js'

const app = express();
app.use(cors());
app.use(express.json());

// const PORT = process.env.PORT || 5000;
const PORT = process.env.PORT || 4000;

let database;

app.listen(PORT, () => {

    // Start the server
    console.log(`Server started on port ${PORT}`)

    //connect db
    mongoose
        .connect("mongodb+srv://happyitpproject:12345@cluster0.ujqnw4p.mongodb.net/?retryWrites=true&w=majority")
        .then((connection) => {
            database = connection;
            console.log("Database Synced");
        })
        .catch((err) => {
            console.log(err.message);
        });
});

//connect with frontend
app.get("/getData", (req, res) => {
    res.send("Hello I'm from backend");
});


//throw API to SchedulRouter class
// app.use('/schedules', SchedulRouter);

// user Inserts default rent data
app.post("/rents", async (req, res) => {

    const cusName = req.body.cusName
    const cusAddress = req.body.cusAddress
    const cusContact = req.body.cusContact
    const cusEmail = req.body.cusEmail
    const itemType = req.body.itemType
    const itemBrand = req.body.itemBrand
    const itemQuantity = req.body.itemQuantity
    const rentPeriod = req.body.rentPeriod

    console.log(cusName + itemType + rentPeriod)

    const rent = new RentModel({

        userId: "45821463#23669545",
        cusName: cusName,
        cusAddress: cusAddress,
        cusContact: cusContact,
        cusEmail: cusEmail,
        itemType: itemType,
        itemBrand: itemBrand,
        itemQuantity: itemQuantity,
        rentPeriod: rentPeriod
    });

    try {
        await rent.save()
        console.log("successfully data inserted")
        res.status(200).send("Data inserted successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error occurred while inserting data");
    }
});



// Read all rented table 
app.get("/rents", async (req, res) => {

    const userId = "45821463#23669545";

    try {
        const rents = await RentModel.find({ userId });
        console.log("'rent read successfully'");
        res.status(200).json(rents);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error occurred while retrieving data');
    }

});

// read a single rent by id for update
app.get('/rents/:id', async (req, res) => {
    try {
        const rent = await RentModel.findById(req.params.id);
        console.log('rent read successfully for update');
        res.status(200).json(rent);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error occurred while retrieving data');
    }
});


// Update the rents
app.put("/rents/:id", async (req, res) => {
    const objectId = req.params.id;
    const { cusName, cusAddress, cusContact, cusEmail, itemType, itemBrand, itemQuantity, rentPeriod } = req.body;
    try {
        const updatedRent = await RentModel.findByIdAndUpdate(
            objectId,
            {
                cusName: cusName,
                cusAddress: cusAddress,
                cusContact: cusContact,
                cusEmail: cusEmail,
                itemType: itemType,
                itemBrand: itemBrand,
                itemQuantity: itemQuantity,
                rentPeriod: rentPeriod
            },
            { new: true }
        );
        res.status(200).send(updatedRent);
        console.log('rent updated successfully');

    } catch (err) {
        console.log(err);
        res.status(500).send('Error occurred while updating data');
    }
});


// Delete the rent
app.delete("/rents/:id", async (req, res) => {
    const objectId = req.params.id;
    try {
        await RentModel.findByIdAndDelete(objectId);
        console.log("'rent deleted successfully'");
        res.status(200).send('rent deleted successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error occurred while deleting data');
    }
});


// // confirmation part - request to change instructor

// // user inserts data to change instructor 
// app.post("/changerequest", async (req, res) => {
//     const { currentInstructor, requestInstructor, reason, status } = req.body;

//     // Validation checks
//     if (!currentInstructor || !requestInstructor || !reason || !status) {
//         return res.status(400).send("Please provide all required fields.");
//     }

//     const IRequest = new IRequestModel({
//         userId: "45821463#23669545",
//         currentInstructor,
//         requestInstructor,
//         reason,
//         status,
//     });

//     try {
//         await IRequest.save();
//         console.log("successfully data inserted");
//         res.status(200).send("Data inserted successfully");
//     } catch (err) {
//         console.log(err);
//         res.status(500).send("Error occurred while inserting data");
//     }
// });




