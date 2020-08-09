import React from 'react';
import { NavLink, Link } from 'react-router-dom'
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
      if(data.errorCode === 401) {
        this.props.logOut();
      }
      if(!data.errors.length) {
        this.setState({
          data: data.payload
        })
      }
    });
  }
  render() {
    const { data } = this.state;
    const { loggedIn } = this.props;
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
                    {
                      loggedIn ?
                      <Link to={`/constructor/${item.id}`}>{item.title}</Link>
                      :
                      <div>
                        {item.title}
                      </div>
                    }
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