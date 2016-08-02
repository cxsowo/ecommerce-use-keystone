# 电商需求

## 总体要求

基于node的keystone。

## 功能需求

### 用户

注册：用户名由字母、数字和下划线组成，以字母开头，长度6-20，唯一，密码长度6-20。

登录：先检查用户名格式和密码长度正确性，再与服务端验证登录。

查看、修改个人信息：头像、昵称、邮箱、手机号、姓名、性别、出生年月、收货地址。

查看已购买订单：查看已购买订单，只显示交易成功的，包含已完成和待评价。

查看交易中订单：包括待发货、待收货订单。

购物车：待购买的商品，显示商品基本信息，可勾选付款，可删除、修改数量，付款成功生成新的待发货，无论付款成功与否都从购物车中删除。

### 商品

搜索：可根据商品名搜索商品。

商品分类：主要分为图书类、电子类、服装类、日化类和食品类。

商品信息：包含最多5张、最少1张图，可查看商品名称、单价、折扣、库存、详细信息（文字）、评价。

### 其它说明

付款：无实际付款，由后台自行随意处理。

页面：应至少包含：主页、分类显示商品页、查看单个商品详情页、个人页面(包含购物车、订单查看等)。

# 数据库

# users

_id : ObjectId
name : Text
password : Password
email : Email

# commodity

_id : ObjectId
category_id : ObjectId
name : Text
stock : Number
price : Money
details : Markdown
picture : CloudinaryImages

# category

_id : ObjectId
first_category : Text
second_category : Text
third_category : Text

# shopcart

_id : ObjectId
user_id : ObjectId
commodity : [{commodity_id : ObjectId,numbers : Number}]

# comment

_id : ObjectId
commodity_id : ObjectId
user_id : ObjectId
order_id : ObjectId
score : Number
detail : Textarea

# order

_id : ObjectId
user_id : ObjectId
commodity : [{commodity_id : ObjectId,numbers : Number}]
price : Money
status : Text

