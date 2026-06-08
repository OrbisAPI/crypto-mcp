/**
 * Orbis Crypto MCP — Direct x402 usage example
 * 
 * Calls the Orbis crypto API collection directly using x402 USDC payments on Base.
 * No API keys, no accounts — your wallet is your identity.
 * 
 * Setup:
 *   npm install
 *   WALLET_PRIVATE_KEY=0x... node example.mjs
 */
import { wrapFetchWithPayment } from "x402-fetch";
import { privateKeyToAccount } from "viem/accounts";
import { createWalletClient, http } from "viem";
import { base } from "viem/chains";

const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;
if (!PRIVATE_KEY) throw new Error("Set WALLET_PRIVATE_KEY env var");

const account = privateKeyToAccount(PRIVATE_KEY);
const walletClient = createWalletClient({ account, chain: base, transport: http() });

// x402 fetch — auto-pays USDC for each API call
const fetch = wrapFetchWithPayment(globalThis.fetch, walletClient);

console.log("Orbis Crypto MCP Demo");
console.log("Wallet:", account.address, "\n");

// ── 1. Browse available crypto APIs ─────────────────────────────────────────
console.log("1. Browsing crypto APIs via MCP...");
const browseResp = await fetch("https://orbisapi.com/api/mcp/crypto", {
  method: "POST",
  headers: { "Content-Type": "application/json", "Accept": "application/json, text/event-stream" },
  body: JSON.stringify({
    jsonrpc: "2.0", id: 1,
    method: "tools/call",
    params: { name: "browse_apis", arguments: { search: "wallet risk" } }
  }),
});

const browseText = await browseResp.text();
const browseData = browseText.split("\n")
  .filter(l => l.startsWith("data: "))
  .map(l => { try { return JSON.parse(l.slice(6)); } catch { return null; } })
  .find(Boolean);

if (browseData?.result?.content?.[0]?.text) {
  const apis = JSON.parse(browseData.result.content[0].text);
  console.log(`Found ${apis.total} crypto APIs in pool`);
  apis.apis?.slice(0, 3).forEach(api => {
    console.log(`  - ${api.name} (${api.slug})`);
    if (api.pricing?.x402) console.log(`    ${api.pricing.x402}`);
  });
}

// ── 2. Call a wallet risk API directly via proxy ─────────────────────────────
const WALLET_TO_CHECK = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
console.log(`\n2. Checking wallet risk for ${WALLET_TO_CHECK}...`);

try {
  const riskResp = await fetch(
    \`https://orbisapi.com/api/proxy/wallet-address-risk-api-c6680c/analyze\`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: WALLET_TO_CHECK }),
    }
  );
  if (riskResp.ok) {
    const risk = await riskResp.json();
    console.log("Risk analysis:", JSON.stringify(risk, null, 2));
  } else {
    console.log("Response status:", riskResp.status);
  }
} catch (e) {
  console.log("(Demo mode — connect a funded wallet to make live calls)");
  console.log("Error:", e.message);
}

console.log("\nDone. Check orbisapi.com/api/mcp/crypto for the full API catalogue.");
