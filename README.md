# Orbis Crypto & Blockchain MCP ₿

> 500+ crypto and blockchain APIs for AI agents. Pay per call with USDC on Base — no API keys, no accounts, no subscriptions.

[![MCP](https://img.shields.io/badge/MCP-StreamableHTTP-blue)](https://orbisapi.com/api/mcp/crypto)
[![Payment](https://img.shields.io/badge/payment-x402%20USDC-green)](https://x402.org)

## What's Inside

- **Wallet Analysis** — risk scoring, AML checks, on-chain reputation, activity scoring
- **DeFi Intelligence** — protocol data, yield optimization, position risk, liquidation alerts
- **Blockchain Data** — transaction history, address labeling, forensics, gas optimization  
- **Market Data** — Bitcoin/altcoin prices, dominance, halving history, tokenomics analysis
- **NFT & Token** — market intelligence, unlock schedules, portfolio stress testing
- **Compliance** — AML screening, sanctions checks, fraud pattern detection

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
Settings → MCP → Add Server → paste the URL.

### OpenAI Codex CLI
```yaml
# ~/.codex/config.yaml
mcpServers:
  orbis-crypto:
    type: url
    url: "https://orbisapi.com/api/mcp/crypto"
```

## Example Prompts

Once connected, try asking your AI assistant:

- *"Check if this wallet has any AML flags: 0x742d35Cc6634C0532925a3b844Bc454e4438f44e"*
- *"What's the current altcoin season index and Bitcoin dominance?"*
- *"Score the on-chain activity for wallet 0x... and flag any risky behavior"*
- *"What are the red flags in this token's tokenomics?"*
- *"Analyze DeFi position risk — am I close to liquidation?"*
- *"Label this blockchain address: is it an exchange, mixer, or contract?"*

## Direct x402 Usage (Node.js)

Pay per call from your own scripts — no agent needed:

```javascript
import { wrapFetchWithPayment } from "x402-fetch";
import { privateKeyToAccount } from "viem/accounts";
import { createWalletClient, http } from "viem";
import { base } from "viem/chains";

const account = privateKeyToAccount(process.env.WALLET_PRIVATE_KEY);
const walletClient = createWalletClient({ account, chain: base, transport: http() });
const fetch = wrapFetchWithPayment(globalThis.fetch, walletClient);

// Wallet risk check — ~$0.01 per call
const resp = await fetch(
  "https://orbisapi.com/api/proxy/wallet-address-risk-api-c6680c/analyze",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e" }),
  }
);
console.log(await resp.json());
```

See `example.mjs` for a full working script.

## MCP Details

| | |
|---|---|
| **MCP URL** | `https://orbisapi.com/api/mcp/crypto` |
| **Protocol** | StreamableHTTP + SSE |
| **Payment** | x402 USDC on Base (~$0.01/call) |
| **Tools** | `browse_apis`, `call_api` |
| **APIs in pool** | 500+ crypto/blockchain/DeFi |

## All Orbis Domain MCPs

| Domain | URL |
|--------|-----|
| ₿ Crypto & Blockchain | `https://orbisapi.com/api/mcp/crypto` |
| 🔍 Research & Data | `https://orbisapi.com/api/mcp/research` |
| 🛒 Commerce & Retail | `https://orbisapi.com/api/mcp/commerce` |
| ✈️ Travel | `https://orbisapi.com/api/mcp/travel` |
| 🌐 All 20,200+ APIs | `https://orbisapi.com/api/mcp` |

---

Built by [Orbis](https://orbisapi.com) — the API marketplace for AI agents.
