第一种方法。
var obj=new Image();
obj.src="http://lucton-test.oss-cn-beijing.aliyuncs.com/152336hplbzqajl1opm5bd_1545118226653.jpg";
obj.onload=function(){
  alert('图片的宽度为：'+obj.width+'；图片的高度为：'+obj.height);
  document.getElementById("mypic").innerHTML="<img src='"+this.src+"' />";
}
兼容所有的浏览器，非常好用
