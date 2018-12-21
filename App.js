import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet,Button} from 'react-native';
import { Constants, Location, Permissions } from 'expo';

export default class App extends Component {
  state = {
    location: null,
    errorMessage: null,
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {// если платформа android и приложение работает не в симуляторе
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync(); //вызов функции
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION); // Определяет, предоставлено ли вашему приложению доступ к предоставленному типу разрешения.
    if (status !== 'granted') { // если доступа не получено
      this.setState({
      //  errorMessage: 'Permission to access location was denied',
        });
    }

    let location = await Location.getCurrentPositionAsync({}); // если getCurrentPositionAsync выполнилось до конца
    this.setState({ location:location });
  };

  render() {
    let text = 'please wait 5 seconds(or more)';
      if (this.state.errorMessage) {
        text = this.state.errorMessage;
      } else if (this.state.location) {
        text = JSON.stringify(this.state.location.coords); //переделывает объект в строку
      } // this.state.location - объект


    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,//Высота строки состояния по умолчанию для устройства. Не влияет на изменения, когда используется отслеживание местоположения или активен телефонный звонок.
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});
