import React from 'react';
import { Text, View, StyleSheet, TextInput, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Font } from 'expo';
import {contain} from  '../App'
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash'



export default class Screen3 extends React.Component {
  static navigationOptions = {
    title: 'TRA CỨU THÔNG TIN TUYỂN SINH',
  };
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      data: [],
      query:"",
      text:""
    };
  }
  async componentDidMount() {
    await Font.loadAsync({
      'Anton-Regular': require('../assets/fonts/Anton-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
  }
  fectData = async () => {
    const reponse = await fetch("https://testapi.io/api/nguyenanh191/nguyenanh191");
    const json = await reponse.json();
    this.setState({
      data: json.infoUni,
      fulldata : json.infoUni
    });
  };

  async componentWillMount() {
    this.fectData();
  };
  handleSearch = (text) => {
    const data = _.filter(this.state.fulldata,txt =>{
      return contain(txt,text);
    });
    this.setState({
      query:text,data
    });
  }
  
  render() {
    return (
      <View style={{ flex: 1 }}>

        {/* Header */}
        {/* <View style={styles.header}>
          
        </View> */}
        {/* End header */}

        {/* Body */}
        <View style={styles.body}>

          <View flexDirection='row' style={{ justifyContent: 'space-around', borderRadius: 10, borderColor: '#4267b2', borderWidth: 2 }}>
            <TextInput
              style={styles.inputSearch}
              placeholder='Nhập tên trường'
              onChangeText={(text) => this.handleSearch(text)}
            />
            <Icon
              name='search'
              size={20}
            />
          </View>
          <FlatList
          contentContainerStyle={{paddingBottom:'5%'}}
            data={this.state.data}
            keyExtractor={(x, i) => i.toString()}
            renderItem={({ item }) =>
              <TouchableOpacity onPress={() => {
                  this.props.navigation.navigate('DVH', {
                    uri: item.uri,
                    shortName: item.shortName,
                    name: item.name
                  })
              }}>
                <View flexDirection='row' style={{padding:'2%'}}>
                  <Image style={{ width: 50, height: 50 }} source={{ uri: `${item.uri}` }}>
                  </Image>
                  <Text style={{paddingLeft:10, fontSize: 18, color: 'darkblue' }}>{item.shortName} - </Text>
                  <Text style={{ fontSize: 18,flex:1 }}>{item.name}</Text>
                </View>

              </TouchableOpacity>
            }
          />
        </View>

        {/* End Body */}


      </View>
    );
  }
}
const styles = StyleSheet.create({
  // header: {
  //   backgroundColor: "#9f224e",
  //   height: '5%'
  // },
  body: {
    marginTop: 10,
    height: '100%'
  },
  title: {
    padding: 10,
    fontSize: 26,
    textAlign: 'center',
    color: 'white',
  },
  inputSearch: {
    fontSize: 20,
  }
});
