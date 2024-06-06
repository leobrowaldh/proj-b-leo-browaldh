import React, {useState, useEffect} from 'react'
import musicService from '../services/music-group-service';

import {JournalRichtext} from 'react-bootstrap-icons'
import {Link } from "react-router-dom";

export function Musicalbums(props) {

  const [albums, setAlbums] = React.useState({});
  const [filter, setFilter] = useState(props.searchFilter || "");
  const [pageNr, setPageNr] = useState(0);
  const [pageMax, setPageMax] = useState(0);

  useEffect(() => {
  
  (async () => {

      const service = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);
      const a = await service.readAlbumsAsync(0, true, props.searchFilter);
      setAlbums(a);
      setPageMax(a.pageCount);

    })();

    setFilter(props.searchFilter);   
  }, [props])
  

  const onSearch = async (e) => {
    e.preventDefault();  //In case the button is of type submit (default for a button inside a form)

    const service = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);
    const _serviceData = await service.readAlbumsAsync(0, true, e.searchFilter);

    setAlbums(_serviceData);
    setFilter(e.searchFilter);
    setPageMax(_serviceData.pageCount);
  }

  const onPrevClick = async (e) => {
    if (pageNr > 0) {
      //own pager activity
      const service = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);
      const _serviceData = await service.readAlbumsAsync(pageNr - 1, true, filter);

      setPageNr (pageNr - 1);
      setAlbums(_serviceData);
    }
  }
  const onNextClick = async (e) => {

      if (pageNr < pageMax-1) {
        //own pager activity
        const service = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);
        const _serviceData = await service.readAlbumsAsync(pageNr + 1, true, filter);
        
        setPageNr(pageNr + 1);
        setAlbums(_serviceData);
        }
  }


  return (
    <div className="container px-4 py-4" id="list-of-items">
    <h2 className="pb-2 border-bottom">
        <JournalRichtext className="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em"/>
         List of Albums</h2>


    <p>Below are some of the worlds most famous albums.</p>
    <p>Subscribe to the WebApi</p>


    <ListSearch searchFilter={''} onSearch={onSearch}/>
    <List albums={albums}/>
    <ListPager onPrevClick={onPrevClick} onNextClick={onNextClick}/>
    </div>
  )
}


export function ListSearch(props) {

    const onClick = (e) => {
      e.preventDefault(); 
      
       e.searchFilter =  document.getElementById("search").value;
       if (props.onSearch) props.onSearch(e);
    }

  return (
    <div className="row mb-1 text-center">
    <div className="col-md-8 ">
      <form className="d-flex mt-3 mt-lg-0" role="search">
        <input id='search' className="form-control me-2" type="search" placeholder="Search" 
          defaultValue = {props.searchFilter} aria-label="Search"/>
        <button className="btn btn-outline-success" onClick={onClick}>Search</button>
      </form>
    </div>
  </div>
  )
}

export function ListPager(props) {

  const onPrevClick = (e) => {
    //own pager activity

    //Lift event
    if (props.onPrevClick) props.onPrevClick(e);
  }
  const onNextClick = (e) => {
        //own pager activity
            //Lift event
    if (props.onNextClick) props.onNextClick(e);
  }
  return (
    <nav aria-label="Standard pagination example">
      <ul className="pagination">
      <li className="page-item">
          <button className="page-link" onClick={onPrevClick}>&laquo;</button>
        </li>
        <li className="page-item">
          <button className="page-link" onClick={onNextClick}>&raquo;</button>
        </li>
      </ul>
    </nav>
  )
}


export function List(props) {
    return (
        <div className="row row-cols-1 row-cols-lg-4 align-items-stretch g-4 py-5">
        <div className="col-md-7 col-lg-10">
            <div className="row mb-2 text-center">
              <div className="col-md-6 themed-grid-head-col">Name</div>
              <div className="col-md-3 themed-grid-head-col">Release Year</div>
              <div className="col-md-3 themed-grid-head-col">Copies sold</div>
            </div>

            {props.albums?.pageItems?.map((b, index) => (
              <Link to={`/albumview/${b.albumId}`}>
                <div key={index} className="row mb-2 text-center">
                <div className="col-md-6 themed-grid-col">
                    {b.name}
                </div>
                <div className="col-md-3 themed-grid-col">{b.releaseYear}</div>

                <div className="col-md-3 themed-grid-col">
                    {b.copiesSold}
                </div>
                </div>
              </Link>

            ))} 
        </div>
      </div>
    )
  }
