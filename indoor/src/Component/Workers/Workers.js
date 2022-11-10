import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Worker from '../Images/worker.png';
import { Link } from 'react-router-dom';
import './Workers.css';
import '../Index/Index';

function Painter(props) {

	const [items, setItems] = useState([]);
	let category = props.location.state.category;
	const pincode = localStorage.getItem('pincode');
	const getUsers = async () => {
		await fetch(`http://localhost:3001/api/v1/user/users/profession/${pincode}/${category}/`
		).then((response) => { return response.json() 
		}).then((response) => {
			setItems(response)
		}).catch((err) => { console.log(err) });
	}

	useEffect(() => {
		getUsers();
	},[]);

	return (
		<div>
			<Header />
			<div className="jumbotron-fluid jumb ">
				<h1>{props.location.state.category}</h1>
				<div className="container-fluid d-flex my-5 ">
					<div className="container ">
						<div className="row">
							{
								items.length != 0 ?
								<div>
								{items.map((elem) => {
									const  worker  = elem;
									return (
										<div className="col-md-4 my-4 text-center" key={worker.id}>
											{localStorage.getItem('user-info') ?
												<Link className="link3" to={{
													pathname: '/userworkerprofile',
													state:{id:worker.id}
												}}><div className="car1"  >
														<img src={Worker} className=" bd-placeholder-img rounded-circle mx-auto m-3 mb-1 bg-dark " alt="" width="150em" height="150em" /><br />
														<div className="card-body">
															<h5 className="small text-uppercase text-muted">{worker.fname}{worker.lname}</h5>
															<h5 className="small text-uppercase text-muted">{worker.pincode}</h5>
															{rating(worker.ratting)}
														</div>
													</div></Link> :
													<div className="car1" >
														<img src={Worker} className=" bd-placeholder-img rounded-circle mx-auto m-3 mb-1 bg-dark " alt="" width="150em" height="150em" /><br />
														<div className="card-body">
															<h5 className="small text-uppercase text-muted">{worker.fname}{worker.lname}</h5>
															<h5 className="small text-uppercase text-muted">{worker.pincode}</h5>		
															{rating(worker.ratting)}	
														</div>
													</div>
											}
										</div>
									);})}</div> : <div><h3>&#128218; No Record Found</h3></div>
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
	function rating(rating) {
		if (rating === 1) {
			return (
				<div>
					<span className="fa fa-star checked "></span>
				</div>
			)
		}
		if (rating === 2) {
			return (
				<div>
					<span className="fa fa-star checked "></span>
					<span className="fa fa-star checked "></span>
				</div>
			)
		}
		if (rating === 3) {
			return (
				<div>
					<span className="fa fa-star checked "></span>
					<span className="fa fa-star checked "></span>
					<span className="fa fa-star checked "></span>
				</div>
			)
		}
		if (rating === 4) {
			return (
				<div>
					<span className="fa fa-star checked "></span>
					<span className="fa fa-star checked "></span>
					<span className="fa fa-star checked "></span>
					<span className="fa fa-star checked "></span>
				</div>
			)
		}
		if (rating === 5) {
			return (
				<div>
					<span className="fa fa-star checked "></span>
					<span className="fa fa-star checked "></span>
					<span className="fa fa-star checked "></span>
					<span className="fa fa-star checked "></span>
					<span className="fa fa-star checked "></span>

				</div>
			)
		}
	}
}
export default Painter;