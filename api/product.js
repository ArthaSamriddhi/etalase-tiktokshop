// api/product.js
export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Parameter ?url= diperlukan" });
  }

  try {
    // Ambil halaman produk
    const response = await fetch(url);
    const html = await response.text();

    // --- Scraping sederhana ---
    // Judul produk
    const titleMatch = html.match(/<title.*?>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].replace(/ - TikTok.*/, "").trim() : "Produk TikTok";

    // Gambar utama
    const imageMatch = html.match(/property="og:image"\s*content="(.*?)"/i);
    const image = imageMatch ? imageMatch[1] : null;

    // Harga
    const priceMatch = html.match(/"price":"([\d\.]+)"/i);
    const price = priceMatch ? priceMatch[1] : null;

    // Rating
    const ratingMatch = html.match(/"average_rating":([\d\.]+)/i);
    const rating = ratingMatch ? ratingMatch[1] : null;

    // Terjual
    const soldMatch = html.match(/"sold_count":(\d+)/i);
    const sold = soldMatch ? soldMatch[1] : null;

    // Kirim hasil
    res.status(200).json({
      url,
      title,
      image,
      price,
      rating,
      sold
    });

  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data", details: err.message });
  }
}
