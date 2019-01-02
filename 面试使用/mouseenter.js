mouseover：当鼠标移入元素或其子元素都会触发事件，所以有一个重复触发，冒泡的过程。对应的移除事件是mouseout
一般所绑定的元素有多少个子元素，那么这个方法就会触发多少次。
比如：
<div id="farther">
  <div id="child">
    <div id="child1">

    </div>
  </div>
</div>
window.onload =function(){
  var parent= document.getElementById('farther')
  console.log("parent",parent);
  parent.addEventListener('mouseover',handeler)
  function handeler(e){
    console.log("this",this);
    // this.css("border",'2px solid blue')
    this.style.border="2px solid blue"
  }
}

我们在id为father上绑定了mouseover,那么鼠标从father到child再到child1总共会执行三次，而后鼠标移出的时候
会执行两次。

mouseenter：当鼠标移入元素本身（不包含元素的子元素）会触发事件，也就是不会冒泡，对应的移除事件是mouseleave




js原生是没有document.ready方法的，可以使用window.onload方法，来表示页面和页面的资源都加载完毕。
