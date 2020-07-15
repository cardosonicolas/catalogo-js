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
  console.log(req.file);
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
  if (req.file != null) {
    //cloudinary.v2.uploader.destroy();
    result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "catalogo_js",
    });

    await Product.update(
      {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        imageUrl: result.secure_url,
        publicId: result.public_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
  }
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

module.exports = productCtrl;
