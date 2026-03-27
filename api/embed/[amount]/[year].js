import EmbedPage from '../../../htmlCreator';

export default function handler(req, res) {
    const { amount, year } = req.query;
    // Quick demo: hardcode CPI-adjusted value for testing
    const adjusted = parseInt(amount) * 1.24; 
  
    res.setHeader('Content-Type', 'text/html');
    res.send(`
      <html>
        ${require('react-dom/server').renderToStaticMarkup(
            EmbedPage({ amount: parseInt(amount), year: parseInt(year) })
        )}
        // <body style="margin:0; font-family:sans-serif; font-size:14px;">
        //   $${amount} (${year}) → $${adjusted.toFixed(0)} today
        // </body>
      </html>
    `);
  }





  