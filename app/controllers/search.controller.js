const cheerio = require('cheerio');
const axios = require('axios');

const URL = "https://www.google.com/search?q=";

exports.findAll = (req, res) => {
  const text = req.query.text.trim();

  if (!text) {
    res.status(400).send({
      message: "Text can't be empty."
    });
    return;
  }

  const encodedString = encodeURI(text);  
  const AXIOS_OPTIONS = {
    headers: {
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36",
    },
    params: {
        q: encodedString,
        hl: 'pt-br',
        gl: 'pt-br'
    },
  };

  axios.get(URL + text, AXIOS_OPTIONS)
    .then(response => {
      const html = response.data;
      let $ = cheerio.load(html);

      const list = [];
      $('div.MjjYud').each(function(index) {
          const link = $(this).find('div.yuRUbf>a').attr('href');
          const name = $(this).find('div.yuRUbf>a>h3').text();

          if (link != undefined && name != undefined) {
            const search = {'link': link, 'name': name};
            list.push(search);
          }
      });

      res.send(list);
    }).catch(err => {
      console.log(err);
    });

};
