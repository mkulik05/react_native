import React from 'react';
import {Text}  from 'react-native';
import { WebBrowser,Constants, Location, Permissions,MapView} from 'expo';
import { MonoText } from '../components/StyledText';
import * as firebase from 'firebase'

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        location: null,
        errorMessage: null,
        region:null,
      };
      var config = {
   apiKey: "AIzaSyDxqDaTcAUR3R6fZwI7PSz5H1yGhVnHHH4",
   authDomain: "location-72fca.firebaseapp.com",
   databaseURL: "https://location-72fca.firebaseio.com",
   projectId: "location-72fca",
   storageBucket: "location-72fca.appspot.com",
   messagingSenderId: "440309375391"
 };
 firebase.initializeApp(config);

  }

    _getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION); // Определяет, предоставлено ли вашему приложению доступ к предоставленному типу разрешения.
      if (status !== 'granted') { // если доступа не получено
        this.setState({
          errorMessage: 'Permission to access location was denied',
          });
      }

      let location = await Location.getCurrentPositionAsync({}); // если getCurrentPositionAsync выполнилось до конца

      firebase.database().ref('location/').set({
    loc: this.location
  });
      //alert(location.coords.longitude)
        //}, 3000);
        this.setState({
          location:location,
          });
    };

  render() {
      return(<Text>ok</Text>)
    } else {
      return(<Text>Waiting..</Text>)
    }
  }
}
