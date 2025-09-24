import fetch from 'node-fetch';

const categories = {
  skincare: [
    "https://vt.tokopedia.com/t/ZSHWYJNDHs1Vh-ZXUMR/",
    "https://vt.tokopedia.com/t/ZSHWYJ69etoDs-0al3v/",
    "https://vt.tokopedia.com/t/ZSHWYJ6xb8ARv-FHNlG/",
    "https://vt.tokopedia.com/t/ZSHWYJhstuWNE-TKH5x/",
    "https://vt.tokopedia.com/t/ZSHWYJSDWyM8d-IFfg0/",
    "https://vt.tokopedia.com/t/ZSHWYJUHaHUHw-eDZhl/",
    "https://vt.tokopedia.com/t/ZSHWYJU7khPVD-ltVY8/"
  ],
  baju: [
    "https://vt.tokopedia.com/t/ZSHWYJyjR3dho-VJ5mt/",
    "https://vt.tokopedia.com/t/ZSHWYJa75g3yh-BrdVh/",
    "https://vt.tokopedia.com/t/ZSHWYJaqPBHkh-KLTZb/",
    "https://vt.tokopedia.com/t/ZSHWYJuqK2xYU-mBFIZ/",
    "https://vt.tokopedia.com/t/ZSHWYJxXuaa36-nNS6a/",
    "https://vt.tokopedia.com/t/ZSHWYJCktwYBm-MzFQn/",
    "https://vt.tokopedia.com/t/ZSHWYJVJyTM4j-9U9iV/"
  ],
  lainlain: [
    "https://vt.tokopedia.com/t/ZSHWYJbfeEchN-Is6Ih/",
    "https://vt.tokopedia.com/t/ZSHWYJgAGL9Et-kp4Hx/",
    "https://vt.tokopedia.com/t/ZSHWYJswyVHEc-haqGj/",
    "https://vt.tokopedia.com/t/ZSHWYJnsBJ3KP-f1EWZ/",
    "https://vt.tokopedia.com/t/ZSHWYJvpMbaH8-rcTSw/",
    "https://vt.tokopedia.com/t/ZSHWYJ3K6otA8-iZ9rh/",
    "https://vt.tokopedia.com/t/ZSHWYJEDfeRuG-1TojP/"
  ]
};

async function fetchProductsFromLinks(links) {
  const products = [];
  for (const link of links) {
    try {
      const response = await fetch(link);
      const html = await response.text();

      const nameMatch = html.match(/\"name\":\"(.*?)\"/);
      const priceMatch = html.match(/\"price\":(\d+)/);
      const soldMatch = html.match(/\"sold\":(\d+)/);
      const imgMatch = html.match(/\"image\":\"(.*?)\"/);

      if (nameMatch && priceMatch && soldMatch && imgMatch) {
        products.push({
          link,
          name: nameMatch[1],
          price: parseInt(priceMatch[1]),
          sold: parseInt(soldMatch[1]),
          image: imgMatch[1]
        });
      }
    } catch (err) {
      console.error("Error fetching", link, err);
    }
  }
  return products;
}

export default async function handler(req, res) {
  const { category } = req.query;
  if (!category || !categories[category]) {
    return res.status(400).json({ error: "Kategori tidak valid" });
  }

  const products = await fetchProductsFromLinks(categories[category]);
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  res.status(200).json(products);
}
