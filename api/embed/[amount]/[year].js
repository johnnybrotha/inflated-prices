
// export default function handler(req, res) {
//     const { amount, year } = req.query;
//     // Quick demo: hardcode CPI-adjusted value for testing
//     const adjusted = parseInt(amount) * 1.24; 
  
//     res.setHeader('Content-Type', 'text/html');
//     res.send(`
//       <html>
//         <body style="margin:0; font-family:sans-serif; font-size:14px;">
//           $${amount} (${year}) → $${adjusted.toFixed(0)} today
//         </body>
//       </html>
//     `);
//   }

export default function handler(req, res) {
    const { amount, year } = req.query;
  
    if (!amount || !year) {
      return res.status(400).send("Missing amount or year");
    }
  
    // Quick demo: hardcode CPI-adjusted value for testing
    const adjusted = parseInt(amount) * 1.24;
  
    res.setHeader('Content-Type', 'text/html');
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>$${amount} (${year}) → $${adjusted.toFixed(0)} today</title>
  
          <!-- Open Graph tags for Discord / Facebook / LinkedIn -->
          <meta property="og:type" content="website" />
          <meta property="og:title" content="$${amount} (${year}) → $${adjusted.toFixed(0)} today" />
          <meta property="og:description" content="Inflation-adjusted value of money." />
          <meta property="og:image" content="https://inflated-prices.vercel.app/preview.png" />
          <meta property="og:url" content="https://inflated-prices.vercel.app/embed/${amount}/${year}" />
        </head>
        <body style="margin:0; font-family:sans-serif; font-size:14px;">
          $${amount} (${year}) → $${adjusted.toFixed(0)} today
        </body>
      </html>
    `);
  }





  