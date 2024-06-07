import React, {useState, useEffect} from 'react'
import musicService from '../services/music-group-service';

import {MusicNoteBeamed, MusicNoteList} from 'react-bootstrap-icons'

export function MusicBands(props) {

  const [groups, setGroups] = React.useState({});
  const [filter, setFilter] = useState(props.searchFilter || "");
  const [pageNr, setPageNr] = useState(0);
  const [pageMax, setPageMax] = useState(0);

  useEffect(() => {
  
  (async () => {

      const service = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);
      const data = await service.readMusicGroupsAsync(0, true, props.searchFilter);
      setGroups(data);
      setPageMax(data.pageCount);

    })();

    setFilter(props.searchFilter);   
  }, [props])
  

  const onSearch = async (e) => {
    e.preventDefault();  

    const service = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);
    const data = await service.readMusicGroupsAsync(0, true, e.searchFilter);

    setGroups(data);
    setFilter(e.searchFilter);
    setPageMax(data.pageCount);
  }

  const onPrevClick = async (e) => {
    if (pageNr > 0) {
      const service = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);
      const data = await service.readMusicGroupsAsync(pageNr - 1, true, filter);

      setPageNr (pageNr - 1);
      setGroups(data);
    }
  }
  const onNextClick = async (e) => {

      if (pageNr < pageMax-1) {
        const service = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);
        const _serviceData = await service.readMusicGroupsAsync(pageNr + 1, true, filter);
        
        setPageNr(pageNr + 1);
        setGroups(_serviceData);
        }
  }


  return (
    <div className="container px-4 py-4" id="list-of-items">
      <h2 className="pb-2 border-bottom">
          <MusicNoteList className="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em"/>
          List of Bands 
          <MusicNoteBeamed className="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em"/>
      </h2>

      <ListSearch searchFilter={''} onSearch={onSearch}/>
      <p>Total items listed: {groups.dbItemsCount || ""}</p>
      <List groups={groups}/>
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

    if (props.onPrevClick) props.onPrevClick(e);
  }
  const onNextClick = (e) => {
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
              <div className="col-md-3 themed-grid-head-col">Genere</div>
            </div>

            {props.groups?.pageItems?.map((b, index) => (
                <div key={index} className="row mb-2 text-center">
                <div className="col-md-6 themed-grid-col">
                    {b.name}
                </div>
                <div className="col-md-3 themed-grid-col">{b.strGenre}</div>
                </div>

            ))} 
        </div>
      </div>
    )
  }
