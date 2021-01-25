import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import con from './auth/api'

function Login(props){
  function login(e){
    e.preventDefault();
    const q = {};
    q['username'] = props.username;
    q['password'] = props.password;
    if (q.username && q.password) {
      axios.get(con.api, {headers:{Authorization: con.bearer, token: con.token, Accept: con.acc}, params:{username: props.username, password: props.password, }}).then(res => {
        // const data = res.data.payload;
        // data['me'] = res.config.params;
        props.dispatch({type:'USERNAME', value:res.config.params.username});
        props.dispatch({type:'PASSWORD', value:res.config.params.password});
        props.dispatch({type:'LOGIN', value:res.config.params});
        // console.log(data);
      });
    }
  }
  return(
    <form action="" onSubmit={login}>
      <div>
        <input type="text" name="username" onChange={e => props.dispatch({type:'USERNAME', value:e.target.value})} />
      </div>
      <div>
        <input type="text" name="password" onChange={e => props.dispatch({type:'PASSWORD', value:e.target.value})} />
      </div>
      <div>
        <button type="submit">LOGIN</button>
      </div>
    </form>
  )
}
export default connect(s => s)(Login)
