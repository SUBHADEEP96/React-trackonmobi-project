import React,{Component} from 'react';
import axios from 'axios';
//import ReactDOM from 'react-dom';

import logo from './log.png';


import './Navbar.css';



class Navbar extends Component{
	
	
	constructor(props){
		
		super(props);
		
		this.state={
			
			query:'',
			
			redirectLink:'',
			
			loading:false,
			
			message:''
			
		};
		
		this.cancel = '';
		
	}
	
	
	
	fetchSearchResults=(query)=>{
		
		const searchUrl=`https://www.freighttiger.com/saas/trip/share?accessKey=05809fa2-ce6b-f55c-9fa8-2e0072cefe05&trip_id=${query}`;
		
		if(this.cancel){
		
         this.cancel.cancel();		
			
		}
		this.cancel = axios.CancelToken.source();
		
		axios.get(searchUrl,{
			cancelToken: this.cancel.token
		}).then(response=>{
			
			
const resultNotFoundMsg = !response.data.length
				? ''
				: '';


this.setState({
				redirectLink: response.data.link,
				message: resultNotFoundMsg,
				loading: false
			})
			console.log("Response data",this.state.redirectLink)

			
		})
		.catch(error=>{
			
			if(axios.isCancel(error) || error){
				this.setState({
					loading: false,
					message: '**Failed to fetch results.Please give the  trip id..',
				});
				
			}
			
		})
	};
	
	
	handleResponseRedirection=()=>{
		
	
		
	window.open(this.state.redirectLink);
    return (<div></div>);
		
		
	}
	
	
	handleOnInputChange = (event) => {
	const query = event.target.value;
            this.setState({ query, loading: true, message: ''  },()=>{
				
				this.fetchSearchResults(query);
				
			} );			
     };
	 
		 
	
	
	
	
	
	

		
	render(){
			const {query,results}=this.state;
		return <div>
	
		<nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
  <a className="navbar-brand" href="#"><img src={logo} alt="TrackonMobi" className="img-responsive log"/></a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="container">
  <div className="collapse navbar-collapse" id="navbarText">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item active">
        <a className="nav-link text-muted font-weight-bold" href="#">About us</a>
      </li>
      
    </ul>
    </div>
	</div>
	
</nav><br/><br/>

<div className="container-fluid bod">

<br/><br/>
<div className="row">

<div className="col-lg-6 offset-1 my-5" >
<br/><br/><br/><br/>
<div className="container">
<h1 className="text-muted font-weight-bold">Track Shipment</h1><br/>
<form className="form"  onSubmit={this.handleResponseRedirection}>
<input type="text" placeholder=" Enter Waybill" className="" 
name="query"
value={query}
id="search-input"
onChange={this.handleOnInputChange}
        
autoComplete="off"

/>
<input type="submit" value="TRACK" className="" />
<br/><br/>

		{this.state.message ?(
		<p className="para">{this.state.message}</p>
		 ):null}
</form>
</div>
</div>
		
	


</div>	

	<br/><br/><br/>	<br/><br/>	
<div className="container  footer">
		
		<p className="text-muted">@ TraconMobi Solutions Pvt. Ltd.</p>
		<p className="text-muted"><a>Terms of use</a></p>
		
		</div>	
		

</div>

		
	</div>	
		
		
		
		
		
	}
	
	
	
	
	
}

export default Navbar;