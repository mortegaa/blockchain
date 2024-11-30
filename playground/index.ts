import { createPublicClient, http, parseAbi } from "viem"
import { arbitrumSepolia } from "viem/chains"

const ABI = parseAbi(["function hola() public pure returns (string memory)"])
const ADDRESS = "0x24573fb24ababce6eaab470e24b7568ce9f1a3f3"

const client = createPublicClient({
  chain: arbitrumSepolia,
  transport: http(),
})

async function main() {
  const result = await client.readContract({
    abi: ABI,
    address: ADDRESS,
    functionName: "hola",
  })

  console.debug(`Contract: ${result}`)
}

main()
