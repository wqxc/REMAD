flex布局更为方便，快捷，几乎所有的现代浏览器都支持，
ie10以上。

flex会形成一个flex容器，这个容器内的所有元素，自动成为该容器的子元素
容器本身有6个属性：
分别是：
flex-direction:表示容器内的子元素如何排列，有四个值：
  row：默认值，从左往右顺着排列。
  row-reverse:从右往左倒着排列。
  column:从上往下排列。
  column-reverse:从下往上排列。

flex-wrap:指的是如果一行放不下，该如何换行：有三个值：
  nowrap:表示不换行,即使你给每一个子元素都规定了宽度，因为这个属性，所有的子元素将会变成，flex：1；平均分配宽度。
  wrap:换行，正常的换行，另起一行，
  wrap-reverse:换行，是从该行的上边另起一行，将这一行往下挤。

flex-flow:这个属性是flex-direction和flex-wrap的合写。默认值是row nowrap;
  就是一个简写的形式。
  比如：
  flex-direction:row;
  flex-wrap:wrap-reverse;
  和下边的写法作用是一样的
  flex-flow:row wrap-reverse;
justify-content：这个属性是定义了，容器内的元素在主轴(x)上的排列方式。有五个值：
  flex-start:表示左对齐，
  flex-end:右对齐，
  center：居中，
  space-between:两端对齐项目之间间隔相等
  space-around:每个项目两侧的间隔相等，所以，项目之间的间隔比项目与边框的间隔大一倍。
align-items:定义交叉轴上项目如何对齐：也有五个值：
  flex-start:交叉轴的起点对齐，就是顶天
  flex-end：交叉轴的终点对齐，就是立地。
  flex-wrap: wrap-reverse;会影响上边两个值。导致出现相反的效果。

  center：就是交叉轴的中点对齐。居中
  baseline:项目的第一行文字的基线对齐，
  stretch：没有设置项目的高度的话，将沾满整个容器，整个是默认值。

align-content：定义了多根轴线的对齐方式。如果项目只有一根轴线，则不起作用。
该属性有六个值：
  flex-start：起点对齐，
  flex-end：终点对齐
  center：中点对齐
  space-between:与交叉轴两端对齐，轴线之间间隔平均分布
  space-around:每根轴线的两侧间隔相等。所以轴线的间隔比轴线与边框之间的间隔大一倍
  stretch：轴线沾满整个交叉轴。
  整个属性与justify-content很相似，只是一个是一条横轴，一个是多个横轴
