const app = getApp()
Page({
  data: {
    result:"吃啥？",    
  },
 
  getWWH: function(e) {            
    let index = Math.floor(Math.random()*app.globalData.restaurants.length); 
    let r = app.globalData.restaurants[index].note 
    this.setData({
      result:r
    })    
  },

  goAdd:function(e){
    wx.navigateTo({
      url: '../set/set',
    })
  },
  goCheck:function(e){
    wx.navigateTo({
      url: '../restaurants/restaurants',
    })
  }
})