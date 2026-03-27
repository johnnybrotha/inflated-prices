// export default function handler(req, res) {
//     const { url } = req.query; // e.g., url=https://yourtool.com/i/100/2020

//     const match = url.match(/\/i\/(\d+)\/(\d+)/); //could this be causing url.parse warning?
//     const imageMatch = url.match(/\/i\/image/);
//     const linkMatch = url.match(/\/i\/link/);
    
//     if (match) {
//         const amount = match[1];
//         const year = match[2];

//         res.status(200).json({
//         type: "rich",
//         version: "1.0",
//         provider_name: "InflationEmbed",
//         provider_url: "https://inflated-prices.vercel.app", //TODO: what does this do
//         title: `$${amount} (${year}) → ??? today`,
//         html: `<iframe src="https://inflated-prices.vercel.app/api/embed/${amount}/${year}" width="200" height="40" style="border:none;"></iframe>`,
//         cache_age: 1, // TODO: change this
//         width: 200,
//         height: 40
//         });
//     } else if (imageMatch) {
//         res.status(200).json({
//             type: "image",
//             version: "1.0",
//             url: "https://cdn11.bigcommerce.com/s-3uewkq06zr/images/stencil/1280x1280/products/230/406/blue_b__05623.1492487362.png",
//             width: 200,
//             height: 200
//         });
//     } else if (linkMatch) {
//         res.status(200).json({
//             type: "link",
//             version: "1.0",
//             url: "https://www.google.com",
//             title: "Google",
//             author_name: "Jonathan",
//         });
//     }
//      else {
//         return res.status(400).json({ error: "Invalid URL format" });
//     }
// }

    




  //TODO: make opengraph fallback cards work
  //https://inflated-prices-5oge9ii6b-johnnybrothas-projects.vercel.app/api/oembed?url=/i/100/2020




  //gpt copy
  export default function handler(req, res) {
    const { url } = req.query;
  
    if (!url) {
      return res.status(400).json({ error: "Missing url param" });
    }
  
    // Normalize: handle both full URLs and relative paths
    let pathname;
    try {
      const parsed = new URL(url, "https://inflated-prices.vercel.app");
      pathname = parsed.pathname;
    } catch {
      return res.status(400).json({ error: "Invalid URL" });
    }
  
    // Match patterns
    const valueMatch = pathname.match(/^\/i\/(\d+)\/(\d+)$/);
    const imageMatch = pathname === "/i/image";
    const linkMatch = pathname === "/i/link";
  
    if (valueMatch) {
      const amount = valueMatch[1];
      const year = valueMatch[2];
  
      return res.status(200).json({
        type: "rich",
        version: "1.0",
        provider_name: "InflationEmbed",
        provider_url: "https://inflated-prices.vercel.app",
        title: `$${amount} (${year}) → ??? today`,
        html: `<iframe src="https://inflated-prices.vercel.app/api/embed/${amount}/${year}" width="200" height="40" style="border:none;"></iframe>`,
        width: 200,
        height: 40,
        cache_age: 1
      });
  
    } else if (imageMatch) {
      return res.status(200).json({
        type: "photo", // IMPORTANT: use "photo", not "image"
        version: "1.0",
        url: "https://cdn11.bigcommerce.com/s-3uewkq06zr/images/stencil/1280x1280/products/230/406/blue_b__05623.1492487362.png",
        width: 200,
        height: 200
      });
  
    } else if (linkMatch) {
      return res.status(200).json({
        type: "link",
        version: "1.0",
        title: "Google",
        url: "https://www.google.com"
      });
    }
  
    return res.status(400).json({ error: "Invalid URL format" });
  }

//   curl -A "Discordbot/2.0" https://inflated-prices.vercel.app/api/oembed?url=/i/100/2021 -I

//   https://inflated-prices.vercel.app/api/oembed?url=/i/100/2021