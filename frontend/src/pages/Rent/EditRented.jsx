import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../App.css";
import "../../Styles/schedule/schedule.css";
import { Container, Row, Col } from "reactstrap";
// import image from "../../../images/Schedule/image2.jpg";
import { AiFillCalendar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import Axios from "axios";
// import { showLoadingSpinner, hideLoadingSpinner } from '../../../Components/Loading/Loading.js'
import { parseISO, format } from 'date-fns';

const EditRented = () => {

    const { id } = useParams();
    const [cusName, setCusName] = useState("");
    const [cusAddress, setCusAddress] = useState("");
    const [cusContact, setCusContact] = useState("");
    const [cusEmail, setCusEmail] = useState("");
    const [itemType, setItemType] = useState("");
    const [itemBrand, setItemBrand] = useState("");
    const [itemQuantity, setItemQuantity] = useState("");
    const [rentPeriod, setRentPeriod] = useState("");
    const [rent, setRent] = useState(null);


    useEffect(() => {
        // showLoadingSpinner();
        const fetchRent = async () => {
            try {

                const response = await Axios.get(`http://localhost:4000/rents/${id}`);
                setRent(response.data);
                // setStartDate(response.date);
                setCusName(response.cusName);
                setCusAddress(response.cusAddress);
                setCusContact(response.cusContact);
                setCusEmail(response.cusEmail);
                setItemType(response.itemType);
                setItemBrand(response.itemBrand);
                setItemQuantity(response.itemQuantity);
                setRentPeriod(response.rentPeriod);
                console.log(response.data);
            } catch (error) {
                console.log('Error fetching rent:', error);
            }
            // hideLoadingSpinner();
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

    return (
        <body>
            <section>
                <Container>
                    <div className="form">
                        <div className="title code">Update Rented Items</div>
                        <div className="inputs">
                            <form onSubmit={handleFormSubmit}>
                                {/* <Row>
                                    <img src={image} alt="" className="images" />
                                </Row>
                                <br /> */}
                                <Row>
                                    <Col lg="4">
                                        <label htmlFor="name">Name :</label>
                                    </Col>
                                    <Col>
                                        <input 
                                            type="text" 
                                            className=""
                                            value={{ cusName }}
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
                                            value={{ cusAddress }}
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
                                            value={{ cusContact }}
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
                                            value={{ cusEmail }}
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
                                            value={{ itemType }}
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
                                            value={{ itemBrand }}
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
                                            value={{ itemQuantity }}
                                            onChange={e => setItemQuantity(e.target.value)}
                                        />
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col lg="4">
                                        <label htmlFor="name">Rent Period :</label>
                                    </Col>
                                    <Col>
                                        <input 
                                            type="text" 
                                            className=""
                                            value={{ rentPeriod }}
                                            onChange={e => setRentPeriod(e.target.value)}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="10" className="cancel">
                                        <button
                                            type="reset"
                                            className="secondary__btn ">
                                            Reset
                                        </button>
                                    </Col>
                                    <Col>
                                        <button
                                            type="submit"
                                            className="primary__btn submit">
                                            Save
                                        </button>
                                    </Col>
                                </Row>
                            </form>
                        </div>
                    </div>
                </Container>
            </section>
        </body>
    );
};

export default EditRented;
