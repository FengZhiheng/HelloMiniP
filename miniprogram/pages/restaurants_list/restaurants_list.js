const app = getApp()
Page({
  data: {
    restaurants: []
  },
  onLoad: function(options) {
    //必须从数据库中重新读一遍数据
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getAll',
      success: res=> {
        app.globalData.restaurants =  res.result.data             
        this.setData({
          restaurants:res.result.data
        })
      },
      fail: console.error
    })    
  },
  goBack: function() {
    wx.navigateBack({ //返回之后，请重新刷新
      delta: 1,
    })
  },
  onDel: function(e) {
    let id = e.currentTarget.dataset.id;
    console.log(id)
    const db = wx.cloud.database();
    db.collection("restaurants").doc(id).remove({
      success: res => {
        wx.showToast({
          title: '删除成功',
        })
        this.onLoad() //删除成功重新加载
      },
      fail: err => {
        wx.showToast({
          title: '删除失败',
        })
      }
    })    
  },
  onUpdate: function(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../set/set?id=' + id,
    })
    this.onLoad() //更新成功重新加载
  }
})