import { gapi } from 'gapi-script';
import axios from 'axios';


const search = (search, setBookName, setBooks, setLoading, setTotalItems, setCurrentPage) => {
    setCurrentPage(0);
    setBookName(search.target.value);
    localStorage.setItem('search', search.target.value);
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
      `https://www.googleapis.com/books/v1/volumes?q=${search.target.value}&orderBy=newest&filter=free-ebooks&maxResults=40&startIndex=0`,
        {
        headers: {
          'Authorization': `${accessToken}`
        }
      }
    ).then(res => {
      setBooks(res.data.items);
      setTotalItems(res.data.totalItems);  
      setLoading(false);
    })
    .catch(err =>{
      console.log(err)
    })

  }

  const searchBack = (search, setBookName, setBooks, setLoading, setTotalItems, setCurrentPage) => {
    setCurrentPage(0);
    setBookName(search);
    localStorage.setItem('search', search);
    //search is empty
    if(search === '')
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
      `https://www.googleapis.com/books/v1/volumes?q=${search}&orderBy=newest&filter=free-ebooks&maxResults=40&startIndex=0`,
        {
        headers: {
          'Authorization': `${accessToken}`
        }
      }
    ).then(res => {
      setBooks(res.data.items);
      setTotalItems(res.data.totalItems);  
      setLoading(false);
    })
    .catch(err =>{
      console.log(err)
    })

  }
  
  const getSingleBook = (id, setBookDetails, setBookId, setLoading) => {
    var accessToken = gapi.auth.getToken().access_token;

    setLoading(true);
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
        setLoading(false);
      })
    .catch(err =>{
      console.log(err)
    })
  }
  function preview(previewLink){
    window.open(previewLink);
  }

  const paginate = (bookName, currentPage, totalItems, setBooks, setLoading) => {
    //get Token
    var accessToken = gapi.auth.getToken().access_token;
      setLoading(true);
    //get the books with free ebooks specification starting with the newest books first
    axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${bookName}&orderBy=newest&filter=free-ebooks&maxResults=40&startIndex=${currentPage * 40}`,
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

  export { search, getSingleBook, preview, paginate, searchBack };
