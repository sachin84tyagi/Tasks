import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import { connect } from "react-redux";
import logo from "./../logo.svg";
import * as actionCreator from "../store/actions/actions";
import Input from "./helper/input";

//const tokenKey = "token";

class Dashboard extends Component {

	state = {
		data: { city: "" },
		weatherList: "",
		submitted: false
	};

	handleChange = ({ currentTarget: input }) => {
		const data = { ...this.state.data };
		data[input.name] = input.value;

		this.setState({ data });
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		this.setState({ submitted: true });
		console.log("Data in handle Submit ::: ", this.state.data.city)
		if (this.state.data.city) {
			this.props.loadWeatherData(this.state.data.city);
		}
	}


	weatherList = (props) => {
		console.log("REPORT DATA ::: ::: ", this.props.reportData)
		const weather = this.props.reportData.weather && this.props.reportData.weather.map((val, key) => {
			console.log("VALUE FORCASTS :: : ", val);
			const img = 'http://openweathermap.org/img/w/' + val.icon + '.png';
			return (
				<div className="col-sm-4" key={key} >
					<div>
						<div>
							<p><strong>Date And Time: </strong>{new Date(this.props.reportData.dt * 1000).toDateString()} <span><img src={img} alt={'Not Found'} /></span> </p>
							<p><strong>Main: </strong> {val.main}</p>
							<p><strong>Description: </strong>  {val.description} </p>

						</div>

					</div>
					<hr key={key + 9} />
				</div>

			);

		})

		return weather;

	}



	render() {
		const { submitted } = this.state;
		if (!auth.getJwt()) {
			window.location = "/login";
		}

		return (
			<div>
				<div className="row " style={{ backgroundColor: 'black', marginBottom: '25px' }} >
					<div className="col-sm-2" style={{ textAlign: "right" }}>
						<h3>Logo </h3>
					</div>
					<div className="col-sm-8"></div>
					<div className="col-sm-2">
						<Link className="nav-link" to="/logout">
							Logout
          	</Link>
					</div>

				</div>
				<div className="container">
					{this.props.loading && <img src={logo} className="App-logo" style={{ marginLeft: '35%' }} />}

					<h1 style={{ marginLeft: '35%' }}>Weather Forcast</h1>
					<hr />
					<form onSubmit={this.handleSubmit}>
						<div className="container">
							<div className="row">
								<div className="col-sm">
									<Input
										value={this.state.data.city}
										onChangeHandle={this.handleChange}
										name="city"
										type="text"
										className="form-control"

										placeHolder="City Name"
									/>
								</div>
								<div className="col-sm">
									<button type="submit" className="btn btn-secondary btn-width">
										Search
            </button> &nbsp; (Please enter a city Name.)
							</div>
								<div className="col-sm">

								</div>
							</div>
							{submitted && !this.state.data.city &&
								<div className="help-block" style={{ color: "#F00" }}><strong>City is required</strong></div>
							}
							{(this.props.reportData === 'Error' || this.props.reportData === undefined) ? <div style={{ color: "#F00" }}><strong>Invalid City</strong></div> :
								""
							}
						</div>




					</form>

					<div className="row">
						{(this.props.reportData === 'Error' || this.props.reportData === undefined) ? "" :
							this.weatherList()
						}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	console.log("STATE DATA ::: ", state.data)
	return {
		reportData: state.data,
		loading: state.loading
	};
};

const actionCreators = {
	loadWeatherData: actionCreator.loadWeatherData
};



export default connect(
	mapStateToProps,
	actionCreators
)(Dashboard);

