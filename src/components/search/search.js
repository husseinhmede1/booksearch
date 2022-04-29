import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { gapi } from 'gapi-script';
import { Table, Container, Row, Col, Form, Dropdown, Button, Modal, Spinner } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './search.css';
import LogoutButton from "../logout";
import searchIcon from '../../assets/svg/searchIcon.svg';

const Search = () => {
  const navigate = useNavigate();
  const [books,setBooks] = useState();
  const [bookDetails,setBookDetails] = useState();
  const [bookId,setBookId] = useState();
  const [isLoading,setLoading] = useState(false);

  useEffect(() => {
    //not signedin
    if(gapi.auth === undefined)
    navigate("/");
  }, []);

  const search = (search) => {
    //search is empty
    if(search.target.value === '')
    {
      setBooks();
      setLoading(false);
      return;
    }
    //get Token
      var accessToken = gapi.auth.getToken().access_token;
      setLoading(true);
    //get the books with free ebooks specification starting with the newest books first
    axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${search.target.value}&orderBy=newest&filter=free-ebooks&&maxResults=40`,
        {
        headers: {
          'Authorization': `${accessToken}`
        }
      }
    ).then(res => {
      setBooks(res.data.items);
      setLoading(false);
    })
    .catch(err =>{
      console.log(err)
    })

  }

  function getSingleBook (id)  {
    var accessToken = gapi.auth.getToken().access_token;
    
    //get the books with free ebooks specification starting with the newest books first
    axios.get(
      `https://www.googleapis.com/books/v1/volumes/${id}`,
        {
        headers: {
          'Authorization': `${accessToken}`
        }
      }
    ).then(res => {
        setBookDetails(res.data);
        setBookId(id)
      })
    .catch(err =>{
      console.log(err)
    })
  }
    function preview(previewLink){
      window.open(previewLink);
    }

  return (
  <div>
    <Container>
        <Row className='searchInputPosition'>
        <Col>
          <Form>
            <Form.Group>
              <Form.Control placeholder="Search as you type..." className='searchInput' onKeyUp={(e) =>search(e)}/>
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <LogoutButton/>
        </Col>
      </Row>
     {
       !books && !isLoading &&
        (
        <div>
          <img src={searchIcon} alt="icon" className='searchIcon' style={{width: '10vw', height: '10vh'}}/>
        </div> 
        )
     }
     { 
     books &&
       (
        <Row className='searchTablePosition'>
         <Col>
          <div className='searchTable' style={{width: '100%'}}>
            <Row>
               {
                 books.map(book => {
                      return (
                        <Col lg={4} style={{marginBottom: '2%'}}>
                          <div className='searchTable' style={{backgroundColor: '#9F9E9E', marginLeft: '2.5%', width: '95%', height: '100%' }}>
                          <Row style={{marginTop: '2%'}}>
                        <Col style={{display: 'flex', justifyContent: 'center'}}>
                        {
                         book.volumeInfo.imageLinks &&(
                          <div style={{marginTop: '5%'}}>
                            <img src= {book.volumeInfo.imageLinks.thumbnail} style ={{width: '100%', height: '90%', borderRadius:'10% '}} alt=''/>
                          </div>
                        )}
                       </Col>
                        </Row>
                        <Row>
                          <Col style={{display: 'flex', justifyContent: 'center'}}>
                            {
                              book.volumeInfo.publishedDate
                            }
                          </Col>
                        </Row>
                        <Row style={{marginTop: '2%'}}>  
                          <Col style={{display: 'flex', justifyContent: 'center'}}>
                          {
                            book.volumeInfo.authors &&
                          (
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                  Authors
                                </Dropdown.Toggle>
                              <Dropdown.Menu>
                                {
                                  book.volumeInfo.authors &&
                                    book.volumeInfo.authors.map(author => {
                                      return (<Dropdown.Item >{author}</Dropdown.Item>);
                                  })
                                }
                              </Dropdown.Menu>
                          </Dropdown>
                          )
                          }
                          {
                            !book.volumeInfo.authors &&
                          (
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                  Authors
                                </Dropdown.Toggle>
                              <Dropdown.Menu>
                              <Dropdown.Item >No Authors Here</Dropdown.Item>
                              </Dropdown.Menu>
                          </Dropdown>
                          )
                          }
                          </Col>

                        </Row>

                          <Row style={{marginTop: '5%'}}>
                            <Col style={{display: 'flex', justifyContent: 'center'}}>
                              <Button variant="warning" onClick={() =>{ getSingleBook(book.id)}} style={{color: 'white', width: '80%'}}>Info</Button>
                            </Col>
                          </Row>
                          <Row style={{marginBottom: '15%'}}>
                            <Col style={{display: 'flex', justifyContent: 'center'}}>
                              <Button variant="secondary" onClick={() =>{ preview(book.volumeInfo.previewLink)}} style={{color: 'white', width: '80%', marginTop: '5%'}} >Preview</Button>
                            </Col>
                          </Row>
                            <Row>
                        {
                          book.id === bookId && bookDetails && 
                          (
                            <Col style={{display: 'flex', justifyContent: 'center'}}>
                            <Modal.Dialog style={{width: '80%'}}>
                                <Modal.Header style={{width: '100%'}}>
                                  <Modal.Title style={{width: '100%'}}>Info</Modal.Title>
                                </Modal.Header>
                              <Modal.Body style={{width: '100%'}}>
                                {
                                bookDetails.volumeInfo.averageRating > 0 && bookDetails.volumeInfo.averageRating <= 1 &&
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
                                    <span><b>Title:</b></span><p>{bookDetails.volumeInfo.title}</p>
                                    <span><b>PageCount:</b></span><p>{bookDetails.volumeInfo.pageCount}</p>
                                    <span><b>Publisher:</b></span><p>{bookDetails.volumeInfo.publisher}</p>
                                    <span><b>Language:</b></span><p>{bookDetails.volumeInfo.language}</p>
                                    <Row>
                              {
                                book.accessInfo.epub.downloadLink !== undefined &&
                                (
                                  <a href={book.accessInfo.epub.downloadLink}><u>Download epub</u></a>
                                )
                              }
                              {
                                book.accessInfo.epub.downloadLink === undefined &&
                                  (
                                    <p>epub is not availble</p>
                                  )
                              }
                            </Row>
                            <Row>
                              {
                                book.accessInfo.pdf.downloadLink !== undefined &&
                                (
                                  <a href={book.accessInfo.pdf.downloadLink}><u>Download pdf</u></a>
                                )
                              }
                              {
                                book.accessInfo.pdf.downloadLink === undefined &&
                                (
                                  <p>pdf is not availble</p>
                                )
                              }
                            </Row>

                                    </div>
                                </Modal.Body>
                              </Modal.Dialog>
                            </Col>
                          )}
                        </Row>
                      </div>
                    </Col>
                      )
                   })}
                 </Row>

                </div>
              </Col>
            </Row>
              )}
    </Container>
     {
     isLoading &&           
    <Spinner animation="border" variant="warning" className='spinnerSearch'/>
     }
    </div>
  )
}

export default Search
