import React from 'react'
import StarWarsRock from "../img/StarWarsRock.jpg";
import '../css/home.css';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';

export default function Home() 
{
    const backgroundImage = StarWarsRock;
  return (
    <div className="container py-4" id="home">
        <Col xs={10} md={8}>
            <Image className='background' src={backgroundImage} alt='Starwars rockband playing live' rounded/>
        </Col>     
    </div>
  )
}
