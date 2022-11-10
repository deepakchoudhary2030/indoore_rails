import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Protected from './Component/Protected';
import Protected1 from './Component/Protected1';
import Index from './Component/Index/Index';
import Notfound from './Component/Notfound';
import Category from './Component/Category/Category';
import Workers from './Component/Workers/Workers';
import About from './Component/About/About';
import UserRegister from './Component/UserRegister/UserRegister';
import UserLogin from './Component/UserLogin/UserLogin';
import UserProfile from './Component/UserProfile/UserProfile';
import userBookings from './Component/UserProfile/Bookings';
import UserWorkerProfile from './Component/UserWorkerProfile/UserWorkerProfile';
import WorkerRegister from './Component/WorkerRegister/WorkerRegister';
import WorkerLogin from './Component/WorkerLogin/WorkerLogin';
import WorkerProfile from './Component/WorkerProfile/WorkerProfile';
import Booking from './Component/WorkerProfile/Bookings';
import editProfile from './Component/WorkerProfile/editProfile';


function App() {
	return (
		<Router>
			<div>
				<Switch>
					<Route exact path='/' component={Index}></Route>
					<Route exact path='/workers' component={Workers}></Route>
					<Route exact path='/category' component={Category}></Route>
					<Route exact path='/about' component={About}></Route>
					<Route exact path='/userlogin' component={UserLogin}></Route>
					<Route exact path='/userregister' component={UserRegister}></Route>
					<Route exact path='/userprofile'><Protected  component={UserProfile}/></Route>
					<Route exact path='/userworkerprofile' component={UserWorkerProfile}></Route>
					<Route exact path='/workerregister' component={WorkerRegister}></Route>
					<Route exact path='/workerlogin' component={WorkerLogin}></Route>
					<Route exact path='/workerprofile'><Protected1 component={WorkerProfile}/></Route>
					<Route exact path='/editProfile' component={editProfile}></Route>
					<Route exact path='/booking'  ><Protected1 component={Booking}/></Route>
					<Route exact path='/userbookings' ><Protected component={userBookings}/></Route>
					<Route exact path='*' component={Notfound}></Route>
				</Switch>
			</div>
		</Router>
	);
}
export default App;
