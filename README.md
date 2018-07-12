# BoardServeIndy

### Configure

* Using `example.settings.json` as a template, set up the following accounts and save it as `settings.dev.json`:
  * Algolia (https://www.algolia.com/)
  * Cloudinary (https://cloudinary.com/)
  * Bitly (https://bitly.com/)
  * Create a random signup token (any string is fine!)

### Install and Run

```
$ meteor npm i
$ meteor
```

### Deploy

- Any merges to master will trigger a deploy to staging. 
- Once staging is verified as working, you can promote to prod on the heroku website or using `heroku pipelines:promote`

### Deploy Debugging

- `heroku logs` is your friend.

### Questions

Send questions to `benwencke@gmail.com`
