---
title: SweetAlertJs使用
date: 2017-02-22 11:30:56
tags:
categories: SweetAlertJs
---
这是一款好看的js弹窗插件，使用很简单：
<!--more-->
```
<!DOCTYPE html>
<html>
<head>
	<title></title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.js"></script>
	<link href="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.css" rel="stylesheet">
</head>
<body>
<button type="button" onclick="button()">Click Me!</button>
<script type="text/javascript">
	function button(){
		//copy code here
		swal({
		  title: "Are you sure?",
		  text: "You will not be able to recover this imaginary file!",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "Yes, delete it!",
		  cancelButtonText: "No, cancel plx!",
		  closeOnConfirm: false,
		  closeOnCancel: false
		},
		function(isConfirm){
		  if (isConfirm) {
		    swal("Deleted!", "Your imaginary file has been deleted.", "success");
		  } else {
		    swal("Cancelled", "Your imaginary file is safe :)", "error");
		  }
		});
		//copy code here
	}
</script>
</body>
</html>
```
