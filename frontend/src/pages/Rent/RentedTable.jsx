import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Table } from 'reactstrap'
import '../../Styles/schedule/schedule.css'
import '../../App.css'
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineSearch } from "react-icons/ai";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { showLoadingSpinner, hideLoadingSpinner } from '../../Components/Loading/Loading.js'
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const RentedTable = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [rents, setRents] = useState([]);
    const [tempData, setTempData] = useState(rents);
    const tableRef = useRef(null);

    useEffect(() => {
        const fetchRents = async () => {
            try {
                // showLoadingSpinner();
                const response = await axios.get("http://localhost:4000/rents");
                setRents(response.data);
            } catch (error) {
                console.log('Error fetching rents:', error);
            }

            // hideLoadingSpinner();
        };
        fetchRents();
    }, []);

    const handleEdit = (id) => {
        navigate(`/EditRented/${id}`);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:4000/rents/${id}`)
            .then(response => {

                console.log('rent deleted successfully');
                // Refresh the table to show updated data
                window.alert('Data has been deleted successfully');
                window.location.reload();

            })
            .catch(error => {

                console.log('Error deleting schedule:', error);

            });
    }

    return (
        <section>
            <Container>
                <div className="title code">Rent Item List</div>
                <br />
                <Row>
                    <Col>
                        <input type="button" className="tertiary_btn" value="Generate a report" />
                    </Col>

                    <Col>
                        <Row>
                            <Col>
                                <input
                                    type="search"
                                    className='search'
                                    placeholder="Search"
                                // onChange={(e) => onSearchChange(e.target.value)}
                                />

                            </Col>
                            <Col>
                                <AiOutlineSearch className="i" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <br />

                <Row>
                    <div>

                        <Table dark striped bordered hover responsive>

                            <tbody>
                                {tempData.map((row, index) => (
                                    <tr key={row.index}>
                                        <td>{row.cusName}</td>
                                        <td>{row.itemType}</td>
                                        <td>{row.itemBrand}</td>
                                        <td>{row.itemQuantity}</td>
                                        <td>{row.rentPeriod}</td>
                                        <td>{row.cusContact}</td>
                                        <td>
                                            <button className='edit_btn' onClick={() => handleEdit(row._id)}>edit</button>
                                        </td>
                                        <td>
                                            <button className='delete_btn' onClick={() => handleDelete(row._id)}>delete</button>
                                        </td>


                                    </tr>
                                ))}
                            </tbody>
                            <thead>
                                <tr>

                                    <th>Customer Name</th>
                                    <th>Item Type</th>
                                    <th>Item Brand</th>
                                    <th style={{ width: "80px" }}>Item Quantity</th>
                                    <th style={{ width: "80px" }}>No. of days</th>
                                    <th>Contact No.</th>
                                    <th style={{ width: "110px" }}>Edit</th>
                                    <th style={{ width: "110px" }}>Delete</th>
                                </tr>
                            </thead>

                            <tbody>
                                {rents.map((row) => (
                                    <tr key={row._id}>
                                        <td>{row.cusName}</td>
                                        <td>{row.itemType}</td>
                                        <td>{row.itemBrand}</td>
                                        <td>{row.itemQuantity}</td>
                                        <td>{row.rentPeriod}</td>
                                        <td>{row.cusContact}</td>

                                        <>
                                            <td>
                                                <button className='edit_btn' onClick={() => handleEdit(row._id)}>edit</button>
                                            </td>
                                            <td>
                                                <button className='delete_btn' onClick={() => handleDelete(row._id)}>delete</button>
                                            </td>
                                        </>

                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                    </div>
                </Row>
            </Container>
        </section>
    )

}

export default RentedTable;