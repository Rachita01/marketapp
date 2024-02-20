import React,{useState,useEffect,useRef} from 'react';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import Dropdown from '../DropdownComponent/DropdownComponent';
import {useLocation,useNavigate} from 'react-router-dom';
import axios from 'axios';
import './PCMarket.css';
//import DropdownTest from '../DropDownTest/DropDownTest';

function PCMarket() {
    const [latitude,setLatitude] = useState(null);
    const [longitude,setLongitude] = useState(null);
    const shopname = useRef("")
    const beatname = useRef("")
    const beatList = useRef([]);
    const originalShopList = useRef([]);
    const [showOrg,setShowOrg] = useState(true);
    const [beatChange,setBeatChange] = useState(false);
    const [updatedShopList,setUpdatedList] =  useState([]);
    const [beatInput,setBeatInput] = useState("");
    const [shopInput,setShopInput] = useState("");
    const [showBeatInput,setShowBeatInput] = useState(false);
    const [showShopInput,setShowShopInput] = useState(false);
    const [list,setList] = useState([]);
    const location = useLocation();
    const {name} = location.state || {}
    const navigate = useNavigate();

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
          setTimeout(() => {
            beatList.current = [...new Set(list.filter(item => (item.PCNAME.toLowerCase() === name) || item.PCNAME.toLowerCase() === "other").map(item => item.BEATNAME))];
          originalShopList.current = [...new Set(list.filter(item => (item.PCNAME.toLowerCase() === name) || item.PCNAME.toLowerCase() === "other").map(item => item.SHOPNAME))];
          },500)
        
    },[latitude,longitude,beatname,shopname,list,name,beatInput,shopInput])

    const getCurrentDate = () => {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
      };

    const handleSubmit = () => {    
        const currentDate = getCurrentDate();    
        const data = {
            name,
            shopname,
            beatname,
            latitude,
            longitude,
            currentDate
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
        window.alert("Location Sent!!");
        }
    
        console.log(longitude,latitude)

    const handleShopChange = (option) => {
        shopname.current = option
        console.log(shopname.current)
        if(shopname.current.toLowerCase() === "other"){
            setShowShopInput(true);
         }
         else{
            setShowShopInput(false)
         }
    }

    const handleBeatChange = (option) => {
        setBeatChange(true)
        beatname.current = option
        console.log(beatname.current)
        if(beatname.current.toLowerCase() === "other"){
           setShowBeatInput(true);
        }
        else{
            setShowBeatInput(false)
            setShowOrg(false);
        }
    }

    useEffect(() => {
     setTimeout(() => {
        if(!showOrg && beatChange){
            setUpdatedList([...new Set(list.filter(item => ((item.PCNAME.toLowerCase() === name) || item.PCNAME.toLowerCase() === "other") && (item.BEATNAME.toLowerCase() === beatname.current.toLowerCase())).map(item => item.SHOPNAME))])
           }
           setBeatChange(false);
     },500)
      
    },[list,showOrg,beatChange,name])

    const handleOtherBeat =(e)=>{
       setBeatInput(e.target.value)
       console.log(beatInput)
    }

    
    const handleOtherShop =(e)=>{
        setShopInput(e.target.value)
        console.log(shopInput)
     }

     const handleLogout = () => {
            beatname.current = ""
            shopname.current = ""
            setBeatInput("")
            setShopInput("")
        navigate("/", { replace: true })
      }
  return (
    <div className='cardStyle'>
        <h1 className='nameHead'>HI {name.toUpperCase()}</h1>
        <div className='formCard'>
        <div className='beatClass'>
        <label className='pcLabel'>Beat Name</label><Dropdown options={beatList.current} onSelect={handleBeatChange}/>
        {/* <p>Selected value: {beatname.current}</p> */}
        </div>
        {showBeatInput && <input className="inputClass" type="text" value={beatInput} onChange={handleOtherBeat}/>}
        {showOrg ?
         
        <div className='shopClass'>
        <label className='pcLabel'>Shop Name</label><Dropdown options={originalShopList.current} onSelect={handleShopChange}/>
         {/* <p>Selected value: {shopname.current}</p> */}
         </div>
         :
         <div className='shopClass'>
         <label className='pcLabel'>Shop Name</label><Dropdown options={updatedShopList} onSelect={handleShopChange}/>
          {/* <p>Selected value: {shopname.current}</p> */}
          </div>
         }
         {showShopInput && <input className="inputClass" type="text" value={shopInput} onChange={handleOtherShop}/>}
         <div className='buttonClass'>
        <ButtonComponent label="Send Location" change={handleSubmit}></ButtonComponent>
        </div>
        </div>
        <ButtonComponent label="Logout" change={handleLogout}></ButtonComponent>
    </div>
  )
}

export default PCMarket