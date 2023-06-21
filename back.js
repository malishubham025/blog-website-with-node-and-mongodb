const express=require("express");
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
const ejs=require("ejs");
const mongoose=require('mongoose');
app.set("view engine","ejs");
const home="Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt dignissimos ullam, voluptatum omnis illum quasi amet. Similique corporis, pariatur exercitationem nemo nobis voluptas non possimus nulla, accusamus fuga aliquid ad!     Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt dignissimos ullam, voluptatum omnis illum quasi amet. Similique corporis, pariatur exercitationem nemo nobis voluptas non possimus nulla, accusamus fuga aliquid ad!";
const about="Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt dignissimos ullam, voluptatum omnis illum quasi amet. Similique corporis, pariatur exercitationem nemo nobis voluptas non possimus nulla, accusamus fuga aliquid ad!     Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt dignissimos ullam, voluptatum omnis illum quasi amet. Similique corporis, pariatur exercitationem nemo nobis voluptas non possimus nulla, accusamus fuga aliquid ad!";
var post;
var posts=[];
var e;
mongoose.connect("mongodb://localhost:27017/blog_website",function(err,res){
    if(err){
        console.log(err);
    }
    else{
        console.log("connected to mongo")
    }
});

const schema=new mongoose.Schema({
    name:String,
    content:String
})
const blog=mongoose.model("normalblog",schema);




app.get("/",function(req,res1){
    blog.find({},function(err,res){
        if(err){
            console.log(err)
        }
        else{
            e=res;
            console.log(e);

            res1.render("home",{"starting":home,"kuchbhi":res});
        }
    })
    
});
app.get("/about",function(req,res){
    res.render("about",{"starting":about})
}) 
app.get("/compose",function(req,res){

    res.render("compose");
})
app.post("/compose",function(req,res1){
    //  post={
        title=req.body.title;
        console.log(title);
        content=req.body.post
    // // }
    // // posts.push(post);
    // // console.log(posts);
    blog.create({name:title,content:content},function(err,res){
        if(err){
            console.log(err);
        }
        else{
            console.log("inserted successfully")
            res1.redirect("/") 
        }
    })
    
});
// ,post_of_home:posts.posts.content
// <%for(var i=0;i<kuchbhi.length;i++){%>
//     <%=title_of_home[i]%>
// ,"title_of_home":posts.title
// <% }%>
app.get("/posts/:anything",function(req,res){
        var x=req.params.anything;
        
        for(var i=0;i<e.length;i++){
            if(x===e[i].name){
                console.log("match found!");
                res.render("posts",{"title":x,"content":e[i].content});
                break;
            }
            else{
                console.log("no match found");
            }
            
        
        }
  
    });
    
app.listen(3000,function(){console.log("server has started!")});