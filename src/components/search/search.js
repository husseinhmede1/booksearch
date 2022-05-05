import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { gapi } from 'gapi-script';
import { Container, Row, Col, Form, Dropdown, Button, Spinner, Pagination } from 'react-bootstrap';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './search.css';
import LogoutButton from "../logout";
import { search, paginate, searchBack } from '../../utils/services.js';
import searchIcon from '../../assets/svg/searchIcon.svg';

const Search = () => {
  const navigate = useNavigate();
  const [books,setBooks] = useState();
  const [bookName,setBookName] = useState();
  const [isLoading,setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    //not signedin
    if(gapi.auth === undefined)
    {  navigate("/");
    }
    else{
      if(localStorage.getItem('search') !== '')
      {
        searchBack(localStorage.getItem('search'), setBookName, setBooks, setLoading, setTotalItems, setCurrentPage)
      }
    }  
    }, []);

  return (
  <div>
    <Container>
        <Row className='searchInputPosition'>
        <Col>
          <Form>
            <Form.Group>
              <Form.Control placeholder="Search as you type..." defaultValue={bookName} className='searchInput' onKeyUp={(e) =>search(e, setBookName, setBooks, setLoading, setTotalItems, setCurrentPage)}/>
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
        <Col>
        <Row style={{marginTop: '3%', marginBottom: '-1%', marginLeft: '0%'}}>
        <Pagination>
          {currentPage > 0 && 
          (
            <Pagination.Item className='paginationColor' onClick={(e) => {setCurrentPage(currentPage - 1)}}><BsFillArrowLeftCircleFill className='paginationArrow'/></Pagination.Item>
          )}
          <Pagination.Item className='paginationColor' onClick={(e) => {paginate(bookName, currentPage, totalItems, setBooks, setLoading)}}><p className='paginationText'>{currentPage}</p></Pagination.Item>
          <Pagination.Item className='paginationColor' onClick={(e) => {paginate(bookName, currentPage + 1, totalItems, setBooks, setLoading)}}><p className='paginationText'>{currentPage + 1}</p></Pagination.Item>
          <Pagination.Item className='paginationColor' onClick={(e) => {paginate(bookName, currentPage + 2, totalItems, setBooks, setLoading)}}><p className='paginationText'>{currentPage + 2}</p></Pagination.Item>
          {currentPage + 2 <  totalItems /40 - 1  && 
          (
            <Pagination.Item className='paginationColor' onClick={(e) => {setCurrentPage(currentPage + 1)}}><BsFillArrowRightCircleFill className='paginationArrow'/></Pagination.Item>
          )}
          </Pagination>
      </Row>

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
                          <div style={{marginTop: '5%', marginBottom: '4%'}}>
                            <img src= {book.volumeInfo.imageLinks.thumbnail} style ={{width: '100%', height: '30vh', borderRadius: '10% '}} alt=''/>
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

                          <Row style={{marginTop: '5%', marginBottom: '8%'}}>
                            <Col style={{display: 'flex', justifyContent: 'center'}}>
                              <Button variant="warning" onClick={() =>{ navigate(`/info/${book.id}`)}} style={{color: 'white', width: '80%'}}>Info</Button>
                            </Col>
                          </Row>
                      </div>
                    </Col>
                      )
                   })}
                 </Row>
                </div>
              </Col>
            </Row>
            </Col>
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
