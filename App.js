import React from 'react';
import { Text, View, StyleSheet, TextInput, FlatList, Image, ScrollView } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Screen1 from './components/Screen1';
import Screen2 from './components/Screen2';
import Screen3 from './components/Screen3';

const Navi = createStackNavigator({
  Home: { screen: Screen1 },
  Screen2: { screen: Screen2 },
  Screen3: { screen: Screen3 },
})
const MainNavi = createAppContainer(Navi);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  fectData = async () => {
    const reponse = await fetch("https://testapi.io/api/nguyenanh191/nguyenanh191");
    const json = await reponse.json();
    this.setState({
      data: json.infoUni
    });
  }
  componentWillMount() {
    this.fectData();
  }
  render() {
    return (
      <View style={{ padding: 15, flex: 1 }}>
        <Text style={styles.title}>Tra cứu thông tin tuyển sinh</Text>
        <View style={{ top: 24 }}>
          <TextInput
            style={styles.inputSearch}
            placeholder="Nhập tên trường"
            onChangeText={(text) => this.setState({ text })}
          />
          <ScrollView>
            <FlatList contentContainerStyle={{ paddingBottom: 80 }}
              data={this.state.data}
              keyExtractor={(x, i) => i.toString()}
              renderItem={({ item }) =>
                <View flexDirection='row' style={{ padding: 8 }}>
                  <Image style={{ width: 50, height: 50 }} source={{ uri: `${item.uri}` }}>
                  </Image>
                  <Text style={{ fontSize: 18, color: 'darkblue' }}>{item.shortName} - </Text>
                  <Text style={{ fontSize: 18 }}>{item.name}</Text>
                </View>
              }
            >
            </FlatList>
          </ScrollView>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    backgroundColor: "#bff2e8",
    fontSize: 25,
    textAlign: 'center',
  },
  inputSearch: {
    borderBottomColor: 'black',
    borderBottomWidth: 2
  }
});
