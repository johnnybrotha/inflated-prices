export default function handler(req, res) {
    const { url } = req.query; // e.g., url=https://yourtool.com/i/100/2020

    const match = url.match(/\/i\/(\d+)\/(\d+)/);

    if (!match) {
        return res.status(400).json({ error: "Invalid URL format" });
    }

    const amount = match[1];
    const year = match[2];

    res.status(200).json({
      type: "rich",
      version: "1.0",
      provider_name: "InflationEmbed",
      provider_url: "https://inflated-prices.vercel.app", //TODO: what does this do
      title: `$${amount} (${year}) → ??? today`,
      html: `<iframe src="https://inflated-prices.vercel.app/embed/${amount}/${year}" width="200" height="40" style="border:none;"></iframe>`,
      width: 200,
      height: 40
    });
  }

  //TODO: make opengraph fallback cards work
  //https://inflated-prices-5oge9ii6b-johnnybrothas-projects.vercel.app/api/oembed?url=/i/100/2020