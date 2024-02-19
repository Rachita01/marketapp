import React,{useState,useEffect,useRef} from 'react';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import Dropdown from '../DropdownComponent/DropdownComponent';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import './PCMarket.css';

function PCMarket() {
    const [latitude,setLatitude] = useState(null);
    const [longitude,setLongitude] = useState(null);
    const shopname = useRef("")
    const beatname = useRef("")
    const beatList = useRef([]);
    const shopList = useRef([]);
    const [beatInput,setBeatInput] = useState("");
    const [shopInput,setShopInput] = useState("");
    const [showBeatInput,setShowBeatInput] = useState(false);
    const [showShopInput,setShowShopInput] = useState(false);
    const [list,setList] = useState([]);
    const location = useLocation();
    const {name} = location.state || {}

    useEffect(() => {
        const handleSendLocation = () => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                }
                );
            }
        }

        if(beatInput!==null || beatInput!==""){
            beatname.current = beatInput
        }
        if(shopInput!==null || shopInput!==""){
            shopname.current = shopInput
        }

        handleSendLocation();
        console.log("longitude",longitude,"latitude",latitude,shopname.current,beatname.current)

        const fetchMarket = async () => {
            try {
              const response = require("../../marketlist.json")
              setList(response.markets);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };

          fetchMarket();
          beatList.current = [...new Set(list.filter(item => (item.PCNAME.toLowerCase() === name) || item.PCNAME.toLowerCase() === "other").map(item => item.BEATNAME))];
          shopList.current = [...new Set(list.filter(item => (item.PCNAME.toLowerCase() === name) || item.PCNAME.toLowerCase() === "other").map(item => item.SHOPNAME))];
        
    },[latitude,longitude,beatname,shopname,list,name,beatInput,shopInput])

    const handleSubmit = () => {        
        const data = {
            name,
            shopname,
            beatname,
            latitude,
            longitude
        }

        console.log(data)
        axios
            .post('https://mapmymarket.onrender.com/marketdata',data)
            .then(() => {
            console.log(data);
            })
            .catch((error) => {
            console.log(error,data);
            alert("An error happened. Please check console",error);
            })

            beatname.current = ""
            shopname.current = ""
            setBeatInput("")
            setShopInput("")
        }
    
        console.log(longitude,latitude)

    const handleShopChange = (option) => {
        shopname.current = option
        console.log(shopname.current)
        if(shopname.current.toLowerCase() === "other"){
            setShowShopInput(true);
         }
    }

    const handleBeatChange = (option) => {
        beatname.current = option
        console.log(beatname.current)
        if(beatname.current.toLowerCase() === "other"){
           setShowBeatInput(true);
        }
    }

    const handleOtherBeat =(e)=>{
       setBeatInput(e.target.value)
       console.log(beatInput)
    }

    
    const handleOtherShop =(e)=>{
        setShopInput(e.target.value)
        console.log(shopInput)
     }
  return (
    <div className='cardStyle'>
        <h1 className='nameHead'>HI {name.toUpperCase()}</h1>
        <div className='formCard'>
        <div className='beatClass'>
        <label>Beat Name</label><Dropdown options={beatList.current} onSelect={handleBeatChange}/>
        {/* <p>Selected value: {beatname.current}</p> */}
        </div>
        {showBeatInput && <input className="inputClass" type="text" value={beatInput} onChange={handleOtherBeat}/>}
        <div className='shopClass'>
        <label>Shop Name</label><Dropdown options={shopList.current} onSelect={handleShopChange}/>
         {/* <p>Selected value: {shopname.current}</p> */}
         </div>
         {showShopInput && <input className="inputClass" type="text" value={shopInput} onChange={handleOtherShop}/>}
         <div className='buttonClass'>
        <ButtonComponent label="Send Location" change={handleSubmit}></ButtonComponent>
        </div>
        </div>
       
    </div>
  )
}

export default PCMarket