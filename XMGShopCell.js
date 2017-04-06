/**
 * Created by xiaomage on 2017/3/26.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    DeviceEventEmitter // 通知组件
} from 'react-native';

const Dimensions = require('Dimensions');
const screenW = Dimensions.get('window').width;

export default class XMGShopCell extends Component {
    static defaultProps = {
        // 接收上下文传递数据
        dataObj: {}
    };

    static propTypes = {
       //  dataObj: PropTypes.object || PropTypes.array
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            wine: this.props.dataObj
        };
    }

    render() {
        var data = this.state.wine;
        return (
            <View style={styles.container}>
                {/*左边视图*/}
                <View style={styles.leftViewStyle}>
                    <Image
                        source={{uri: data.image}}
                        style={{width:80, height:80, margin:8}}
                    />
                    <View style={styles.leftInnerViewStyle}>
                        <Text
                            style={{width: screenW * 0.4, color:'red', fontSize:15}}
                            numberOfLines={2}
                        >{data.name}</Text>
                        <Text style={{color:'orange'}}>¥{data.money}</Text>
                    </View>
                </View>
                {/*右边视图*/}
                <View style={styles.rightViewStyle}>
                    <TouchableOpacity style={styles.rightDealStyle} onPress={()=>this._removeWine(data)}>
                        <Text style={styles.rightDealTextStyle}>-</Text>
                    </TouchableOpacity>
                    <Text style={{fontSize:15}}>{data.buyCount}</Text>
                    <TouchableOpacity style={styles.rightDealStyle} onPress={()=>this._addWine(data)}>
                        <Text style={styles.rightDealTextStyle}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    /**
     * 删除一个商品
     * @private
     */
    _removeWine(data) {
        // 1.1 判断
        if (data.buyCount == 0) {
            alert('当前数量为0');
            return;
        }

        // 1.2 删除一个商品
        data.buyCount -= 1;

        // 1.3 更新状态
        this.setState({
            wine: data
        });
        
        // 1.4 发出通知
        DeviceEventEmitter.emit("clickRemoveWine", data);
    }

    /**
     * 添加一个商品
     * @param data
     * @private
     */
    _addWine(data) {
        // 1.1 添加一个商品
        data.buyCount += 1;

        // 1.2 更新状态
        this.setState({
            wine: data
        });

        // 1.3 发出通知
        DeviceEventEmitter.emit("clickAddWine", data);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,

        flexDirection: 'row'
    },

    leftViewStyle: {
        flexDirection: 'row',
        width: screenW * 0.6
    },

    leftInnerViewStyle: {
        justifyContent: 'space-between',
        padding: 10,
        paddingTop: 15,
        paddingBottom: 15
    },

    rightViewStyle: {
        flexDirection: 'row',
        width: screenW * 0.4,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    rightDealStyle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: 'red',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: "center",
        margin: 8
    },

    rightDealTextStyle: {
        backgroundColor: 'transparent',
        width: 30,
        height: 30,
        fontSize: 30,
        color: 'blue',
        textAlign: 'center',
        lineHeight: 30
    }

});

module.exports = XMGShopCell;