import React from 'react';
import data from '../../shared/data';
import './PollTable.scss';
const columns = [
  {
    title: 'Title',
    field: 'title'
  },
  {
    title: 'Creator',
    field: 'createdBy'
  }
];

export class PollTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: columns,
      data: data.polls
    };
  }
  render() {
    const { data } = this.state;
    return (
      <div className = "p-3">
        <table className="table table-bordered">
          <thead className="thead-light">
          <tr>
          <th scope="col" className="text-left">
              Title
            </th>
            <th scope="col" className = "small-row">
              Creator
          </th>
          </tr>
          </thead>
          <tbody>
            {
              data.map(((item) => {
                return (
                  <tr key = {item.id}>
                    <td className="text-left">
                      <a href ="/constructor">{item.title}</a>
                    </td>
                    <td>
                      {item.createdBy}
                    </td>
                  </tr>
                )
              }))
            }
          </tbody>
        </table>
      </div>
    )
  }

}