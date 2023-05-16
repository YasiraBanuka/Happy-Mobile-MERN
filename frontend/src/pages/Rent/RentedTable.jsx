import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Table } from 'reactstrap'
import '../../App.css'
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineSearch } from "react-icons/ai";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const RentedTable = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [rents, setRents] = useState([]);
    const [tempData, setTempData] = useState([]);
    const tableRef = useRef(null);

    useEffect(() => {
        const fetchRents = async () => {
            try {
                const response = await axios.get("http://localhost:4000/rents");
                const rentWithName = response.data.map(rent => ({
                    ...rent,
                    cusName: rent.cusName.toString()
                }))
                setRents(rentWithName)
            } catch (error) {
                console.log('Error fetching rents:', error);
            }
        };
        fetchRents();
    }, []);

    useEffect(() => {
        setTempData(rents)
    }, [rents])

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

    const onSearchChange = (value) => {
        console.log(value);

        const newData = rents.filter((rent) =>
            rent.cusName.toLowerCase().includes(value.toLowerCase())
        );
        console.log(newData);
        setTempData(newData);
    };

    const handleGenerateReport = () => {
        // Create a new PDF document
        const unit = "pt";
        const size = "A4";
        const orientation = "landscape";
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
        // const doc = new jsPDF();

        // Add title to PDF
        const title = "Rented Item Report";
        doc.text(title, marginLeft, 40);
      
        // Define columns for the table
        const columns = [
          { header: "Customer Name", dataKey: "cusName" },
          { header: "Item Type", dataKey: "itemBrand" },
          { header: "Item Brand", dataKey: "itemType" },
          { header: "Item Quantity", dataKey: "itemQuantity" },
          { header: "No.of Days", dataKey: "rentPeriod" },
          { header: "Contact No.", dataKey: "cusContact" }
        ];
      
        // Create rows from orders data
        const rows = rents.map(rents => ({
          cusName: rents.cusName,
          itemType: rents.itemType,
          itemBrand: rents.itemBrand,
          itemQuantity: rents.itemQuantity,
          rentPeriod: rents.rentPeriod,
          cusContact: rents.cusContact
        }));
      
        // Add the table to the document
        doc.autoTable({
            startY: 60,
            columns,
            body: rows
        });
      
        // Save the PDF as a file and download it
        doc.save("RentedItemReport.pdf");
    };

    return (
        <section>
            <Container>
                <div className="title code">Rent Item List</div>
                <br />
                <Row>
                    <Col>
                        <input type="button" className="tertiary_btn" value="Generate a report" onClick={handleGenerateReport} />
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <input
                                    type="search"
                                    className='search'
                                    placeholder="Search"
                                    onChange={(e) => onSearchChange(e.target.value)}
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
                            <thead>
                                <tr>
                                    <th>Customer Name</th>
                                    <th>Item Type</th>
                                    <th>Item Brand</th>
                                    <th>Item Quantity</th>
                                    <th>No. of days</th>
                                    <th>Contact No.</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tempData.map((row) => (
                                    <tr key={row.index}>
                                        <td>{row.cusName}</td>
                                        <td>{row.itemType}</td>
                                        <td>{row.itemBrand}</td>
                                        <td>{row.itemQuantity}</td>
                                        <td>{row.rentPeriod}</td>
                                        <td>{row.cusContact}</td>

                                        <>
                                            <td>
                                                <button className='edit_btn' onClick={() => handleEdit(row._id)}>Edit</button>
                                            </td>
                                            <td>
                                                <button className='delete_btn' onClick={() => handleDelete(row._id)}>Delete</button>
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