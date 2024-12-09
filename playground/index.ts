import { createPublicClient, createWalletClient, stringToHex, hexToString, http, parseAbi } from "viem"
import { arbitrumSepolia } from "viem/chains"
import { privateKeyToAccount } from "viem/accounts"
import "dotenv/config"

const ABI = parseAbi([
  "function get_value() public view returns (bytes32)",
  "function set_value(bytes32) public",
  "function hola_mundo() public view returns (string)",
  "function add_player(bytes8) public view returns (string)",
  "function get_player_info(bytes8) public view returns (bytes32)",
  "function set_player_info(bytes32) public",
])

const account = privateKeyToAccount((process as any).env.PRIVATE_KEY)

const client = createWalletClient({
  chain: arbitrumSepolia,
  transport: http(),
  account,
})

const publicClient = createPublicClient({
  chain: arbitrumSepolia,
  transport: http(),
})

// https://sepolia.arbiscan.io/address/const CONTRACT_ADDRESS = "0x46be8751225be83d7a9b97fec0214c53795d8477"
const CONTRACT_ADDRESS = "0x663931565276022ad83536216bd61a3bb1f29d46"

async function write() {
  const input = stringToHex('hola', {size:32});
  const result = await client.writeContract({
    abi: ABI,
    address: CONTRACT_ADDRESS,
    functionName: "set_value",
    args: [input]
  })

  console.debug(`Contract: ${result}`)
}

async function read() {
  const result = await publicClient.readContract({
    abi: ABI,
    address: CONTRACT_ADDRESS,
    functionName: "get_value",
  })

  console.debug(`Contract: ${hexToString(result)}`)
}

async function add_player() {
  const input = stringToHex('mortegaa', {size:8});
  const result = await client.writeContract({
    abi: ABI,
    address: CONTRACT_ADDRESS,
    functionName: "add_player",
    args: [input]
  })

  console.debug(`Contract: ${result}`)
}

async function read_player_info() {
  const input = stringToHex('mortegaa', {size:8});
  const result = await publicClient.readContract({
    abi: ABI,
    address: CONTRACT_ADDRESS,
    functionName: "get_player_info",
    args: [input]
  })

  console.debug(`Contract: ${hexToString(result)}`)
}

async function set_player_info() {
  const input = stringToHex('mortegaa03065566', {size:32});
  const result = await client.writeContract({
    abi: ABI,
    address: CONTRACT_ADDRESS,
    functionName: "set_player_info",
    args: [input]
  })

  console.debug(`Contract: ${result}`)
}


//set_player_info()
read_player_info()
//add_player()
//write()
//read()
