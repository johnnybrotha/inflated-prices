export default function handler(req, res) {
    const { url } = req.query; // e.g., url=https://yourtool.com/i/100/2020
    res.status(200).json({
      type: "rich",
      version: "1.0",
      provider_name: "InflationEmbed",
      provider_url: "https://yourtool.com",
      title: "$100 (2020) → $124 today",
      html: `<iframe src="https://yourtool.com/embed/100/2020" width="200" height="40" style="border:none;"></iframe>`,
      width: 200,
      height: 40
    });
  }