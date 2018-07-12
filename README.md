# BoardServeIndy

### Configure

* Set up the following accounts and copy the keys to the `settings.dev.json` file:
  * Facebook login
  * Google login
  * LinkedIn login
  * Algolia
  * Cloudinary
  * Bit.ly
  * Create a random signup token

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
