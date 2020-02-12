import React from 'react';
import Pagination from './commen/pagination'
import _ from 'lodash';
import './DataTable.css';

class DataTable extends React.Component {
  constructor(){
    super();
    this.state = {
      data: [],
      pageSize: 10,
      currentPage: 1,
      sortColumn: {
        path: '',
        order: 'asc'
      }
    }
  }

  componentDidMount(){
    fetch('https://raw.githubusercontent.com/ExponentialTech/frontend-challenges/master/data.json')
      .then(res => res.json())
      .then(data => this.setState({ data }))
  }

  handleSort = path => {
    this.setState({ sortColumn: { path, order: 'asc' }})
  }

  handleNextPage = page => {
    const pagesCount = Math.ceil(this.state.data.length / this.state.pageSize);
    console.log(page);

    if(page === pagesCount) {
      return this.setState({ currentPage: 1 })
    }
    this.setState({ currentPage: (page + 1) })
  }

  handlePrevPage = page => {
    const pagesCount = Math.ceil(this.state.data.length / this.state.pageSize);
    console.log(page);

    if(page === 1) {
      return this.setState({ currentPage: (pagesCount) })
    }
    this.setState({ currentPage: (page - 1) })
  }

  paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return _(items).slice(startIndex).take(pageSize).value();
  }


  render(){
    const { data, pageSize, currentPage, sortColumn } = this.state;
    const count = data.length;

    const sortData = _.orderBy(data, [sortColumn.path], [sortColumn.order])

    const dataShow =  this.paginate(sortData, currentPage, pageSize);

    return (
      <div className="main-container">
        <h3 className="table-title">Impact Assessment Data</h3>
        <table className="main-table">
          <thead className="table-header">
            <tr>
              <th colSpan="4"></th>
              <th colSpan="2">women (per 100)</th>
              <th colSpan="2">co2 scope 1 & 2</th>
              <th colSpan="2">co2 scope 3</th>
              <th colSpan="2"></th>
            </tr>
            <tr>
              <th onClick={() => this.handleSort("company name")}>Company Name</th>
              <th onClick={() => this.handleSort("ISIN")}>ISIN</th>
              <th onClick={() => this.handleSort("total company revenue")}>Total Company Revenue</th>
              <th onClick={() => this.handleSort("market capitailization")}>Market Capitailization</th>
              <th onClick={() => this.handleSort("managers")}>Managers</th>
              <th onClick={() => this.handleSort("employees")}>Employees</th>
              <th onClick={() => this.handleSort("total 1")}>Total</th>
              <th onClick={() => this.handleSort("rev 1")}>REV ADJ</th>
              <th onClick={() => this.handleSort("total 2")}>Total</th>
              <th onClick={() => this.handleSort("rev 2")}>REV ADJ</th>
              <th >ESG score</th>
              <th>ESG score</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {dataShow.map(item => 
              <tr key={Math.random() * 5}>
                <td>{item['Company Name']}</td>
                <td>{item['ISIN']}</td>
                <td>{item['Total Revenue']}</td>
                <td>{item['Company Market Cap']}</td>
                <td>{item['Women Managers']}</td>
                <td>{item['Women Employees']}</td>
                <td>{item['CO2 Scope 1 & 2 Adjusted']}</td>
                <td>{item['CO2 Scope 1 & 2 Revenue Adjusted']}</td>
                <td>{item['CO2 Scope 3 Adjusted']}</td>
                <td>{item['CO2 Scope 3 Revenue Adjusted']}</td>
                <td>{item['ESG Score']}</td>
                <td><div style={{backgroundColor: "#ddd", height: "19px", width: item['ESG Score'] + "%"}}></div></td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          handlePrevPage={this.handlePrevPage}
          handleNextPage={this.handleNextPage}
          />
      </div>
    )
  }
}

export default DataTable;
