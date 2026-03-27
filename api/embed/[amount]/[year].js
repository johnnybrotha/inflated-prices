export default function handler(req, res) {
    const { amount, year } = req.query;
    // Quick demo: hardcode CPI-adjusted value for testing
    const adjusted = parseInt(amount) * 1.24; 
  
    res.setHeader('Content-Type', 'text/html');
    res.send(`
      <html>
        <EmbedPage amount={amount} year={year} />
        // <body style="margin:0; font-family:sans-serif; font-size:14px;">
        //   $${amount} (${year}) → $${adjusted.toFixed(0)} today
        // </body>
      </html>
    `);
  }




  export default function EmbedPage({ amount, year }) {
    const adjusted = Math.round(amount * 1.24); // Example inflation calculation
    const title = `$${amount} (${year}) → $${adjusted} today`;
  
    return (
      <>
        <head>
          {/* Open Graph for Discord / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content="Inflation-adjusted value of money." />
          <meta property="og:image" content="https://inflated-prices.vercel.app/preview.png" />
          <meta property="og:url" content={`https://inflated-prices.vercel.app/embed/${amount}/${year}`} />
  
          <title>{title}</title>
        </head>
  
        {/* Actual content for iframe / browser */}
        <body style={{ margin: 0, fontFamily: "sans-serif", fontSize: "16px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "8px 12px",
              backgroundColor: "#f0f0f0",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          >
            {title}
          </div>
        </body>
      </>
    );
  }
  