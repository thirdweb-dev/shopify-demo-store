# thirdweb x Shopify

## Getting Started

First, install the dependencies:

```bash
yarn install

```

Then, run the development server:

```bash
yarn dev
```

## Setup Shopify

### Create a Shopify store

You can create a Shopify store here: https://www.shopify.com/free-trial. You can also use an existing store.

Get all the necessary credentials from your Shopify store and add them to your `.env.local` file and also add them to your deployed environment.

```bash
SHOPIFY_STOREFRONT_ACCESS_TOKEN=
SHOPIFY_STOREFRONT_API_URL=
SHOPIFY_ADMIN_API_URL=
SHOPIFY_ADMIN_ACCESS_TOKEN=
SHOPIFY_WEBHOOK_KEY=
```
### SHOPIFY_STOREFRONT_ACCESS_TOKEN
You need to add the `Headless` app to your store from the shopify app store. Then add it as a sales channel. You can grab the key from the `Private access token` section. It should look like `shpat_...`.

### SHOPIFY_STOREFRONT_API_URL
The url to your store's store api. It should look like `https://your-store.myshopify.com/api/2021-07/graphql.json`. Make sure to change the version of the api to your desired version.

### SHOPIFY_ADMIN_API_URL
The url to your store's admin api. It should look like `https://your-store.myshopify.com/admin/api/2021-07/graphql.json`. Make sure to change the version of the api to your desired version.

### SHOPIFY_ADMIN_ACCESS_TOKEN
You need to create a private app in your store. You can do that by going to `Apps` -> `Apps and sales channels` -> `Develop Apps` -> `Create an app`. Then you need to go to `Configuration` configure the scopes you need, for this template you need read and write to `Orders`, `Products`, `Product Listings`, `Customers`, and `Discounts`. Once that's checked, click save and then Install App. Reveal the Admin API access token and copy it to your `.env.local` file. Make sure to save it somewhere safe, you won't be able to see it again. It should look like `shpat_...`.

### SHOPIFY_WEBHOOK_KEY
You need to create a webhook in your store. Type webhook in the search bar on top of the page and click on `Webhooks`. Scroll down to create a webhook. For this template we are using on 'Order Creation'. The webhook key should be at the bottom of the page, which will be used to verify the webhook came from Shopify.

## Setup thirdweb

### NEXT_PUBLIC_DOMAIN

This is the domain of your thirdweb store. You can start with `localhost:3000` and change it later once your site is live.

### NEXT_PUBLIC_APP_NETWORK

The network your store is gonna work on. We recommend starting with a testnet like `mumbai` and then moving to a mainnet like `ethereum` or `polygon` once you're ready to go live.

### NEXT_PUBLIC_NFT_RECEIPTS_ADDRESS (Optional)

Only add if you want to use NFT receipts.

The address of the NFT receipts contract. You can deploy your own from here: https://thirdweb.com/thirdweb.eth/TokenERC721.

Click "Deploy Now", fill name, image and description and click "Deploy". Once the contract is deployed, copy the address and paste it into your `.env`.local` file.

You can also make the NFTs non-transferable by going to the "Permissions" tab, setting the transfer permissions to "Non-transferable" and saving the changes.

### NEXT_PUBLIC_OPENZEPPELIN_URL (Optional)

Only add if you want the transactions to be gasless (you pay for the gas instead of the user).

You can read more about gasless transactions here: https://portal.thirdweb.com/glossary/gasless-transactions

Once you get your OpenZeppelin Relayer URL, add it to your `.env.local` file. It will look something like `https://api.defender.openzeppelin.com/...`

### NEXT_PUBLIC_PAPER_CLIENT_ID (Optional)

Only add if you want to add an email wallet through Paper.

You can read more about Paper here: https://portal.thirdweb.com/wallet/paper

Once you get your Paper Client ID, add it to your `.env.local` file.

### GENERATED_PRIVATE_KEY

For authentication and minting receipts, the app will need a private key. You can generate one by running:

```bash
yarn generate
```

Then, add the generated private key to your `.env.local` file. This will also generate the wallet address associated with that private key, you can use it to mint receipts.

You can use a generated private key for production if:
- You're not using NFT receipts
- You are using NFT receipts and also using gasless, in that case, you'll need to grab the wallet address generated and add it as `Minter / Creator` on the Permissions tab of the NFT Collection you deployed.

You should be using your private key for production if:
- You're using NFT receipts and not using gasless. It would need to be the same private key you used to deploy the NFT Collection or add that wallet address as `Minter / Creator` on the Permissions tab of the NFT Collection you deployed.
