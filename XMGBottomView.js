/**
 * Created by xiaomage on 2017/3/26.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    DeviceEventEmitter,
    TouchableOpacity
} from 'react-native';

export default class XMGBottomView extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            totalPrice: 0,
            buyWineArr: []  // 购买的酒的数组
        };
      }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.leftViewStyle}>
                    <Text style={{fontSize:16, marginRight:5}}>总价: </Text>
                    <Text style={{fontSize:16, color:'red'}}>¥{this.state.totalPrice}</Text>
                </View>
                <View style={styles.rightViewStyle}>
                    <Text style={{fontSize:16, marginRight:5}}>购买</Text>
                   <TouchableOpacity onPress={()=>this._clearAll()}>
                      <Text style={{fontSize:16, color:'red'}}>清空购物车</Text>
                   </TouchableOpacity>
                </View>
            </View>
        );
    }

    _clearAll(){
        this.setState({
            totalPrice: 0,
            buyWineArr: []
        });
        
        // 发出通知
        DeviceEventEmitter.emit('clearShopBuy', null);
    }

    componentDidMount() {
        // 接收添加商品的通知  --> addListener
        this.addWineNotice = DeviceEventEmitter.addListener("clickAddWine", (data)=>{
             var tempArr = this.state.buyWineArr;

             if(tempArr.length == 0){ // 购买数组为空
                 tempArr.push(JSON.parse(JSON.stringify(data))); // 由浅拷贝变成深拷贝
             }else {
                 // 1.1 遍历购买数组中所有的商品, 与data进行比较
                 for(var i=0; i<tempArr.length; i++){
                     // 1.2 根据id进行判断
                     if(data.id == tempArr[i].id){ // 有
                         tempArr[i] = JSON.parse(JSON.stringify(data)); // 直接替换
                     }else { // 没有
                         tempArr.push(JSON.parse(JSON.stringify(data)));
                     }
                 }
             }

             console.log(tempArr);


             // 2. 更新状态
            this.setState({
                totalPrice: this.state.totalPrice + parseFloat(data.money),
                buyWineArr: tempArr
            })
        });


        // 接收移除商品的通知
        this.removeWineNotice = DeviceEventEmitter.addListener("clickRemoveWine", (data)=>{
             // 1.1 判断
             if(this.state.totalPrice >= 0){
                 var tempArr = this.state.buyWineArr;

                 // 1.2 遍历删除
                 for(var i=0; i<tempArr.length; i++){
                     if(data.id == tempArr[i].id){
                          if(tempArr[i].buyCount > 1){ // 超出1件
                              tempArr[i].buyCount -= 1;
                          }else {
                              tempArr.splice(i, 1);
                          }
                     }
                 }

                 // 1.3 更新状态
                 this.setState({
                     totalPrice: this.state.totalPrice - parseFloat(data.money),
                     buyWineArr: tempArr
                 });
             }
        });

    }

    // 当组件即将被卸载时调用
    componentWillUnmount() {
        // 一定要移除通知
        this.addWineNotice.remove();
        this.removeWineNotice.remove();
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ccc',
        height: 50,
        borderTopColor:'#999',
        borderTopWidth: 1,

        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:10
    },

    leftViewStyle:{
        flexDirection:'row'
    },

    rightViewStyle:{
        flexDirection:'row'
    }

});

module.exports = XMGBottomView;