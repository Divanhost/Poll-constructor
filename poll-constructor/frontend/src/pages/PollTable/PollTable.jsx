import React from 'react';
import { NavLink } from 'react-router-dom'
import { PollService } from '../../services';
import './PollTable.scss';

const service = new PollService();
export class PollTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    service.getAll().then(data => {
      if(data) {
        this.setState({
          data: data.payload
        })
      }
    });
  }
  render() {
    const { data } = this.state;
    return (
      <div className="p-3">
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th scope="col" className="text-left">
                Title
            </th>
              <th scope="col" className="small-row">
                Creator
          </th>
            </tr>
          </thead>
          <tbody>
            {
              data.map(((item) => {
                return (
                  <tr key={item.id}>
                    <td className="text-left">
                      {/* <Link href="/constructor/item.id">{item.title}</Link>   */}
                      <NavLink to={`/constructor/${item.id}`}>{item.title}</NavLink>
                      {/* <a href="/constructor" + item.id></a> */}
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