import React from "react";
import "../../App.css";
import { Container, Row, Col } from "reactstrap";
import "../../Styles/Rented/Rented.css"

import pic1 from "../../images/Rented/lap_img.jpg";
import pic2 from "../../images/Rented/projector_img.jpg";
import pic3 from "../../images/Rented/speaker_img.jpg";

const ItemPage = () => {
  return (
    <>
      <Container>
        <Row>
          <Col className="scoll">
            <h4 className="sti">Laptops</h4>

            <img src={pic1} alt="Laptops" className="simg" />
            <a href="/addrented" className="sbtn">Place Order</a>
           
          </Col>
          <Col className="scoll">
            <h4 className="sti">Projectors</h4>

            <img src={pic2} alt="Mobile Phones" className="simg" />
            <a href="/addrented"  className="sbtn">Place Order</a>
           
          </Col>
          <Col className="scoll">
            <h4 className="sti">Speakers</h4>

            <img src={pic3} alt="Other Items" className="simg" />
            <a href="/addrented"  className="sbtn">Place Order</a>
           
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ItemPage;