import axios from 'axios';
export const loading = () => {
  return {
    type: "LOADING"
  };
};

export const loadWeatherData = (cityName) => {
  return dispatch => {

    var url;
    if (cityName != undefined) {
      url = `http://api.openweathermap.org/data/2.5/weather?appid=8c60ee223a16786b52ba74279f0e3eae&q=${cityName}`;
    }

    axios.get(url)
      .then(function (response) {
        console.log("API DATA : ::::::", response.data)
        dispatch({
          type: 'LOAD_WEATHER_DATA',
          value: response.data
        });
      })
      .catch(function (error) {
        dispatch({
          type: 'LOAD_WEATHER_DATA_ERROR',
          value: 'Error'
        });
      });
  };



  // function request(user) {
  //   return { type: userConstants.LOGIN_REQUEST, user };
  // }
  // function success(user) {
  //   return { type: userConstants.LOGIN_SUCCESS, user };
  // }
  // function failure(error) {
  //   return { type: userConstants.LOGIN_FAILURE, error };
  // }
}



// export const loadWeatherData = () => {
//   return dispatch => {
//     dispatch(loading());
//     loadWeatherDataAsnc(dispatch);
//   };
// };

// export const loadWeatherDataAsnc = (dispatch) => {
//   getLocation();
//   function getLocation() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(showPosition);
//     }
//     showPosition();
//   }

//   function showPosition(cityName) {
//     console.log(cityName)
//     var url;
//     if (cityName != undefined) {
//       url = `api.openweathermap.org/data/2.5/weather?q=${cityName}`;
//     }

//     axios.get(url)
//       .then(function (response) {
//         console.log("API DATA : ::::::", response.data.list)
//         dispatch({
//           type: 'LOAD_WEATHER_DATA',
//           value: response.data.list
//         });
//       })
//       .catch(function (error) {
//         dispatch({
//           type: 'LOAD_WEATHER_DATA_ERROR',
//           value: 'Error'
//         });
//       });
//   }
// };

