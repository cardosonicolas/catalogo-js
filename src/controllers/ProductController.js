const productCtrl = {};
const Product = require("../database/models/Product");
const cloudinary = require("../libs/cloudinary");

productCtrl.renderAllprod = (req, res) => {
  Product.findAll().then((prods) => {
    if (req.path === "/add") {
      res.render("productos", { prods });
    } else {
      res.render("index", { prods });
    }
  });
};

productCtrl.createProd = async (req, res) => {
  let img = {};
  if (req.file != null) {
    img = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "catalogo_js",
    });
  }
  await Product.create({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    imageUrl: img.secure_url,
    publicId: img.public_id,
    userId: req.user.id,
    state: false,
  });
  req.flash("success_msg", "Producto agregado");
  res.redirect("/add");
};

productCtrl.findByPK = (req, res) => {
  Product.findByPk(req.params.id).then((prod) => {
    if (req.path === `/prod/${req.params.id}`) {
      res.render("card", { prod });
    } else {
      res.render("edit", { prod });
    }
  });
};

//Hacer funcionar
productCtrl.updateProd = (req, res) => {
  let img = {};
  Product.findByPk(req.params.id)
    .then(async (prod) => {
      prod.title = req.body.title;
      prod.price = req.body.price;
      prod.description = req.body.description;

      if (req.file != null) {
        await cloudinary.v2.uploader.destroy(prod.publicId);
        img = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "catalogo_js",
        });
        prod.imageUrl = img.secure_url;
        prod.publicId = img.public_id;
      }
      prod.save();
      req.flash("success_msg", "Producto actualizado");
    })
    .catch(() => {
      req.flash("error_msg", "Sucedio un error");
    });
  res.redirect("/add");
};

productCtrl.deleteProd = (req, res) => {
  Product.findByPk(req.params.id)
    .then(async (prod) => {
      if (prod.publicId != null) {
        await cloudinary.v2.uploader.destroy(prod.publicId);
      }
      prod.destroy();
    })
    .then((prod) => {
      res.render("productos", { prod });
      req.flash("success_msg", "Producto Eliminado");
      res.redirect("/add");
    });
};

productCtrl.stateChange = (req, res) => {
  Product.findByPk(req.params.id)
    .then((prod) => {
      if (prod.state) {
        prod.state = false;
        req.flash("success_msg", "Producto Deshabilitado");
      } else {
        prod.state = true;
        req.flash("success_msg", "Producto Habilitado");
      }
      prod.save();
    })
    .then((prod) => {
      res.render("productos", { prod });
      res.redirect("/add");
    });
};

module.exports = productCtrl;
