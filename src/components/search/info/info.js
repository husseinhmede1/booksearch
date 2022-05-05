import React, { useEffect, useState }  from 'react'
import { gapi } from 'gapi-script';
import { useNavigate, useParams  } from "react-router-dom";
import { Container, Row, Col, Modal, Spinner, Button } from 'react-bootstrap';
import { getSingleBook, preview } from '../../../utils/services.js';
import './info.css';

const Info = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [bookDetails,setBookDetails] = useState(null);
    const [bookId,setBookId] = useState(id);
    const [isLoading,setLoading] = useState(false);

        
  useEffect(() => {
    //not signedin
    if(gapi.auth === undefined)
    {
        navigate("/");
    }
    else{
        getSingleBook(bookId, setBookDetails, setBookId, setLoading);
    }
    }, []);

  return (
    <Container>
        {
        isLoading && (
            <Spinner animation="border" variant="warning" className='spinnerInfo'/>
        )}
        {
        bookDetails != null && ( 
       <Col style={{display: 'flex', justifyContent: 'center'}}>
        <Modal.Dialog style={{width: '80%', marginTop: '7%', boxShadow: '0px 0px 5px 5px rgb(255, 229, 191)'}}>
            <Modal.Header style={{width: '100%'}}>
                <Modal.Title style={{width: '100%'}}>Info</Modal.Title>
                <Button variant="light" style={{backgroundColor: 'rgb(253, 194, 104)', color: 'white'}} onClick={() => {navigate(`/search`)}}>Back</Button>
            </Modal.Header>
            <Modal.Body style={{width: '100%'}}>
            {            bookDetails.volumeInfo.averageRating > 0 && bookDetails.volumeInfo.averageRating <= 1 &&
            <div>
                <i style={{color:'yellow'}} className="fa fa-star"></i> 
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <p> {bookDetails.volumeInfo.ratingsCount} rate</p>
            </div>
            }
            
            {
            bookDetails.volumeInfo.averageRating > 1 && bookDetails.volumeInfo.averageRating <= 2 &&
                <div>   
                <i style={{color:'yellow'}} className="fa fa-star"></i> 
                <i style={{color:'yellow'}} className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <p> {bookDetails.volumeInfo.ratingsCount} rate</p>
                </div>
            }
            
            {
            bookDetails.volumeInfo.averageRating > 2 && bookDetails.volumeInfo.averageRating <= 3 &&
                <div>                              
                <i style={{color:'yellow'}} className="fa fa-star"></i> 
                <i style={{color:'yellow'}} className="fa fa-star"></i>
                <i style={{color:'yellow'}} className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <p> {bookDetails.volumeInfo.ratingsCount} rate</p>
                </div>
            }
            
            {
            bookDetails.volumeInfo.averageRating > 3 && bookDetails.volumeInfo.averageRating <= 4 &&
                <div>                              
                <i style={{color:'yellow'}} className="fa fa-star"></i> 
                <i style={{color:'yellow'}} className="fa fa-star"></i>
                <i style={{color:'yellow'}} className="fa fa-star"></i>
                <i style={{color:'yellow'}} className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <p> {bookDetails.volumeInfo.ratingsCount} rate</p>
                </div>
            }
            
            {
            bookDetails.volumeInfo.averageRating > 4  &&
            <div>   
                <i style={{color:'yellow'}} className="fa fa-star"></i> 
                <i style={{color:'yellow'}} className="fa fa-star"></i>
                <i style={{color:'yellow'}} className="fa fa-star"></i>
                <i style={{color:'yellow'}} className="fa fa-star"></i>
                <i style={{color:'yellow'}} className="fa fa-star"></i>
                <p> {bookDetails.volumeInfo.ratingsCount} rate</p>
            </div>
            }
            
            {
            !bookDetails.volumeInfo.ratingsCount &&
                <p>No rating on this book.</p>
            }

                <div>
                {
            bookDetails.volumeInfo !== undefined &&
                (
                    <div>
                    <span><b>Title:</b></span><p>{bookDetails.volumeInfo.title}</p>
                    <span><b>PageCount:</b></span><p>{bookDetails.volumeInfo.pageCount}</p>
                    <span><b>Publisher:</b></span><p>{bookDetails.volumeInfo.publisher}</p>
                    <span><b>Language:</b></span><p>{bookDetails.volumeInfo.language}</p>
                    </div>
                )}
                <Row>
            {
            bookDetails.accessInfo.epub.downloadLink !== undefined &&
            (
                <a href={bookDetails.accessInfo.epub.downloadLink}><u>Download epub</u></a>
            )
            }
            {
            bookDetails.accessInfo.epub.downloadLink === undefined &&
                (
                <p>epub is not availble</p>
                )
            }
        </Row>
        <Row>
            {
            bookDetails.accessInfo.pdf.downloadLink !== undefined &&
            (
                <a href={bookDetails.accessInfo.pdf.downloadLink}><u>Download pdf</u></a>
            )
            }
            {
            bookDetails.accessInfo.pdf.downloadLink === undefined &&
            (
                <p>pdf is not availble</p>
            )
            }
        </Row>
        <Row style={{marginBottom: '1%'}}>
            <Col style={{display: 'flex', justifyContent: 'center'}}>
              <Button variant="light" onClick={() =>{ preview(bookDetails.volumeInfo.previewLink)}} style={{backgroundColor: 'rgb(252, 152, 2)', color: 'white', width: '80%', marginTop: '6%'}} >Preview</Button>
            </Col>
        </Row>

                </div>
            </Modal.Body>
            </Modal.Dialog>
        </Col> 
    )}
                 </Container>   
      )
}

export default Info
