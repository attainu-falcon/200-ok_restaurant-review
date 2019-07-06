var multer =  require('multer');
module.export = function()
{
    var storage = multer.diskStorage({
     destination:function(req,file,cb)
     {
         cb(null,'../public/uploads')
     },
     filename:function(req,file,cb){
         cb(null,new Date().getTime()+".jpg")
     }
    })
    var mult = multer({storage:strorage});
    return mult;
}