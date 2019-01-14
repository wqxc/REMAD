flex元素项目上的属性有六个：
  order:定义项目的排列顺序，数字越小越靠前。可以打乱原有的排序方式。
  flex-grow：定义项目放大的比例，默认为0，也就是不放大，即使有空间也不放大。
  flex-shrink:定义项目的缩小比例，就是如果空间不足，就缩小。默认为1；
  flex-basis:flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
  flex:flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
  align-self:允许单个的项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
  他的值与父元素的align-items的值是一样的。
