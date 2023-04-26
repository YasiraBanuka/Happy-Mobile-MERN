import RentModel from '../../models/rent/RentModel.js';

// Create a function to create a new rent
export async function createOne(req, res) {
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
}

// Create a function to read all rents
export async function getAll(req, res) {

    const userId = "45821463#23669545";

    try {
        const rents = await RentModel.find({ userId });
        res.status(200).json(rents);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error occurred while retrieving data');
    }
}


// Create a function to update a rent by id
export async function updateOne(req, res) {
    const objectId = req.params.id;
    const { cusName, cusAddress, cusContact, cusEmail, itemType,itemBrand,itemQuantity, rentPeriod } = req.body;
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
        console.log('Rent updated successfully');

    } catch (err) {
        console.log(err);
        res.status(500).send('Error occurred while updating data');
    }
}

// Create a function to delete a rent by id
export async function deleteOne(req, res) {
    const objectId = req.params.id;
    try {
        await RentModel.findByIdAndDelete(objectId);
        res.status(200).send('Rent deleted successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error occurred while deleting data');
    }
}

// Export all the controller functions as an object
export default { createOne, getAll, updateOne, deleteOne };
