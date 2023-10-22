const AppError=require("../services/appError");
const globalErrorHandler=require("../controllers/errorHandler");
const scrapRoute=require("./scrapRoute");


module.exports=function(app){
    // calling the scrap route
    app.use("/api/v1",scrapRoute);

    // global route if main route has some problem
    app.all("*",(req,res,next)=>{
        next(new AppError(`cannot find this url on ${req.originalUrl} on this server`,404));
    });
    // global error handling 
    app.use(globalErrorHandler);
    
}