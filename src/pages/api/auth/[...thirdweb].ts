import { DOMAIN } from "@/lib/environment-variables";
import { getCart } from "@/lib/shopify";
import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";
import { ThirdwebAuth } from "@thirdweb-dev/auth/next";
import { ethers } from "ethers";

/**
 * DO NOT USE THIS PRIVATE KEY IN PRODUCTION - IT IS FOR TESTING ONLY
 * for production, use a private key that is stored in a secure location such as AWS Secrets Manager or Google Cloud Secrets
 * and then load it via our AWSKMS or GoogleKMS wallet
 */
const PRIVATE_KEY =
  process.env.GENERATED_PRIVATE_KEY || ethers.Wallet.createRandom().privateKey;

// Switch the line below to AWSKMS or GoogleKMS wallet for production use
const wallet = new PrivateKeyWallet(PRIVATE_KEY);

// Here we configure thirdweb auth with a domain and wallet
export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  domain: DOMAIN,
  wallet,
});

// Use the ThirdwebAuthHandler as the default export to handle all requests to /api/auth/*
export default ThirdwebAuthHandler();
