import React, { useState, useEffect } from "react"
import { Container, Row, Col } from 'reactstrap'
import '../../App.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiFillCalendar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import Axios from "axios";
// import { showLoadingSpinner, hideLoadingSpinner } from '../../Components/Loading/Loading.js'
import { parseISO, format } from 'date-fns';

const AddRented = () => {

    const [cusName, setCusName] = useState("");
    const [cusAddress, setCusAddress] = useState("");
    const [cusContact, setCusContact] = useState("");
    const [cusEmail, setCusEmail] = useState("");
    const [itemType, setItemType] = useState("");
    const [itemBrand, setItemBrand] = useState("");
    const [itemQuantity, setItemQuantity] = useState("");
    const [rentPeriod, setRentPeriod] = useState("");

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        console.log('In handleFormSubmit');
        console.log(cusName + cusAddress + cusContact + cusEmail + itemType + itemBrand + itemQuantity + rentPeriod);

        try {
            const response = await Axios.post(
                'http://localhost:4000/rents/',
                {
                    cusName: cusName,
                    cusAddress: cusAddress,
                    cusContact: cusContact,
                    cusEmail: cusEmail,
                    itemType: itemType,
                    itemBrand: itemBrand,
                    itemQuantity: itemQuantity,
                    rentPeriod: rentPeriod
                }
            );
            console.log(response);
            window.alert('Data has been updated successfully');
            console.log('Successfully inserted list');
            // window.location = '/RentedTable'
        } catch (error) {
            console.log(error);
            console.log('error when update the data');
            window.alert('Data insert unsuccessfull');

        }
    };

    return (
        <body>
            <section >
                <Container>
                    <div className="form">
                        <div className="title code">Add new rented item</div>
                        <br />
                        <div style={{"display": "flex", "justifyContent": "center"}}>
                            <div className="inputs">
                                <form
                                    onSubmit={handleFormSubmit}
                                >
                                    <Row>
                                        <Col lg='4'>
                                            <label for="">Customer Name  :</label>
                                        </Col>
                                        <Col>
                                            <input type="text" name="" placeholder="" onChange={(event) => setCusName(event.target.value)} value={cusName} />
                                        </Col>
                                    </Row>
                                    <br />

                                    <Row>
                                        <Col lg='4'>
                                            <label for="">Address  :</label>
                                        </Col>
                                        <Col>
                                            <input type="text" name="" placeholder="" onChange={(event) => setCusAddress(event.target.value)} value={cusAddress} />
                                        </Col>
                                    </Row>
                                    <br />

                                    <Row>
                                        <Col lg='4'>
                                            <label for="">Contact Number  :</label>
                                        </Col>
                                        <Col>
                                            <input type="text" name="" placeholder="" onChange={(event) => setCusContact(event.target.value)} value={cusContact} />
                                        </Col>
                                    </Row>
                                    <br />

                                    <Row>
                                        <Col lg='4'>
                                            <label for="">Email  :</label>
                                        </Col>
                                        <Col>
                                            <input type="text" name="" placeholder="" onChange={(event) => setCusEmail(event.target.value)} value={cusEmail} />
                                        </Col>
                                    </Row>
                                    <br />

                                    <Row>
                                        <Col lg='4'>
                                            <label for="">Item Type  :</label>
                                        </Col>
                                        <Col>
                                            <input type="text" name="" placeholder="" onChange={(event) => setItemType(event.target.value)} value={itemType} />
                                        </Col>
                                    </Row>
                                    <br />

                                    <Row>
                                        <Col lg='4'>
                                            <label for="">Item Brand  :</label>
                                        </Col>
                                        <Col>
                                            <input type="text" name="" placeholder="" onChange={(event) => setItemBrand(event.target.value)} value={itemBrand} />
                                        </Col>
                                    </Row>
                                    <br />

                                    <Row>
                                        <Col lg='4'>
                                            <label for="">Item Quantity  :</label>
                                        </Col>
                                        <Col>
                                            <input type="text" name="" placeholder="" onChange={(event) => setItemQuantity(event.target.value)} value={itemQuantity} />
                                        </Col>
                                    </Row>
                                    <br />

                                    <Row>
                                        <Col lg='4'>
                                            <label for="">Renting period (days)  :</label>
                                        </Col>
                                        <Col>
                                            <input type="text" name="" placeholder="" onChange={(event) => setRentPeriod(event.target.value)} value={rentPeriod} />
                                        </Col>
                                    </Row>
                                    <br />

                                    <div className="form-btns">
                                        < Row>
                                            <Col>
                                                <button type='cancle' className='secondary__btn submit'>Cancel</button>
                                            </Col>
                                            <Col>
                                                <button type='save' className='primary__btn submit'>Submit</button>
                                            </Col>
                                        </ Row>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Container >
            </section >
        </body>
    )
}

export default AddRented;