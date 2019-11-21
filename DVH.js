import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native';
import { Font } from 'expo';
// import {contain} from '../App'
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash'


const name = ['DVH', 'DVL', 'GSA', 'NTT', 'SPK', 'SPS', 'DSG', 'DTM', 'KTS', 'QST', 'QSC', 'SGD', 'CSH', 'NLS', 'KSA', 'DNT'];
var sname;
export default class DVH extends React.Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#09a589',
        },
        headerTitleStyle: {
            color: 'white',
        },
    };
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false,
            data: [],
            datafull: [],
            query: "",
            text: "",
            showModal: false,
            shortName: ""
        };
    }
    async componentDidMount() {
        await Font.loadAsync({
            'Anton-Regular': require('../assets/fonts/Anton-Regular.ttf'),
        });
        this.setState({
            fontLoaded: true,
        });
    }
    async fectData(nameShort) {
        var index = 0;
        for (let i = 0; i < name.length; i++) {
            if (nameShort.includes(name[i]) == true) {
                index = i;
                i = name.length;
            }
        }
        sname = name[index];
        fetch("https://testapi.io/api/nguyenanh191/DVH")
            .then(reponse => reponse.json())
            .then(data => {
                this.setState({
                    data: data[sname].map(item => item.listMajor).reduce((acc, currValue) => { return acc.concat(currValue); }, []),
                    fulldata: data[sname].map(item => item.listMajor).reduce((acc, currValue) => { return acc.concat(currValue); }, [])
                })
            })
    }
    async componentWillMount() {
        const { navigation } = this.props;
        let temp = navigation.getParam('shortName');
        this.fectData(temp);
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('name'),
        };
    };
    contain = ({ name }, query) => {
        if (name.toUpperCase().includes(query.toUpperCase())) {
            return true;
        }
        return false;
    }
    handleSearch = (text) => {
        const data = _.filter(this.state.fulldata, txt => {
            return this.contain(txt, text);
        });
        this.setState({
            query: text, data
        });
    }
    async filerSearch(text) {
        const reponse = await fetch("https://testapi.io/api/nguyenanh191/DVH");
        const json = await reponse.json();
        if (text != '') {
            this.setState({
                data: json[sname].map(item => item.listMajor).reduce((acc, currValue) => { return acc.concat(currValue); }, []).filter(item => item.name.toString().includes(text))
            });
        }
        else {
            this.setState({
                data: json[sname].map(item => item.listMajor).reduce((acc, currValue) => { return acc.concat(currValue); }, [])
            });
        }
    }
    render() {
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1 }} >
                <View style={styles.top}>
                    <Image
                        source={{ uri: `${navigation.getParam('uri')}` }}
                        style={{ width: 150, height: 150, borderRadius: 150 / 2, borderColor: 'white', borderWidth: 1, }}
                    />
                </View>
                <View flexDirection='row' style={{ justifyContent: 'space-around', borderRadius: 10, borderColor: '#4267b2', borderWidth: 2 }}>
                    <TextInput
                        style={styles.inputSearch}
                        placeholder='Nhập tên nghành'
                        onChangeText={(text) => this.handleSearch(text)}
                    />
                    <Icon
                        name='search'
                        size={20}
                    />
                </View>
                <ScrollView horizontal={true} style={{ marginTop: 10 }}>
                    <FlatList
                        data={this.state.data}
                        keyExtractor={(x, i) => i.toString()}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('ShowInfo', {
                                    title: navigation.getParam('name'),
                                    tennghanh: item.name,
                                    arr: item.THM.map((nameTHM) => nameTHM + ""),
                                    point: item.diemchuan,
                                    idNghanh: item.manganh
                                })
                            }}
                            >
                                <View>
                                    <Text style={styles.item}>{item.name}</Text>
                                </View>

                            </TouchableOpacity>
                        }
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    top: {
        borderBottomWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#e0e0e0',
        flexDirection: 'row',
        padding: 20,
        backgroundColor: '#5988e5'
    },
    body: {
    },
    inputSearch: {
        fontSize: 20,
    },
    container: {
        justifyContent: 'center',
        padding: 5,
        flexDirection: 'row',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 0.5,
    },
    item: {
        fontSize: 20,
        color: 'black',
    }
});
