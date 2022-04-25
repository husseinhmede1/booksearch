import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { gapi } from 'gapi-script';
import { Table, Container, Row, Col, Form, Dropdown, Button, Modal, Spinner } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './search.css';
import LogoutButton from "../logout";

const Search = () => {
  const navigate = useNavigate();
  const [books,setBooks] = useState();
  const [bookDetails,setBookDetails] = useState();
  const [bookId,setBookId] = useState();
  const [isLoading,setLoading] = useState(true);

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
      setLoading(true);
      return;
    }
    //get Token
      var accessToken = gapi.auth.getToken().access_token;
      setLoading(true);
    //get the books with free ebooks specification starting with the newest books first
    axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${search.target.value}&orderBy=newest&filter=free-ebooks&maxResults=40`,
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
      <Row className='searchTablePosition'>
          <Col>
            <Table striped  hover className='searchTable' style={{width: '100%'}}>
              <thead>
                <tr className='searchTableHead'>
                  <th>Cover</th>
                  <th>Author</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                { books &&(
                    books.map(book => {
                      return (
                        <tr>
                        <td>
                          {
                          book.volumeInfo.imageLinks &&(
                            <img src= {book.volumeInfo.imageLinks.thumbnail} style ={{width: '10vw', borderRadius:'10% '}} alt=''/>
                        )}</td>
                        <td>
                        {
                          book.volumeInfo.authors &&
                        (
                          <Dropdown>
                              <Dropdown.Toggle variant="success"  id="dropdown-basic">
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
                        </td>
                        <td>
                        {
                          book.volumeInfo.publishedDate
                        }
                        </td>
                        <td>
                        <Col>
                          <Row>
                            <Button variant="warning" onClick={() =>{ getSingleBook(book.id)}} style={{color: 'white', width: '80%'}}>Info</Button>
                          </Row>
                          <Row>
                            <Button variant="secondary" onClick={() =>{ preview(book.volumeInfo.previewLink)}} style={{color: 'white', width: '80%', marginTop: '5%'}} >Preview</Button>
                          </Row>
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
                            <Row>
                        {
                          book.id === bookId && bookDetails && 
                          (
                          <Modal.Dialog style={{width: '100%', marginLeft: '-2%'}}>
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

                                </div>
                            </Modal.Body>
                          </Modal.Dialog>
                        )}
                      </Row>
                      </Col>
                    </td>
                  </tr>
                  )
                })
              )}
          </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
     {
     isLoading &&           
    <Spinner animation="border" variant="warning" className='spinnerSearch'/>
     }
    </div>
  )
}

export default Search
