
const express = require("express");
const path = require("path");
// const popup = require("popups");
const cors = require("cors"); //used for secruity purpose 
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const multer = require('multer');
const { render } = require("@testing-library/react");



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Create connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'shop_23'
});

//connect to database
conn.connect((err) => {
  if (err) throw err;
  console.log('Mysql Connected...');
});

//Multer
var imagename = '';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("a1")
    cb(null, 'public')
  },
  filename: (req, file, cb) => {
    console.log("a2")
    imagename = Date.now() + '-' + file.originalname;
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

//route for homepage
app.get('/showproduct', (req, res) => {
  let sql = "SELECT * FROM product";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//route for delete
app.get('/productdelete/:id', function (req, res) {
  const id = req.params.id;
  console.log(id);
  let sql = "DELETE FROM product WHERE product_id=" + id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/showproduct');
  });
});

//Route for Edit
app.get('/productedit/:id', function (req, res) {
  const id = req.params.id;
  console.log(id);
  let sql = "select *  FROM product WHERE product_id=" + id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//route for update data
app.post('/update', (req, res) => {
  let sql = "UPDATE product SET product_name='" + req.body.product_name + "', product_price='" + req.body.product_price + "', qty='" + req.body.qty + "' WHERE product_id=" + req.body.id;
  console.log(sql);
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/showproduct');
  });
});

//route for insert
app.post('/upload', upload.single('file'), (req, res, next) => {
  console.log(req.body.file);
  console.log(imagename);
  let data = {
    product_name: req.body.product_name,
    product_price: req.body.product_price,
    qty: req.body.product_qty,
    product_image: imagename
  };
  console.log(data);
  let sql = "insert into product set ?";
  let query = conn.query(sql, data, (err, result) => {
    if (err) throw err;

    let q = conn.query("select * from product", (err, results) => {
      if (err) throw err;
      res.json(results);
      // res.end();
    });
  });

});

//login
app.post('/login', (req, res) => {
  let sql = "select * from login where username='" + req.body.username + "' and password='" + req.body.password + "'";
  console.log(sql);
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//Add to cart
// app.get('/addcart/:id', function (req, res) {
//   const id = req.params.id;
//   let doing = "select product_id from cart";

//   conn.query(doing, (err, get) => {
//     var proid = 0;
//     for (var i = 0; i < get.length; i++) {
//       proid = get[i].product_id;
//     }
//     // console.lo[g(proid,'kjafdhkdshf')
//     if (proid == id) {
//       console.log("already added");
//       // res.send({message: "Already Product Added in Cart"})
//     }
//     else if (proid != id) {
//       let data = { customer_name: 'ramu', product_id: id, qty: 1 };
//       // console.log(data, 'dat fetched');
//       let sql = "INSERT INTO cart SET?";
//       console.log(sql, 'insertsql')
//       conn.query(sql, data, (err, results) => {
//         if (err) throw err("data not added");
//         res.json(results);
//       });
//     }
//   })
// });
app.get('/addcart/:id',function(req,res) {	
	const id=req.params.id;
    let sql1 = "SELECT * FROM cart where product_id=" + id;
    let query1 = conn.query(sql1,(err,results) => {
      if(err) throw err;
      if(results.length >= 1){
        // console.log("Item already added")
        res.send({message:"Item is already added"});

      }
      else{
        let data = {
        customer_name:'ramu',product_id: id,qty:1};
        console.log(data);
        let sql = "INSERT INTO cart SET ?";
        let query = conn.query(sql, data,(err, results) => {
        if(err) throw err;
        res.json(results);
     // res.end();
      
    });
}
})
});

//View Cart 
app.get('/view_cart', function (req, res) {
  let sql = "select cart.qty,cart.customer_name,product.product_id,product.product_name,product.product_price,product.product_image from product,cart where product.product_id=cart.product_id";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//Remove Cart
app.get('/remove_cart/:id', function (req, res) {
  const id = req.params.id;
  console.log(id);
  let sql = "DELETE FROM cart WHERE product_id=" + id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/showproduct');
  });
});

//Increment
app.get('/increment/:id', function(req,res){
  const id =req.params.id;
  let a="select *from product,cart where product.qty=cart.qty and product.product_id='"+id+"' and cart.product_id='"+id+"'";
  conn.query(a,(err,oops)=>{
    console.log(oops);
        if (err) throw err;
    if(oops.length>=1){
      console.log("out of stock");
      res.send({message:"Out of Stock"});
    }
    else{
        let sql = "UPDATE cart SET qty= qty+1 WHERE product_id=" + id;
       let query = conn.query(sql, (err, results) => {
       if (err) throw err;
      // res.redirect('/showproduct');
   });
  }
  })
})
// app.get('/increment/:id', function (req, res) {
//   const id = req.params.id;
//   let a = "select *from product,cart where product.qty=cart.qty and product.product_id='" + id + "' and cart.product_id='" + id + "'";
//   conn.query(a, (err, oops) => {
//     for (var i = 0; i < oops.length; i++) {
//     }
//     if (oops.length >= 1) {
//       console.log("out of stock")
//     }
//     else {
//       let sql = "UPDATE cart SET qty= qty+1 WHERE product_id=" + id;
//       let query = conn.query(sql, (err, results) => {
//         if (err) throw err;
//         res.redirect('/showproduct');
//       });
//     }
//   })
// })

//Decrement
app.get('/decrement/:id', function (req, res) {
  let id = req.params.id;
  console.log(id);
  let sql = "update cart set qty =qty-1 where qty>1 and product_id='" + id + "'";
  conn.query(sql, (err, data) => {
    if (err) throw err;
    res.json(data);
  })
})

//Clean Cart
app.post('/cleancart', function (req, res) {
  const id = req.params.id;
  console.log(id);
  let sql = "DELETE FROM cart";
  conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/showproduct');
  });
});

//Payment (Generate Bill)
// async and await associated to promise for synchronous process
app.post('/payment', async (req, res) => {
  //console.log(req.body.products);
  let data1 = { customer_name: req.body.cname, amount: req.body.amount };

  let sql = "INSERT INTO bill SET ?";
  // await db.query(queryString).catch(err => {throw err}); 
  let promise = new Promise((resolve, reject) => {

    conn.query(sql, data1, async (err, resultSet) => {
      if (err) reject(err);
      resolve(resultSet);
    });

  });
  let result = await promise;
  console.log(result);
  console.log("hello");

  console.log("done promise");
  let data = { customer_name: req.body.cname, cardno: req.body.cardno, password:req.body.password, amount: req.body.amount };
  console.log(data);
  sql = "INSERT INTO payment SET ?";
  query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
  });

  var billno = 10;
  let s = "select max(billno) 'billno' FROM bill ";
  let promise1 = new Promise((resolve, reject) => {


    query = conn.query(s, async (err, results) => {
      if (err) throw err;
      resolve(results);

      //console.log("billno="+billno)
    });
  });
  let myresult = await promise1;
  billno = myresult[0].billno;
  let o = JSON.parse(req.body.products);

  console.log("biilno=" + billno)

  console.log(o);
  for (x in o) {

    console.log(o[x]);
    let sql = "INSERT INTO bill_items values(" + billno + "," + o[x].product_id + "," + o[x].qty + "," + o[x].product_price + ") ";
    console.log(sql);
    let query = conn.query(sql, data, (err, results) => {
      if (err) throw err;

    });
  }
});

//Gross Total
// app.get('/total', function (req, res) {
//   let sql = "SELECT cart.qty*product.product_price as TOTAL FROM product,cart WHERE product.product_id=cart.product_id";
//   conn.query(sql, (err, results) => {
//     console.log(results,"2222222");
//     if (err) throw err;
//     res.json(results);
//   });
// });

//server listening
app.listen(4200, () => {
  console.log('Server is running at port 4200');
});
