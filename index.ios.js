/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    DeviceEventEmitter
} from 'react-native';

// 本地数据
var dataArr = require('./LocalData/data.json');

import XMGShopCell from './XMGShopCell';
import XMGBottomView from './XMGBottomView';

export default class AShopBuy extends Component {
    // 构造
    constructor(props) {
        super(props);

        // 1.创建一个数据源
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        // 初始状态
        this.state = {
            dataSource: ds
        };
    }

    componentWillMount() {
        for (var i = 0; i < dataArr.length; i++) {
            // 1. 取出数组中的每一个对象
            var data = dataArr[i];
            // 2. 增加购买数量的属性
            data.buyCount = 0;
        }
        // console.log(dataArr);

        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(dataArr)
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {/*列表*/}
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                />
                {/*底部视图*/}
                <XMGBottomView/>
            </View>
        );
    }


    _renderRow(rowData){
        return(
            <XMGShopCell dataObj={rowData} />
        )
    }

    componentDidMount() {
        this.refreshList = DeviceEventEmitter.addListener("clearShopBuy", ()=>{
            var tempArr = dataArr;
            for (var i = 0; i < tempArr.length; i++) {
                // 1. 取出数组中的每一个对象
                var data = tempArr[i];
                // 2. 增加购买数量的属性
                data.buyCount = 0;
            }
            // console.log(dataArr);

            this.setState({
                // 延展操作符 ... 会遍历对象中的所有属性  [dataArr, ...tempArr] 
                dataSource: this.state.dataSource.cloneWithRows([dataArr, ...tempArr])
            });
        })
    }

    componentWillUnmount() {

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    }
});

AppRegistry.registerComponent('AShopBuy', () => AShopBuy);
