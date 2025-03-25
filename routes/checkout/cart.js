module.exports = (app) => {
  app.get('/cart', (req, res) => {
    let success; const warning = app.helpers.msg(req);
    const connection = app.dao.connectionFactory();
    const productsDao = new app.dao.productsDAO(connection);

    // Get list of ID of product in cart
    const productsInCartIds = req.cookies['productsInCart'] || [];

    // Check if cart is empty
    if (!productsInCartIds || productsInCartIds.length === 0) {
      return res.render('checkout/cart', {
        title: 'Cart',
        warning: 'You do not have items in your cart!',
      });
    }

    productsDao.getById(productsInCartIds)
        .then((products) => {
          res.render('checkout/cart', {
            title: 'Cart',
            success, warning,
            products,
          });
        })
        .catch((err) => console.log(err));
  });
  
  app.get('/add-to-cart/:id', (req, res) => {
    const id = req.params.id;
    
    let cart = req.cookies['productsInCart'] || [];
    
    if (!Array.isArray(cart)) {
      cart = [cart];
    }
    
    if (!cart.includes(id)) {
      cart.push(id);
    }

    res.cookie('productsInCart', cart);
    
    res.redirect(req.get('referer') || '/');
  });

  app.get('/remove-from-cart/:id', (req, res) => {
    const id = req.params.id;
    
    let cart = req.cookies['productsInCart'] || [];
    
    if (!Array.isArray(cart)) {
      cart = [cart];
    }
    
    cart = cart.filter(itemId => itemId !== id);
    
    res.cookie('productsInCart', cart);
    
    res.redirect('/cart');
  });
};