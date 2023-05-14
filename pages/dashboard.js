import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'

import {
  marketplaceAddress
} from '../config'

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'

/*export default function CreatorDashboard() {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  /*async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    const data = await contract.fetchItemsListed()

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await contract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
      }
      return item
    }))*/
    /*async function loadNFTs() {
      const web3Modal = new Web3Modal({
        network: 'mainnet',
        cacheProvider: true,
      });
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
    
      const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer);
      const data = await contract.fetchItemsListed();
    
      try {
        const items = await Promise.all(data.map(async i => {
          if (!i.tokenUri) {
            // Handle the case when tokenUri is undefined
            return null;
          }
    
          let tokenUri;
          let meta;
    
          if (i.tokenUri.startsWith('ipfs:')) {
            const ipfsHash = i.tokenUri.replace('ipfs://', '');
            const ipfsUrl = `https://gray-registered-mockingbird-407.mypinata.cloud/ipfs/${ipfsHash}`;
            const meta = await fetch(ipfsUrl);
            meta = await response.json();
          } else {
            const meta = await axios.get(i.tokenUri);
            meta = response.data;
          }
    
          let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
          let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.data.image,
          };
          return item;
        }));
    
        // Filter out null values from the items array
        const filteredItems = items.filter(item => item !== null);
    
        return filteredItems;
      } catch (error) {
        console.error('Error loading NFTs:', error);
        return [];
      }
    }
     async function fetchNFTs() {
      setLoadingState('loading');
      const items = await loadNFTs();
      setNfts(items);
      setLoadingState('loaded');
    }
  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No NFTs listed</h1>)*/
  export default function Dashboard() {
    const [nfts, setNfts] = useState([]);
    const [loadingState, setLoadingState] = useState('not-loaded');
    useEffect(() => {
      loadNFTs();
    }, []);
  
    async function loadNFTs() {
      const web3Modal = new Web3Modal({
        network: 'mainnet',
        cacheProvider: true,
      });
  
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
  
      const marketplaceContract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer);
      const data = await marketplaceContract.fetchItemsListed();
  
      const items = await Promise.all(
        data.map(async (i) => {
          const tokenURI = await marketplaceContract.tokenURI(i.tokenId);
          let meta;
          let ipfsUrl;
  
          if (tokenURI.startsWith('ipfs://')) {
            const ipfsHash = tokenURI.replace('ipfs://', '');
            ipfsUrl = `https://gray-registered-mockingbird-407.mypinata.cloud/ipfs/${ipfsHash}`;
            const response = await axios.get(ipfsUrl);
            meta = response.data;
          } else {
            const response = await axios.get(tokenURI);
            meta = response.data;
          }
  
          let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
          let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: ipfsUrl || meta.image,
            tokenURI,
          };
  
          return item;
        })
      );
  
      setNfts(items);
      setLoadingState('loaded');
    }
  
    function resellNFT(nft) {
      router.push(`/resell-nft?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`);
    }
  
    if (loadingState === 'loaded' && !nfts.length) {
      return <h1 className="py-10 px-20 text-3xl">No NFTs listed</h1>;
    }  
  return (
    <div>
      <div className="p-4">
        <h2 className="text-2xl py-2">Items Listed</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={nft.image} className="rounded" />
                <div className="p-4 bg-black">
                  <p className="text-2xl font-bold text-white">Price - {nft.price} Eth</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}