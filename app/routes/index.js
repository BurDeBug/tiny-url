'use strict';


module.exports = function(app, db, random) {

   var collection = db.collection('urls')
   var randomNum = random;


   app.route('/new/http://:url')
      .get(function(req, res) {

         if (/((http?):\/\/)www.[a-z0-9\-\.]{3,}\.([a-z]{2}||[a-z]{3})$/.test('http://' + req.params.url)) {

            var value;

            collection.find({}, {
               'original_url': 0,
               'tiny_url': 0
            }).toArray(function(err, data) {
               value = randomNum.integer(1000, 9999);
               for (var i = 0; i < data.length; i++) {

                  if (data[i].uniqueVal == value) {
                     i = 0;

                     value = randomNum.integer(1000, 9999);
                  }

               }

               collection.insert({
                  uniqueVal: value,
                  'original_url': 'http://' + req.params.url,
                  'tiny_url': 'https://tiny-url-burdebug.c9users.io/' + value
               }, function(err, data) {

                  if (err)
                     throw err
                  res.json({
                     'original_url': 'http://' + req.params.url,
                     'tiny_url': 'https://tiny-url-burdebug.c9users.io/' + value
                  })
               })
            })
         }
         else
            res.json({
               'message': 'invalid-url'
            })
      })

   app.route('/new/https://:url')
      .get(function(req, res) {

         if (/((https?):\/\/)www.[a-z0-9\-\.]{3,}\.([a-z]{2}||[a-z]{3})$/.test('http://' + req.params.url)) {


            var value;

            collection.find({}, {
               'original_url': 0,
               'tiny_url': 0
            }).toArray(function(err, data) {
               value = randomNum.integer(1000, 9999);
               for (var i = 0; i < data.length; i++) {

                  if (data[i].uniqueVal == value) {
                     i = 0;
                     console.log('now')
                     value = randomNum.integer(1000, 9999);
                  }

               }

               collection.insert({
                  uniqueVal: value,
                  'original_url': 'https://' + req.params.url,
                  'tiny_url': 'https://tiny-url-burdebug.c9users.io/' + value
               }, function(err, data) {

                  if (err)
                     throw err
                  res.json({
                     'original_url': 'https://' + req.params.url,
                     'tiny_url': 'https://tiny-url-burdebug.c9users.io/' + value
                  })
               })
            })
         }
         else
            res.json({
               'message': 'invalid-url'
            })


      })

   app.route('/list').get(function(req, res) {
      collection.find({}).toArray(function(err, data) {
         if (err)
            throw err
         res.json(data);
      })

   })

   app.route('/clear').get(function(req, res) {
      collection.remove({});
      res.send();
   })

   app.route('/favicon.ico').get(function(req, res) {
      res.send('favicon')
   })

   app.route('/:val').get(function(req, res) {

      collection.find({
         'uniqueVal': parseInt(req.params.val)
      }).toArray(function(err, data) {

         if (err)
            throw err;

         if (data.length)
            res.redirect(data[0].original_url)
         else
            res.redirect('/')

      })
   })

   app.route('/')
      .get(function(req, res) {
         res.sendFile(process.cwd() + '/public/index.html');
      });
 
};
