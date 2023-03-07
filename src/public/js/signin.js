document.querySelectorAll('.alert-danger').forEach(node => {
    setTimeout(function () {
       node.remove();
    }, 2000);
 })
 document.querySelectorAll('.alert-success').forEach(node => {
    setTimeout(function () {
       node.remove();
    }, 2000);
 })