# 基于react-native的购物车案例
注:*本案例缺乏node-modules包文件夹，请自行通过依赖文件下载*

*仓库拉下来的代码注意入口函数的文件名是否与ios或者android的文件名字一致*

## 核心的API
1. ListView  作列表的基本
```
<ListView
    dataSource={this.state.dataSource}
    renderRow={this._renderRow}
/>
```
2. DeviceEventEmitter  作与其他组件的通知和广播工作
```
// 发出通知
DeviceEventEmitter.emit('clearShopBuy', null);
```
```
// 接收通知
DeviceEventEmitter.addListener("clickAddWine", (data)=>{}
```

## 实现的功能
1. 实现基本商品列表布局
2. 实现数据的热更新，包括每一个商品的数量，购物车的总数以及购物车中的数组
3. 添加，删除，清空列表和购物车的数据

## 原案例未完善之处
1. 购物车清空仅限于一次清空，第二次清空列表数量不清零
2. 添加商品的购物车数组不完善，导致传给服务器的数据会出错

## 修改的地方
1. 把原来的购物车底部组件发送通知给入口函数的ListView -> 通知单个商品列表，解决第二次刷新列表不清零的情况，但也许会降低了效率
2. 原本添加商品的函数由于for循环的不严谨，导致购物车同一商品的重复添加 -> 通过加入flag标矢位修改源代码不严谨之处，提高代码效率
