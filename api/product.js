// api/product.js
export default function handler(req, res) {
  try {
    const { url } = req.query;

    if (!url) {
      res.status(400).json({ 
        status: "error",
        message: "Missing 'url' query parameter"
      });
      return;
    }

    const productData = {
      id: 1,
      name: "Produk Contoh",
      price: 100000,
      url: url,
      description: "Ini adalah contoh data produk dari API"
    };

    res.status(200).json({
      status: "success",
      data: productData
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
}
