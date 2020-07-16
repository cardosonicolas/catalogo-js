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
productCtrl.updateProd = async (req, res) => {
  let img = {};
  if (req.file != null) {
    img = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "catalogo_js",
    });
  }

  await Product.update(
    {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      imageUrl: img.secure_url,
      publicId: img.public_id,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  req.flash("success_msg", "Producto actualizado");
  res.redirect("/add");
};

productCtrl.deleteProd = (req, res) => {
  Product.findByPk(req.params.id)
    .then(async (prod) => {
      console.log(prod.publicId);
      if (prod.publicId != null) {
        await cloudinary.v2.uploader.destroy(prod.publicId);
        prod.destroy();
      } else {
        prod.destroy();
      }
    })
    .then((prod) => {
      res.render("productos", { prod });
      req.flash("success_msg", "Producto Eliminado");
      res.redirect("/add");
    });
};

productCtrl.stateChange = (req, res) => {
  Product.findByPk(req.params.id)
    .then(async (prod) => {
      console.log(prod.publicId);
      if (prod.state) {
        prod.state = false;
        prod.save();
        req.flash("success_msg", "Producto Deshabilitado");
      } else {
        prod.state = true;
        prod.save();
        req.flash("success_msg", "Producto Habilitado");
      }
    })
    .then((prod) => {
      res.render("productos", { prod });
      res.redirect("/add");
    });
};

module.exports = productCtrl;
