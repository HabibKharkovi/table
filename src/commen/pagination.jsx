import React from 'react';
import _ from 'lodash';

const Pagination = props => {
    const { itemsCount, pageSize, currentPage, handlePrevPage, handleNextPage } = props;
    console.log(currentPage)
    const pagesCount = Math.ceil(itemsCount / pageSize);

    if(pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1)


    return (
        <nav className="pagenation">
            <ul className="pagenation-items">
                <li className="pagenation-item">
                    <a className="pagenation-link prev" onClick={() => handlePrevPage(currentPage)}>Prev</a>
                </li>  
                <li className="pagenation-item">
                    Pages
                </li>  
                <li className="pagenation-item">
                    <a className="pagenation-link show" >{currentPage}</a>
                </li>    
                <li className="pagenation-item">
                    <a className="pagenation-link next" onClick={() => handleNextPage(currentPage)}>Next</a>
                </li>    
            </ul>
        </nav>
    );
}

export default Pagination;