如何生存BFC
  设置浮动
  绝对定位元素
  inline-block
  table-cell
  table-caption
  设置overflow且值不为visible
  display:flex 或者 display:inline-flex

BFC的布局规则：

  内部的块级元素会在垂直方向一个接一个地放置。
  块级元素垂直方向的距离由margin决定。属于同一个BFC的两个相邻块级元素的margin会发生重叠。
  每个块级元素的margin box的左边，与包含块border box的左边相接触（对于从左往右的格式化，否则相反）。即使存在浮动也是如此（虽然盒子内的文字会环绕浮动元素），除非该块级元素形成了一个新的BFC。
  BFC的区域不会与float box重叠。
  BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
  计算BFC的高度时，浮动元素也参与计算。


BFC的作用：
  块级元素垂直方向的距离由margin决定。属于同一个BFC的两个相邻块级元素的margin会发生重叠。
  如果要避免margin重叠的话，可以再次构建BFC
  比如：
  .container {
    background-color: red;
    overflow: hidden;
  }

  p {
    margin: 10px 0;
    background-color: lightgreen;
  }
  .newBFC{
    overflow: hidden;
  }

  <div class="container">
    <p>Sibling 1</p>
    <p>Sibling 2</p>
    <div class="newBFC">
      <p>Sibling 3</p>
    </div>
  </div>

  几个p元素包含在一个BFC内(container);虽然设置了margin为10，但是，后两个p元素的margin是塌陷的，也就是
  原本应该有两个10px的，但是，最后却只有一个。
  如果要避免这种情况的话，就再构造一个BFC出来。.newBFC就是构造了一个新的BFC，解决了margin的塌陷。


float造成的父元素高度塌陷

    .container {
      border: 1px solid red;
    }
    .left{
      float: left;
      width: 100px;
      height: 100px;
      margin-right: 10px;
      border:1px solid green;
    }
    .container1{
      height: 100px;
      width: 210px;
      border: 2px solid yellow;
    }
    .clear-fix{
      clear: both;
    }
    <div class="container">
      <div class="left">

      </div>
      <div class="left">

      </div>
      <div class="clear-fix">

      </div>
    </div>
    <div class="container1">

    </div>
  如上所示，高度塌陷造成了，container1与两个left重和了。
  原因就在于父元素没有了高度。
  解决的办法就是第一；给父元素设置高度。
  第二：clear:both
  第三：构建BFC  
  .container {
      border: 1px solid red;
      overflow:hidden;
    }
