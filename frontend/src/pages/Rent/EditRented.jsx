import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../App.css";
import { Container, Row, Col } from "reactstrap";
import { AiFillCalendar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { parseISO, format } from 'date-fns';

const EditRented = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [cusName, setCusName] = useState("");
    const [cusAddress, setCusAddress] = useState("");
    const [cusContact, setCusContact] = useState("");
    const [cusEmail, setCusEmail] = useState("");
    const [itemType, setItemType] = useState("");
    const [itemBrand, setItemBrand] = useState("");
    const [itemQuantity, setItemQuantity] = useState("");
    const [rentPeriod, setRentPeriod] = useState("");
    const [rent, setRent] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRent = async () => {
            try {
                const response = await Axios.get(`http://localhost:4000/rents/${id}`);
                setRent(response.data);
                setCusName(response.data.cusName);
                setCusAddress(response.data.cusAddress);
                setCusContact(response.data.cusContact);
                setCusEmail(response.data.cusEmail);
                setItemType(response.data.itemType);
                setItemBrand(response.data.itemBrand);
                setItemQuantity(response.data.itemQuantity);
                setRentPeriod(response.data.rentPeriod);
            } catch (error) {
                setError("Error fetching rent");
                console.log('Error fetching rent:', error);
            }
        };
        fetchRent();
    }, [id]);

    const handleFormSubmit = (event) => {

        event.preventDefault();

        console.log("In handleFormSubmit");
        console.log(cusName);
        // showLoadingSpinner();

        // Send the updated data to the server using an API call
        Axios.put(`http://localhost:4000/rents/${id}`, {
            cusName: cusName,
            cusAddress: cusAddress,
            cusContact: cusContact,
            cusEmail: cusEmail,
            itemType: itemType,
            itemBrand: itemBrand,
            itemQuantity: itemQuantity,
            rentPeriod: rentPeriod
        })
            .then(response => {
                console.log(response);
                // hideLoadingSpinner();
                window.alert('Data has been updated successfully');
                window.location = "http://localhost:3000/rentedtable";
                console.log('Successfully updated list');
            })
            .catch(error => {
                console.log(error);
                console.log("error when update the data");
                window.alert('Data is not updated successfully');
                window.location.reload();
            });
    };

    const clickReset = () => {
        navigate('/rentedtable')
    }

    return (
        <body>
            <section>
                <Container>
                    <div className="form">
                        <div className="title code">Update Rented Items</div>
                        <br/>
                        <div style={{"display": "flex", "justifyContent": "center"}}>
                            <div className="inputs" style={{"width": "600px"}}>
                                <form onSubmit={handleFormSubmit}>
                                    <Row>
                                        <Col lg="4">
                                            <label htmlFor="name">Name :</label>
                                        </Col>
                                        <Col>
                                            <input
                                                type="text"
                                                className=""
                                                value={cusName}
                                                onChange={e => setCusName(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col lg="4">
                                            <label htmlFor="name">Address :</label>
                                        </Col>
                                        <Col>
                                            <input
                                                type="text"
                                                className=""
                                                value={cusAddress}
                                                onChange={e => setCusAddress(e.target.value)}
                                            />

                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col lg="4">
                                            <label htmlFor="name">Contact No. :</label>
                                        </Col>
                                        <Col>
                                            <input
                                                type="text"
                                                className=""
                                                value={cusContact}
                                                onChange={e => setCusContact(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col lg="4">
                                            <label htmlFor="name">Email :</label>
                                        </Col>
                                        <Col>
                                            <input
                                                type="text"
                                                className=""
                                                value={cusEmail}
                                                onChange={e => setCusEmail(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col lg="4">
                                            <label htmlFor="name">Item Type :</label>
                                        </Col>
                                        <Col>
                                            <input
                                                type="text"
                                                className=""
                                                value={itemType}
                                                onChange={e => setItemType(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col lg="4">
                                            <label htmlFor="name">Item Brand :</label>
                                        </Col>
                                        <Col>
                                            <input
                                                type="text"
                                                className=""
                                                value={itemBrand}
                                                onChange={e => setItemBrand(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col lg="4">
                                            <label htmlFor="name">Quantity :</label>
                                        </Col>
                                        <Col>
                                            <input
                                                type="text"
                                                className=""
                                                value={itemQuantity}
                                                onChange={e => setItemQuantity(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col lg="4">
                                            <label htmlFor="name">Rent Period (Days) :</label>
                                        </Col>
                                        <Col>
                                            <input
                                                type="text"
                                                className=""
                                                value={rentPeriod}
                                                onChange={e => setRentPeriod(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <br/>
                                    <div style={{"display": "flex", "flexDirection": "row", "justifyContent": "center"}}>
                                        {/* <Row> */}
                                            <div style={{"marginRight": "20px"}}>
                                                <button
                                                    type="reset"
                                                    className="secondary__btn "
                                                    onClick={clickReset}>
                                                    Reset
                                                </button>
                                            </div>
                                            <div>
                                                <button
                                                    type="submit"
                                                    className="primary__btn submit">
                                                    Save
                                                </button>
                                            </div>
                                        {/* </Row> */}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </body>
    );
};

export default EditRented;