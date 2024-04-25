# Changelog
## [0.7.0](https://github.com/JonyPlo/teslo-shop-nextjs/compare/v0.6.0...v0.7.0) (2024-04-25)


### Features

* **admin-products:** :sparkles: create page to show all products and manage them ([2ea63c3](https://github.com/JonyPlo/teslo-shop-nextjs/commits/2ea63c361532c663c87aa35734c163a6c1bab7b9))
* **product-admin:** :sparkles: add react hook form in to admin product form ([90c8059](https://github.com/JonyPlo/teslo-shop-nextjs/commits/90c80593a62c72aa79ee19d60282331d985d7422))
* **product-admin:** :sparkles: create product page and form to manage them ([51c6143](https://github.com/JonyPlo/teslo-shop-nextjs/commits/51c61431151db28e32ddcc4214f36948a6f47917))
* **product-admin:** :sparkles: prepare form data to save product in data base ([f556aa6](https://github.com/JonyPlo/teslo-shop-nextjs/commits/f556aa6e3421e64c671b712740803e1556249036))
* **product-admin:** :sparkles: show db categories in admin product form ([a0ef8ea](https://github.com/JonyPlo/teslo-shop-nextjs/commits/a0ef8ea9e867d91916315396d7b971850801fb0c))
* **product-admin:** :sparkles: update product ([f88d0e0](https://github.com/JonyPlo/teslo-shop-nextjs/commits/f88d0e0828c63689ee14e2938fab925ea771d7f7))
* **product-admin:** :sparkles: upload images in cloudinary ([7c973cc](https://github.com/JonyPlo/teslo-shop-nextjs/commits/7c973cc63b69ce65e6d6b0564002ae9a395a2af4))
* **products-admin:** :sparkles: adapt the image component to accept images from different databases ([ee9fee7](https://github.com/JonyPlo/teslo-shop-nextjs/commits/ee9fee70a095b2ec90789f8d10826c921651eacb))
* **products-admin:** :sparkles: add product image mockup in the product admin form ([5f76ea6](https://github.com/JonyPlo/teslo-shop-nextjs/commits/5f76ea6799cd6e12cbc329373c540683d2446ad5))
* **products-admin:** :sparkles: add sizes validations ([6702d91](https://github.com/JonyPlo/teslo-shop-nextjs/commits/6702d91cb69d2c6aabd2bf56993a8280721707b0))
* **products-admin:** :sparkles: create and save products ([5ce02e1](https://github.com/JonyPlo/teslo-shop-nextjs/commits/5ce02e141def9758504f82b2a494bd0de04beae5))
* **products-admin:** :sparkles: delete images in database and cloudinary ([516f5d7](https://github.com/JonyPlo/teslo-shop-nextjs/commits/516f5d796157ef0b51b6069d23fbe34b7a839fa1))
* **users-maintenance:** :sparkles: create users maintenance page and add pagination ([47a9c3a](https://github.com/JonyPlo/teslo-shop-nextjs/commits/47a9c3a8722d65554deb806e90c1ed8b1ae2a827))
* **users:** :sparkles: add functionality to change users role in admin panel ([71995f9](https://github.com/JonyPlo/teslo-shop-nextjs/commits/71995f99913cbe81835458f4ed5ecbb41cba44f1))


### Bug Fixes

* :bug: fix some bugs that did not allow images to be displayed on some pages ([55a7489](https://github.com/JonyPlo/teslo-shop-nextjs/commits/55a74899c350c81dff85d96dc0729572ccef635d))

## [0.6.0](https://github.com/JonyPlo/teslo-shop-nextjs/compare/v0.5.0...v0.6.0) (2024-04-19)


### Features

* **payments:** :closed_lock_with_key: add environment variables to get transaction information ([954a097](https://github.com/JonyPlo/teslo-shop-nextjs/commits/954a097a87eaac9550179c2397761118393ca5a2))
* **payments:** :necktie: update order model in prisma to save transaction id ([ae9c0f9](https://github.com/JonyPlo/teslo-shop-nextjs/commits/ae9c0f99b97e579987ead8882867af81ee32a7d6))
* **payments:** :sparkles: add action to verify payment in paypal ([363b5f6](https://github.com/JonyPlo/teslo-shop-nextjs/commits/363b5f63a2bbcf7a1663e4ab6a6b67754b1c1e5c))
* **payments:** :sparkles: add an action to set paypal transaction id in the related order ([fe3f16c](https://github.com/JonyPlo/teslo-shop-nextjs/commits/fe3f16c1f817db6ab144b1687808ff730a237880))
* **payments:** :sparkles: add paypal provider and button pay in order pages ([dfbeb26](https://github.com/JonyPlo/teslo-shop-nextjs/commits/dfbeb2643550eea7946ff343125058a1073a760e))
* **payments:** :sparkles: add skeleton loader to show in order page while paypal button is pending ([7b86b3b](https://github.com/JonyPlo/teslo-shop-nextjs/commits/7b86b3b1dae16b309e320ff4ba322e43cbab3d78))
* **payments:** :sparkles: create papal check payment action to verify order payment ([f82e290](https://github.com/JonyPlo/teslo-shop-nextjs/commits/f82e290485778e4d0d25b71e5917703a9b06abae))
* **payments:** :sparkles: finish server action to get access token in paypal ([a1147ee](https://github.com/JonyPlo/teslo-shop-nextjs/commits/a1147ee6bd994be93f10a0b6af42fc974d1d1763))
* **payments:** :sparkles: finish the implementation of paypal to pay for orders ([1b2b86c](https://github.com/JonyPlo/teslo-shop-nextjs/commits/1b2b86cdc3bc630537e210d8c1587051062a7bcc))
* **payments:** :sparkles: get PayPal transaction id ([808deab](https://github.com/JonyPlo/teslo-shop-nextjs/commits/808deab90550851a53cb4499e3643be92470fa89))

## [0.5.0](https://github.com/JonyPlo/teslo-shop-nextjs/compare/v0.4.0...v0.5.0) (2024-04-15)


### Features

* **address-page:** :sparkles: add address schema in prisma and create server action to manage it ([f11e74f](https://github.com/JonyPlo/teslo-shop-nextjs/commits/f11e74f8c01b1beb4d002d6f40f72c0290c8a67b))
* **address-page:** :sparkles: add countries in address form ([ec48c23](https://github.com/JonyPlo/teslo-shop-nextjs/commits/ec48c230fc5d0cf99cdd4bf8c8233b75f3edcb4f))
* **address-page:** :sparkles: add validations in address form ([90f9738](https://github.com/JonyPlo/teslo-shop-nextjs/commits/90f97386a6e476cf8730c99278d9af622b92ed62))
* **address-page:** :sparkles: make the remember address checkbox functional ([9519852](https://github.com/JonyPlo/teslo-shop-nextjs/commits/9519852c3b82cbde1b468a94dcf3c9d5fe6a9972))
* **checkout-page:** :seedling: add order in seed database file to delete them when seed is executed ([620a521](https://github.com/JonyPlo/teslo-shop-nextjs/commits/620a521f6922a76ecf5f8ac5fd39154d1cc74f72))
* **checkout-page:** :sparkles: add order address in prisma transactions ([deccee1](https://github.com/JonyPlo/teslo-shop-nextjs/commits/deccee17c7b59fb0315ad1913ae52ebe6959c006))
* **checkout-page:** :sparkles: create place order action to calculate product totals ([1508fb3](https://github.com/JonyPlo/teslo-shop-nextjs/commits/1508fb35d07c2d69cebe47a0a8b2055402fab99a))
* **checkout-page:** :sparkles: create place order and redirect user to the order page ([d032206](https://github.com/JonyPlo/teslo-shop-nextjs/commits/d032206b5610475e3e13447d32382bd23e25bd37))
* **checkout-page:** :sparkles: finish place order action in checkout page ([755caf6](https://github.com/JonyPlo/teslo-shop-nextjs/commits/755caf64f4b21a57c5dd5428ac397b364d8f982e))
* **checkout-page:** :sparkles: prepare order data and create order schema in prisma to migrate them ([a2d7f39](https://github.com/JonyPlo/teslo-shop-nextjs/commits/a2d7f39c42201770b44fc707938a6ec721934c1b))
* **checkout-page:** :sparkles: replace static html with dynamic user data and store cart ([e118222](https://github.com/JonyPlo/teslo-shop-nextjs/commits/e1182225e33bf46334126df59d5acce05e7c4684))
* **checkout-page:** :sparkles: start creating order transactions with prisma ([97004a0](https://github.com/JonyPlo/teslo-shop-nextjs/commits/97004a031dd50293ccfac2ee6492fcf0ed753ce9))
* **order-page:** :sparkles: add actual data in the table of orders page ([89b3367](https://github.com/JonyPlo/teslo-shop-nextjs/commits/89b3367e68afd76b47c167f024c99f1645953f74))
* **order-page:** :sparkles: add pagination in orders page ([92137b1](https://github.com/JonyPlo/teslo-shop-nextjs/commits/92137b1fadcd36aec68d8544a4de5d917c5b155d))
* **order-page:** :sparkles: add real data to the items on the order page ([724936a](https://github.com/JonyPlo/teslo-shop-nextjs/commits/724936a6739ab9baafb6b6afceba0e622ba73ee1))
* **seed:** :seedling: add countries seed file ([efbe6ed](https://github.com/JonyPlo/teslo-shop-nextjs/commits/efbe6ed79051e79069bbcc40ce2898515d1cd159))


### Bug Fixes

* fix format ([81d2eae](https://github.com/JonyPlo/teslo-shop-nextjs/commits/81d2eae80d41471a48ae08a27b499fcb72a55b8e))

## [0.4.0](https://github.com/JonyPlo/teslo-shop-nextjs/compare/v0.3.0...v0.4.0) (2024-04-04)


### Features

* :sparkles: add product stock label en cart page and sync db stock with local stock ([9d0f209](https://github.com/JonyPlo/teslo-shop-nextjs/commits/9d0f209f2430c2c29ee2b5a50302d62aa0accde8))
* **atuh:** :passport_control: add authorized middleware to protect authorized routes ([c20f20d](https://github.com/JonyPlo/teslo-shop-nextjs/commits/c20f20d4d7a0c1cf12b8240ed955357c755d87da))
* **auth:** :passport_control: add jwt and session callbacks in auth.config file to modify auth data ([168d350](https://github.com/JonyPlo/teslo-shop-nextjs/commits/168d350a4a47a26af34cc2d4ce8cc4b79b36fe15))
* **auth:** :passport_control: add login invalid credential message in form ([93ea417](https://github.com/JonyPlo/teslo-shop-nextjs/commits/93ea41732123ee882942c39ec5753ebf04f62992))
* **auth:** :passport_control: add logout action in logout button to close session ([d0ed91d](https://github.com/JonyPlo/teslo-shop-nextjs/commits/d0ed91dc8557e375c3fb933d8fe4786ad05826fb))
* **auth:** :passport_control: add nextauth provider and show or hide log in button ([ab3dbf7](https://github.com/JonyPlo/teslo-shop-nextjs/commits/ab3dbf7769a1301f7064139179fdab571955929f))
* **auth:** :passport_control: add react hook form validations with zod schema in register form ([06f3be3](https://github.com/JonyPlo/teslo-shop-nextjs/commits/06f3be37cc60e03883cf0876ce2e9594f5111d76))
* **auth:** :passport_control: redirect the user to the home page after login ([418d81b](https://github.com/JonyPlo/teslo-shop-nextjs/commits/418d81b08745de69897871f3af14817b3a5cb305))
* **auth:** :passport_control: register and login user ([1768ddd](https://github.com/JonyPlo/teslo-shop-nextjs/commits/1768ddd005b30c65920542d41d5bd2586e186c09))
* **auth:** :passport_control: show login in server component ([4138a2a](https://github.com/JonyPlo/teslo-shop-nextjs/commits/4138a2aeeecb19ca9495906f51b3185a0584264c))
* **auth:** :sparkles: add auth config file ([78f5fad](https://github.com/JonyPlo/teslo-shop-nextjs/commits/78f5fad7d47f55353d1e77a13022807149baa1b0))
* **auth:** :sparkles: add users seed to introduce these data in database ([b8b5ed5](https://github.com/JonyPlo/teslo-shop-nextjs/commits/b8b5ed5469f5c09c1f366847711bb58c7a87b8b4))
* **auth:** :sparkles: connect login form with login server action ([604ff58](https://github.com/JonyPlo/teslo-shop-nextjs/commits/604ff58f972fe0b9aec2f515b6a7258c6a365a4f))
* **auth:** :sparkles: create prisma schema for users ([f9cfce7](https://github.com/JonyPlo/teslo-shop-nextjs/commits/f9cfce75f7664cc67cd226b8b27fc64c39a44a29))
* **home-page:** :lipstick: add fade in-out animation in images of home page ([59d0b7a](https://github.com/JonyPlo/teslo-shop-nextjs/commits/59d0b7a2854917628cc7d9930e93b00aeee9a5d5))


### Bug Fixes

* change clsx for cn funcion ([86a95cb](https://github.com/JonyPlo/teslo-shop-nextjs/commits/86a95cba539e4b858b884109b4bd5c01f6e25af9))

## [0.3.0](https://github.com/JonyPlo/teslo-shop-nextjs/compare/v0.2.0...v0.3.0) (2024-03-19)

- feat: :sparkles: add layout of login and register page ([a19204f](https://github.com/JonyPlo/teslo-shop-nextjs/commit/a19204f))
- feat: :sparkles: show products in cart quantity in cart icon on top menu component ([6b7d75c](https://github.com/JonyPlo/teslo-shop-nextjs/commit/6b7d75c))
- feat: :wrench: install conventional changelog ([d57b219](https://github.com/JonyPlo/teslo-shop-nextjs/commit/d57b219))
- feat: add products grid in the home page ([f34bb39](https://github.com/JonyPlo/teslo-shop-nextjs/commit/f34bb39))
- feat: finish creating the product grid ([281a16c](https://github.com/JonyPlo/teslo-shop-nextjs/commit/281a16c))
- feat: se hicieron cambios ([625a457](https://github.com/JonyPlo/teslo-shop-nextjs/commit/625a457))
- feat: show products in the grid to the home page ([90542b1](https://github.com/JonyPlo/teslo-shop-nextjs/commit/90542b1))
- feat(cart-page): :sparkles: add money format ([4901901](https://github.com/JonyPlo/teslo-shop-nextjs/commit/4901901))
- feat(cart-page): :sparkles: delete elements in cart page and add some extra config ([cb4df65](https://github.com/JonyPlo/teslo-shop-nextjs/commit/cb4df65))
- feat(cart-page): :sparkles: redirect user to empty page if cart is empty ([ff58bb4](https://github.com/JonyPlo/teslo-shop-nextjs/commit/ff58bb4))
- feat(cart-page): :sparkles: show order summary information in cart page ([88dabaa](https://github.com/JonyPlo/teslo-shop-nextjs/commit/88dabaa))
- feat(cart): :sparkles: add cart products in localstorage and make them presist with zustand ([a7d82a5](https://github.com/JonyPlo/teslo-shop-nextjs/commit/a7d82a5))
- feat(cart): :sparkles: add toast animation when product is added to cart ([b687a9d](https://github.com/JonyPlo/teslo-shop-nextjs/commit/b687a9d))
- feat(cart): :sparkles: complete the layout of the shopping cart page ([05dfcb7](https://github.com/JonyPlo/teslo-shop-nextjs/commit/05dfcb7))
- feat(categories): add categories filter by id ([9c5e22c](https://github.com/JonyPlo/teslo-shop-nextjs/commit/9c5e22c))
- feat(category): create not found component ([89c0a06](https://github.com/JonyPlo/teslo-shop-nextjs/commit/89c0a06))
- feat(category): end 404 error page ([0c0b790](https://github.com/JonyPlo/teslo-shop-nextjs/commit/0c0b790))
- feat(checkout): :sparkles: add check order page ([3749f18](https://github.com/JonyPlo/teslo-shop-nextjs/commit/3749f18))
- feat(checkout): :sparkles: add client address form to the page ([d9eb5ff](https://github.com/JonyPlo/teslo-shop-nextjs/commit/d9eb5ff))
- feat(footer): :sparkles: add layout footer ([b4eab4d](https://github.com/JonyPlo/teslo-shop-nextjs/commit/b4eab4d))
- feat(order): :sparkles: add layout order page and empty cart page ([3c1154f](https://github.com/JonyPlo/teslo-shop-nextjs/commit/3c1154f))
- feat(pagination): :sparkles: add pagination logic and layout ([7f463cb](https://github.com/JonyPlo/teslo-shop-nextjs/commit/7f463cb))
- feat(pagination): :sparkles: create dynamic pagination to show numbers in the ui ([3ca82dd](https://github.com/JonyPlo/teslo-shop-nextjs/commit/3ca82dd))
- feat(pagination): :sparkles: finish pagination functionality y gender products ([0c3941d](https://github.com/JonyPlo/teslo-shop-nextjs/commit/0c3941d))
- feat(pagination): :sparkles: make the pagination functional ([8fde7f2](https://github.com/JonyPlo/teslo-shop-nextjs/commit/8fde7f2))
- feat(product-page): :sparkles: add dynamic metadata ([5bf4b0d](https://github.com/JonyPlo/teslo-shop-nextjs/commit/5bf4b0d))
- feat(product-page): :sparkles: replace seed product information by database product information ([719b55f](https://github.com/JonyPlo/teslo-shop-nextjs/commit/719b55f))
- feat(product-page): :sparkles: take product stock by client component ([094e31a](https://github.com/JonyPlo/teslo-shop-nextjs/commit/094e31a))
- feat(product-page): start layout of prduct page ([b713187](https://github.com/JonyPlo/teslo-shop-nextjs/commit/b713187))
- feat(product-pagge): :sparkles: add dynamic stock info and button to add in cart ([f66e937](https://github.com/JonyPlo/teslo-shop-nextjs/commit/f66e937))
- feat(product): :sparkles: add message error if user doesnt selec a product size ([4b8218f](https://github.com/JonyPlo/teslo-shop-nextjs/commit/4b8218f))
- feat(product): :sparkles: add quantity layout ([af5f3eb](https://github.com/JonyPlo/teslo-shop-nextjs/commit/af5f3eb))
- feat(product): :sparkles: add size selector layout ([3613239](https://github.com/JonyPlo/teslo-shop-nextjs/commit/3613239))
- feat(product): :sparkles: add slideshow to show product images ([b4b2793](https://github.com/JonyPlo/teslo-shop-nextjs/commit/b4b2793))
- feat(products): :sparkles: add products from database ([8896635](https://github.com/JonyPlo/teslo-shop-nextjs/commit/8896635))
- feat(SEO): :mag: add image open graph and others config for SEO ([55fddcd](https://github.com/JonyPlo/teslo-shop-nextjs/commit/55fddcd))
- feat(shop): add title component in the shop ([6f20c6e](https://github.com/JonyPlo/teslo-shop-nextjs/commit/6f20c6e))
- feat(side-menu): create side menu ([fdd8e20](https://github.com/JonyPlo/teslo-shop-nextjs/commit/fdd8e20))
- feat(ui): :sparkles: add top menu component ([1313628](https://github.com/JonyPlo/teslo-shop-nextjs/commit/1313628))
- feat(ui): finish side bar mockup ([f7568e7](https://github.com/JonyPlo/teslo-shop-nextjs/commit/f7568e7))
- test: prueba ([5483ec0](https://github.com/JonyPlo/teslo-shop-nextjs/commit/5483ec0))
- refactor: :recycle: improve clean code and architecture y some files ([0de2b5e](https://github.com/JonyPlo/teslo-shop-nextjs/commit/0de2b5e))
- refactor: :recycle: improve code moving magic strings into constants ([0cea80b](https://github.com/JonyPlo/teslo-shop-nextjs/commit/0cea80b))
- refactor(zustand): :recycle: change useState to zustand in some product components ([db3d47c](https://github.com/JonyPlo/teslo-shop-nextjs/commit/db3d47c))
- refactor(zustand): :recycle: refator zustand store to slices and bound store ([eb8b6fa](https://github.com/JonyPlo/teslo-shop-nextjs/commit/eb8b6fa))
- fix: :adhesive_bandage: fix footer to keep it down ([d897710](https://github.com/JonyPlo/teslo-shop-nextjs/commit/d897710))
- fix: :adhesive_bandage: remove sleep funtion to the get stock action ([38f56be](https://github.com/JonyPlo/teslo-shop-nextjs/commit/38f56be))
- fix: :ambulance: resolve problems with products pagination ([b0ca2a4](https://github.com/JonyPlo/teslo-shop-nextjs/commit/b0ca2a4))
- fix(pagination): :bug: fix pagination number in a conditional ([40264b7](https://github.com/JonyPlo/teslo-shop-nextjs/commit/40264b7))
- chore: :wrench: add prettier config on lint staged ([a7568b1](https://github.com/JonyPlo/teslo-shop-nextjs/commit/a7568b1))
- chore(docker): :sparkles: add postgres database with docker compose ([e211941](https://github.com/JonyPlo/teslo-shop-nextjs/commit/e211941))
- chore(prisma): :necktie: add Prisma models and migrate them in data base ([8497d29](https://github.com/JonyPlo/teslo-shop-nextjs/commit/8497d29))
- chore(prisma): :seedling: update seed file and add delete tables ([f8dd168](https://github.com/JonyPlo/teslo-shop-nextjs/commit/f8dd168))
- chore(prisma): :sparkles: install prisma dependency ([ac46f02](https://github.com/JonyPlo/teslo-shop-nextjs/commit/ac46f02))
- chore(prisma): update seed file ([86ca20d](https://github.com/JonyPlo/teslo-shop-nextjs/commit/86ca20d))
- chore(readme): :memo: update readme file ([d58704b](https://github.com/JonyPlo/teslo-shop-nextjs/commit/d58704b))
- chore(seed): :seedling: add seed file ([c43a91f](https://github.com/JonyPlo/teslo-shop-nextjs/commit/c43a91f))
- chore(seed): :seedling: seed file done ([2d9ca71](https://github.com/JonyPlo/teslo-shop-nextjs/commit/2d9ca71))
- perf: :zap: add route segments to revalidate products each 60 seconds ([53231d4](https://github.com/JonyPlo/teslo-shop-nextjs/commit/53231d4))
- style(pagination): :lipstick: correct some styles in products grid and pagination ([a1224fd](https://github.com/JonyPlo/teslo-shop-nextjs/commit/a1224fd))

## [0.2.0](https://github.com/JonyPlo/teslo-shop-nextjs/releases/tag/v0.2.0) (2024-01-28)

- 0.2.0 ([1fad2bd](https://github.com/JonyPlo/teslo-shop-nextjs/commit/1fad2bd))
- Initial commit from Create Next App ([e7f41f2](https://github.com/JonyPlo/teslo-shop-nextjs/commit/e7f41f2))
- chore: :heavy_plus_sign: install husky and commitlint ([b32055f](https://github.com/JonyPlo/teslo-shop-nextjs/commit/b32055f))
- chore: :wrench: configure commitlint file ([e411edd](https://github.com/JonyPlo/teslo-shop-nextjs/commit/e411edd))
- chore: install conventional changelog ([5f9d333](https://github.com/JonyPlo/teslo-shop-nextjs/commit/5f9d333))
- feat: :sparkles: create basic page structure ([b88f225](https://github.com/JonyPlo/teslo-shop-nextjs/commit/b88f225))
