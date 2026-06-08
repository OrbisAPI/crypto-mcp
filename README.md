# Orbis Crypto & Blockchain MCP ₿

> Real on-chain and crypto APIs for AI agents. Pay per call with USDC on Base — no API keys, no accounts, no subscriptions.

[![MCP](https://img.shields.io/badge/MCP-StreamableHTTP-blue)](https://orbisapi.com/api/mcp/crypto)
[![x402](https://img.shields.io/badge/payment-x402%20USDC-green)](https://x402.org)

## What's Actually In Here

These are the most-called APIs in this domain on Orbis:

| API | Calls | What it does |
|-----|-------|-------------|
| [Gas Fee Estimator API](https://orbisapi.com/marketplace/gas-fee-estimator-api-a96f58) | 521 | Real-time gas price estimates across chains |
| [On-Chain Volume Score API](https://orbisapi.com/marketplace/on-chain-volume-score-api-7e996b) | 351 | Score a wallet's on-chain trading volume |
| [Crypto Address Labeler API](https://orbisapi.com/marketplace/crypto-address-labeler-api-79be80) | 283 | Tag an address: exchange, mixer, whale, contract |
| [Web3 Wallet Analyzer API](https://orbisapi.com/marketplace/web3-wallet-analyzer-api-3c557c) | 218 | Full wallet breakdown: holdings, activity, risk |
| [Wallet API](https://orbisapi.com/marketplace/wallet-api-5f3267) | 211 | General-purpose wallet data and metadata |
| [Web3 Integration API](https://orbisapi.com/marketplace/web3-integration-api-709107) | 202 | Web3 connectivity utilities for agents |
| [Web3 Wallet Activity Scorer API](https://orbisapi.com/marketplace/web3-wallet-activity-scorer-api-88c89f) | 197 | Score wallet activity patterns 0–100 |
| [Blockchain Concepts Guide API](https://orbisapi.com/marketplace/blockchain-concepts-guide-api-726469) | 171 | Explain blockchain concepts in plain language |
| [Web3 Wallet Risk Scorer API](https://orbisapi.com/marketplace/web3-wallet-risk-scorer-api-944f2b) | 169 | Risk score a wallet from on-chain behavior |
| [On-Chain Wallet Scoring API](https://orbisapi.com/marketplace/on-chain-wallet-scoring-api-a4fbb5) | 139 | Composite wallet health and reputation score |
| [Smart Contract Permission Explainer API](https://orbisapi.com/marketplace/smart-contract-permission-explainer-api-7c93da) | 61 | Explain what permissions a contract is requesting |
| [Crypto Airdrop Eligibility Rules API](https://orbisapi.com/marketplace/crypto-airdrop-eligibility-rules-api-563bba) | 55 | Check eligibility criteria for crypto airdrops |

## Quick Start

No API key needed. No account. Paste into your MCP client:

### Claude Desktop / Claude Code
```json
{
  "mcpServers": {
    "orbis-crypto": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://orbisapi.com/api/mcp/crypto"]
    }
  }
}
```
Config path: `~/Library/Application Support/Claude/claude_desktop_config.json`

### Cursor / Windsurf / Cline
```json
{
  "mcpServers": {
    "orbis-crypto": {
      "url": "https://orbisapi.com/api/mcp/crypto"
    }
  }
}
```

### OpenAI Codex CLI
```yaml
# ~/.codex/config.yaml
mcpServers:
  orbis-crypto:
    type: url
    url: "https://orbisapi.com/api/mcp/crypto"
```

## Example Prompts

Once connected, try asking your AI:

- *"What's the current gas fee estimate for a swap on Ethereum?"*
- *"Label this address — is it an exchange, mixer, or whale? 0x28C6c06298d514Db089934071355E5743bf21d60"*
- *"Analyze this wallet's on-chain activity and give me a risk score: 0x..."*
- *"Score this wallet's trading volume vs the average on-chain: 0x..."*
- *"Explain what permissions this smart contract is requesting before I approve it"*
- *"Is this wallet eligible for the upcoming airdrop?"*

## Direct x402 Usage (Node.js)

```javascript
import { wrapFetchWithPayment } from "x402-fetch";
import { privateKeyToAccount } from "viem/accounts";
import { createWalletClient, http } from "viem";
import { base } from "viem/chains";

const account = privateKeyToAccount(process.env.WALLET_PRIVATE_KEY);
const walletClient = createWalletClient({ account, chain: base, transport: http() });
const fetch = wrapFetchWithPayment(globalThis.fetch, walletClient);

// Gas fee estimate — one of the most-called APIs in this domain
const resp = await fetch(
  "https://orbisapi.com/api/proxy/gas-fee-estimator-api-a96f58/estimate",
  { method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chain: "ethereum", type: "swap" }) }
);
console.log(await resp.json());
```

See `example.mjs` for a full working script.

## All Orbis Domain MCPs

| Domain | URL |
|--------|-----|
| ₿ Crypto & Blockchain | `https://orbisapi.com/api/mcp/crypto` |
| 🔍 Research & Data | `https://orbisapi.com/api/mcp/research` |
| 🛒 Commerce & Retail | `https://orbisapi.com/api/mcp/commerce` |
| ✈️ Travel | `https://orbisapi.com/api/mcp/travel` |
| 🌐 All 20,000+ APIs | `https://orbisapi.com/api/mcp` |

---

Built by [Orbis](https://orbisapi.com) — the API marketplace for AI agents.
