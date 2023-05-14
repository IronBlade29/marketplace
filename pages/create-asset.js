/* pages/create-nft.js */
/**import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'

const projectId = process.env.INFURA_IPFS_PROJECT_ID;
const projectSecret = process.env.INFURA_IPFS_PROJECT_SECRET;
const projectIdAndSecret = `${projectId}:${projectSecret}`;

const client = ipfsHttpClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
  authorization: `Basic ${Buffer.from(projectIdAndSecret).toString('base64')}`,
  },
  })

  const authorization = "Basics" + btoa(projectId + ":" + projectSecret);

import {
  marketplaceAddress
} from '../config'

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'
import { Bytecode } from 'hardhat/internal/hardhat-network/stack-traces/model'
import { notEqual } from 'assert'

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const router = useRouter()

  async function onChange(e) {
    /* upload image to IPFS */
    /*const file = e.target.files[0]
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`),
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      client.pin.add(added.path).then((res) => {
        console.log(res)
        setFileUrl(url)
    })
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  async function uploadToIPFS() {
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return
    /* first, upload metadata to IPFS */
    /*const data = JSON.stringify({
      name, description, image: fileUrl
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after metadata is uploaded to IPFS, return the URL to use it in the transaction */
      /*return url
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async function listNFTForSale() {
    const url = await uploadToIPFS()
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    /* create the NFT */
    /*const price = ethers.utils.parseUnits(formInput.price, 'ether')
    let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()
    let transaction = await contract.createToken(url, price, { value: listingPrice })
    await transaction.wait()

    router.push('/')
  }*/
/*import { useState } from 'react';
import { ethers } from 'ethers';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { useRouter } from 'next/router';
import Web3Modal from 'web3modal';

const isServer = typeof window === 'undefined';

if (isServer) {
  require('dotenv').config();
}

const apiKey = process.env.PINATA_API_KEY;
const apiSecret = process.env.PINATA_API_SECRET;

const client = ipfsHttpClient({
  api: 'https://api.pinata.cloud/',
  headers: {
    pinata_api_key: apiKey,
    pinata_secret_api_key: apiSecret,
  },
});

// Import marketplaceAddress and NFTMarketplace from appropriate files
import { marketplaceAddress } from '../config';
import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json';

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' });
  const router = useRouter();

  async function onChange(e) {
    /* upload image to IPFS */
    /*const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://gateway.pinata.cloud/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  async function uploadToIPFS() {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) return;
    /* first, upload metadata to IPFS */
    /*const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });
    try {
      const added = await client.add(data);
      const url = `https://gateway.pinata.cloud/ipfs/${added.path}`;
      /* after metadata is uploaded to IPFS, return the URL to use it in the transaction */
      /*return url;
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  async function listNFTForSale() {
    const url = await uploadToIPFS();
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    /* create the NFT */
    /*const price = ethers.utils.parseUnits(formInput.price, 'ether');
    let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();
    let transaction = await contract.createToken(url, price, { value: listingPrice });
    await transaction.wait();

    router.push('/');
  }
  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input 
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
        />
        <textarea
          placeholder="Asset Description"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
        />
        <input
          placeholder="Asset Price in Eth"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
        />
        <input
          type="file"
          name="Asset"
          className="my-4"
          onChange={onChange}
        />
        {
          fileUrl && (
            <img className="rounded mt-4" width="350" src={fileUrl} />
          )
        }
        <button onClick={listNFTForSale} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          Create NFT
        </button>
      </div>
    </div>
  );
    }
    import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import {
  marketplaceAddress
} from '../config'

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const router = useRouter()

  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  async function uploadToIPFS() {
    import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import {
  marketplaceAddress
} from '../config'

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const router = useRouter()

  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  async function uploadToIPFS() {
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return
    /* first, upload to IPFS */
import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import axios from 'axios'

const client = ipfsHttpClient('https://api.pinata.cloud')

import {
  marketplaceAddress
} from '../config'

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const [file, setFile] = useState(null) // Store the file in state
  const router = useRouter()

  async function onChange(e) {
    const file = e.target.files[0]
    setFile(file) // Update the file state
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://api.pinata.cloud/${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async function uploadToIPFS(file) {
    if (file) {
      try {
        const formData = new FormData()
        formData.append("file", file)

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: '13e4f171471ed9c5db8b',
            pinata_secret_api_key: 'fd5dabb0f1a9d2539c3be9c4e54d5394bc20a62a00b9158d1bae3b7eafee30bf',
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;

        // Perform any additional actions with the ImgHash if needed

        return ImgHash; // Return the ImgHash
      } catch (error) {
        console.error("Error uploading file to pinata:",error.response);
        console.log("pinata error response",error.response.data);
        alert("Unable to upload images to Pinata");
      }
    }
  }

  /*async function listNFTForSale() {
    if (!formInput.name || !formInput.description) {
      alert("Please provide a name and description for the NFT");
      return;
    }
  
    const url = await uploadToIPFS(file) // Pass the file state to uploadToIPFS
  
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
  
    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer) // Move this line here
  
    const price = ethers.utils.parseUnits(formInput.price, 'ether')
  
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()
  
    let transaction = await contract.createToken(url, price, { value: listingPrice })
    let tx = await transaction.wait()
  
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()
  
    transaction = await contract.CreateMarketItem(marketplaceAddress, tokenId, price, { value: listingPrice })
  
    await transaction.wait()
    router.push('/')
  }*/
  async function listNFTForSale() {
    if (!formInput.name || !formInput.description) {
      alert("Please provide a name and description for the NFT");
      return;
    }
    const url = await uploadToIPFS(file);

const web3Modal = new Web3Modal();
const connection = await web3Modal.connect();
const provider = new ethers.providers.Web3Provider(connection);
const signer = provider.getSigner();

const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer);

const price = ethers.utils.parseUnits(formInput.price, 'ether');

let listingPrice = await contract.getListingPrice();
listingPrice = listingPrice.toString();

let transaction = await contract.createToken(url, price, { value: listingPrice });
let tx = await transaction.wait();

let event = tx.events[0];
let value = event.args[2];
let tokenId = value.toNumber();

transaction = await contract.createMarketItem(tokenId, price, { value: listingPrice });
await transaction.wait();
router.push('/');
  }
    
      return (
        <div className="flex justify-center">
          <div className="w-1/2 flex flex-col pb-12">
            <input 
              placeholder="Asset Name"
              className="mt-8 border rounded p-4"
              onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
            />
            <textarea
              placeholder="Asset Description"
              className="mt-2 border rounded p-4"
              onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
            />
            <input
              placeholder="Asset Price in Eth"
              className="mt-2 border rounded p-4"
              onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
            />
            <input
              type="file"
              name="Asset"
              className="my-4"
              onChange={onChange}
            />
            {
              fileUrl && (
                <img className="rounded mt-4" width="350" src={fileUrl} />
              )
            }
            <button onClick={listNFTForSale} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
              Create Token
            </button>
          </div>
        </div>
      )
    }