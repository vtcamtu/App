import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class DVL extends React.Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title'),
        };
    };
    render() {
        const { navigation } = this.props;
        let tohopmon = navigation.getParam('arr');
        let diem = navigation.getParam('point');
        let idNghanh = navigation.getParam('idNghanh');
        let tennghanh = navigation.getParam('tennghanh');
        return (
            <View style={styles.container}>
                <View style={{ alignItems: 'center', }}>
                    <Text style={styles.title}>Thông tin tuyển sinh</Text>

                </View>
                <View >
                    <Text style={{ fontSize: 20 }}>Nghành : {tennghanh}</Text>
                    <Text style={{ fontSize: 20 }}>Mã nghành : {idNghanh}</Text>
                    <Text style={{ fontSize: 20 }}>Tổ hợp môn : {JSON.stringify(tohopmon)} </Text>
                    <Text style={{ fontSize: 20 }}>Điểm chuẩn 2018: {diem}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
    }
});
