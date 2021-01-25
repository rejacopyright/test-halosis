import React, {useEffect, useState} from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import axios from 'axios'
import con from './auth/api'
import './style.css'

function Table(){
  const [data, dataSet] = useState([]);
  useEffect(() => {
    axios.get(con.api+'/list/customer', {headers:{Authorization: con.bearer, token: con.token, Accept: con.acc}}).then(res => {
      const data = res.data.payload.data.map(r => {
        const dt = {};
        dt['vendor_id'] = r.vendor_id;
        dt['customer_name'] = r.customer_name;
        dt['customer_phone'] = r.customer_phone;
        dt['address'] = r.customer_addresses.length ? r.customer_addresses[0].address : '-';
        dt['address_detail'] = r.customer_addresses.length ? r.customer_addresses[0].address_detail : '-';
        dt['address_name'] = r.customer_addresses.length ? r.customer_addresses[0].address_name : '-';
        dt['city_id'] = r.customer_addresses.length ? r.customer_addresses[0].city_id : '-';
        return dt;
      });
      dataSet(data);
    });
  }, []);
  return(
    <>
    <h4>LIST CUSTOMER</h4>
    <Link to="/add"> <button style={{float:'right'}}>Add Customer</button> </Link>
    <table width="100%">
      <thead>
        <tr>
          <th align="left">No.</th>
          <th align="left">Vendor ID</th>
          <th align="left">Customer Name</th>
          <th align="left">Customer Phone</th>
          <th align="left">Customer Address</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((r, key) => (
            <tr key={key}>
              <td>{key+1}</td>
              <td>{r.vendor_id}</td>
              <td>{r.customer_name}</td>
              <td>{r.customer_phone}</td>
              <td>{r.address_detail} {r.address}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
    </>
  )
}
function Add(props){
  const [customer_name, customer_nameSet] = useState(null);
  const [customer_email, customer_emailSet] = useState(null);
  const [password, passwordSet] = useState(null);
  const [phone, phoneSet] = useState(null);
  const [city_id, city_idSet] = useState(null);
  const [address, addressSet] = useState(null);
  const [address_detail, address_detailSet] = useState(null);
  const [address_name, address_nameSet] = useState(null);
  function Submit(e){
    e.preventDefault();
    const q = {};
    q['customer_name'] = customer_name;
    q['customer_email'] = customer_email;
    q['password'] = password;
    q['phone'] = phone;
    q['city_id'] = city_id;
    q['address'] = address;
    q['address_detail'] = address_detail;
    q['address_name'] = address_name;
    axios.post(con.api+'/create', q, {headers:{Authorization: con.bearer, token: con.token, Accept: con.acc}}).then(res => {
      props.history.goBack();
    });
  }
  return(
    <form action="" onSubmit={Submit}>
      <div style={{paddingBottom:'10px'}}>
        <p style={{margin:0}}>Name</p>
        <input type="text" name="customer_name" onChange={e => customer_nameSet(e.target.value)} />
      </div>
      <div style={{paddingBottom:'10px'}}>
        <p style={{margin:0}}>Email</p>
        <input type="text" name="customer_email" onChange={e => customer_emailSet(e.target.value)} />
      </div>
      <div style={{paddingBottom:'10px'}}>
        <p style={{margin:0}}>Password</p>
        <input type="password" name="password" onChange={e => passwordSet(e.target.value)} />
      </div>
      <div style={{paddingBottom:'10px'}}>
        <p style={{margin:0}}>Phone</p>
        <input type="text" name="phone" onChange={e => phoneSet(e.target.value)} />
      </div>
      <div style={{paddingBottom:'10px'}}>
        <p style={{margin:0}}>City ID</p>
        <input type="number" name="city_id" onChange={e => city_idSet(e.target.value)} />
      </div>
      <div style={{paddingBottom:'10px'}}>
        <p style={{margin:0}}>Address</p>
        <input type="text" name="address" onChange={e => addressSet(e.target.value)} />
      </div>
      <div style={{paddingBottom:'10px'}}>
        <p style={{margin:0}}>Address Detail</p>
        <input type="text" name="address_detail" onChange={e => address_detailSet(e.target.value)} />
      </div>
      <div style={{paddingBottom:'10px'}}>
        <p style={{margin:0}}>Address Name</p>
        <input type="text" name="address_name" onChange={e => address_nameSet(e.target.value)} />
      </div>
      <div>
        <Link to="/"><button style={{marginRight:'20px'}}>Back</button></Link>
        <button type="submit">SUBMIT</button>
      </div>
    </form>
  )
}
function Index(props){
  return(
    <div>
      <button onClick={() => props.dispatch({type:'LOGOUT'})}>Logout</button>
      <h1 style={{textTransform:'capitalize'}}>HELLO {Cookies.getJSON('user').username}</h1>
      <Switch>
        <Route exact path="/" component={Table} />
        <Route exact path="/add" component={Add} />
        <Route exact path="*" component={Table} />
      </Switch>

    </div>
  )
}

export default connect(s => s)(withRouter(Index))
