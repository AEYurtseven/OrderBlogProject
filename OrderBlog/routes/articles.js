const request = require('request')
const express = require('express')
const Article = require('./../models/article')
const fetch = require("node-fetch");

const router = express.Router()

let myOrderObj = ""



router.get('/showItem', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/showItem', { articles: articles })
})


router.get('/new', (req, res) => {
  res.render('articles/new', { article: new Article() })
})

router.get('/API', async (req, res) => {
  //res.render('articles/API', { article: new Article()  })
  console.log("/fetch info end point called");
  const url = "http://localhost:3500/orders";
  const options = {
    "method" : "GET",
  };

  const response = await fetch(url,options)
    .then(res => res.json())
    .catch(e => {
      console.error({
        "message": "oh no",
        error: e,
      });
    });

   // console.log("RESPONSE: ",response[0]);
    my_response = response[0];
   // console.log("RESP: ", my_response)
    console.log(my_response.orderTitle + " " +my_response.orderDescription + " " + my_response.orderMarkDown )
    for (let i = 0; i<response.length;i++){
      let article = new Article({
        title: response[i].orderTitle,
        description: response[i].orderDescription,
        markdown: response[i].orderMarkDown
      });

      try {
        article = await article.save()
        res.redirect(`/articles/${article.id}`)
      }catch(e){
        console.log(e)
      }
    }
    
});




router.get('/edit/:id', async (req, res) => {
  const article = await Article.findById(req.params.id)
  res.render('articles/edit', { article: article })
})

router.get('/:slug', async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug })
  if (article == null) res.redirect('/')
  res.render('articles/show', { article: article })
})

router.post('/', async (req, res, next) => {
  req.article = new Article()
  next()
}, saveArticleAndRedirectAPI())



router.put('/:id', async (req, res, next) => {
  req.article = await Article.findById(req.params.id)
  next()
}, saveArticleAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})



function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article
    article.title = req.body.title
    article.description = req.body.description
    article.markdown = req.body.markdown
    try {
      article = await article.save()
      res.redirect(`/articles/${article.slug}`)
    } catch (e) {
      res.render(`articles/${path}`, { article: article })
    }
  }
}

function saveArticleAndRedirectAPI() {
  return async (req, res) => {
    let article = req.article
    article.title = req.body.title
    article.description = req.body.description
    article.markdown = req.body.markdown
    try {
      article = await article.save()
      res.redirect(`/articles/index`)
    } catch (e) {}
    
  }
}



module.exports = myOrderObj
module.exports = router