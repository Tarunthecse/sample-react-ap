import React from 'react';

import axios from 'axios';

export default class Api extends React.Component {
  state = {
    posts: []
  }

  pop(e) {
    this.setState({ dataPushed: false });
    this.setState({ emptyData: false });
    axios.delete(`http://172.17.0.2:8080/pop`)
      .then(res => {
        console.log(res);
        console.log(res.data);

        const posts = res.data;
        this.setState({ posts });
      }).catch((error) => {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        this.setState({ badRequest: true });
      })

  }
  peek(e) {
    this.setState({ dataPushed: false });
    this.setState({ emptyData: false });
    axios.get(`http://172.17.0.2:8080/peek`)
      .then(res => {
        console.log(res);
        console.log(res.data);
        const posts = res.data;
        this.setState({ posts });
      }).catch((error) => {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        this.setState({ badRequest: true });
      })
  }
  push(e, data) {
    this.setState({ emptyData: false });
    if (data) {
      document.getElementById("dataInput").value = '';
      let url = "http://172.17.0.2:8080/push/" + data;
      axios.post(url)
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.setState({ dataPushed: true });
        }).catch((error) => {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          this.setState({ badRequest: true });
        })
    } else {
      this.setState({emptyData : true});
    }
  }


  render() {

    return (
      <div>
        <h1> Stack Implementation Dummy UI </h1>

        <table className="table table-bordered">
          <tbody>
            <tr>
              <td>
                <input type="text" placeholder="Enter the int data" id="dataInput" /></td>
              <td>
                <button onClick={(e) => this.push(e, document.getElementById("dataInput").value)}>Push</button></td>
              <td>
                <button onClick={(e) => this.pop(e)}>Pop</button></td>
              <td>
                <button onClick={(e) => this.peek(e)}>Peek</button>
              </td>
            </tr>
            <tr>
              {this.state.dataPushed === true ? <td> Data has been pushed to the stack</td>
                : this.state.emptyData ? <td> Please enter the valid value in data</td> :this.state.badRequest ? <td> No more items to fetch</td> : <td> Result is {this.state.posts.data}</td>}
            </tr>
          </tbody>

        </table>
      </div>
    )
  }
}  
