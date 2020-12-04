Page({

  /**
   * 页面的初始数据
   */
  data: {
    restaurants: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.id) {
      const db = wx.cloud.database();
      db.collection("restaurants").where({
        _id: options.id
      }).get({
        success: res => {
          this.setData({
            restaurants: res.data[0] //返回的是一个数组，取第一个
          })
        },
        fail: err => {
          console.log(err)
        }
      })
    }
  },
  comfirm: function(e) {
    const db = wx.cloud.database() //打开数据库连接
    let restaurant = e.detail.value
    if (restaurant.id == "") { //id等于空是新增数据
      this.add(db, restaurant) //新增记录
    } else {
      this.update(db, restaurant) //修改记录
    }
  },
  add: function(db, restaurant) {
    db.collection("restaurants").add({
      data: {
        note: restaurant.note        
      },
      success: res => {
        wx.showToast({
          title: '新增记录成功',
        })
        wx.navigateBack({ //返回之后，请重新刷新
          delta: 1,
        })
        // wx.navigateTo({
        //   url: '../OneButton/OneButton',
        // })
      },
      fail: err => {
        wx.showToast({
          title: '新增失败',
        })
      }
    })

  },
  update: function(db, restaurant) {
    db.collection("restaurants").doc(restaurant.id).update({
      data: {
        note: restaurant.note        
      },
      success: res => {
        wx.showToast({
          title: '修改记录成功',
        })        
        // wx.navigateTo({
        //   url: '../OneButton/OneButton',
        // })
        wx.navigateBack({ //返回之后，请重新刷新
          delta: 1,
        })
      },
      fail: err => {
        wx.showToast({
          title: '修改失败',
        })
      }
    })
  }

})