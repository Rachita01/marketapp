import React,{useState,useEffect,useRef} from 'react';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
// import Dropdown from '../DropdownComponent/DropdownComponent';
// import {Link, 
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
    // const [showOrg,setShowOrg] = useState(true);
    // const [beatChange,setBeatChange] = useState(false);
    // const [updatedShopList,setUpdatedList] =  useState([]);
    const [beatInput,setBeatInput] = useState("");
    const [shopInput,setShopInput] = useState("");
    // const [showBeatInput,setShowBeatInput] = useState(false);
    // const [showShopInput,setShowShopInput] = useState(false);
    const [list,setList] = useState([]);
    const location = useLocation();
    const storedName = localStorage.getItem("name")
    console.log(JSON.stringify(location.state,storedName))
    const {name} = location.state || {}
    const setName = storedName?storedName:name;
    const navigate = useNavigate();
    const [locSent,setLocSent] = useState(false);
    // const [locPresent,setLocPresent] = useState(false);
    // const locationFound = useRef("");

    useEffect(() => {
        setLocSent(false);
        console.log("Data refreshed");
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
            beatList.current = [...new Set(list.map(item => item.BEATNAME).sort())];
          originalShopList.current = [...new Set(list.map(item => item.SHOPNAME).sort())];
          
        
    },[latitude,longitude,beatname,shopname,list,name,beatInput,shopInput,locSent])

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

        setBeatInput("")
        setShopInput("")
        window.alert("Location Sent!!");
        }
    
        console.log(longitude,latitude)

    // const handleShopChange = (option) => {

    //     setLocPresent(false)
    //     locationFound.current = ""
    //     shopname.current = option;
    //     locationFound.current = list.filter(item => item.BEATNAME === beatname.current && item.SHOPNAME === shopname.current).map(item => item.LOCATION);
    //     console.log(locationFound.current[0])
    //     if(locationFound.current[0]!==undefined){
    //         setLocPresent(true);
    //         console.log(locationFound.current[0]);
    //     }
    //     console.log(shopname.current)
    //     if(shopname.current.toLowerCase() === "other"){
    //         setShowShopInput(true);
    //      }
    //      else{
    //         setShowShopInput(false)
    //      }
    // }

    // const handleBeatChange = (option) => {

    //     setLocPresent(false)
    //     locationFound.current = ""
    //     setBeatChange(true)
    //     beatname.current = option
    //     console.log(beatname.current)
    //     if(beatname.current.toLowerCase() === "other"){
    //        setShowBeatInput(true);
    //     }
    //     else{
    //         setShowBeatInput(false)
    //         setShowOrg(false);
    //     }
    // }

    // useEffect(() => {
    //     if(!showOrg && beatChange){
    //         setUpdatedList([...new Set(list.filter(item => (item.BEATNAME.toLowerCase() === beatname.current.toLowerCase())).map(item => item.SHOPNAME).sort())])
    //        }
    //        setBeatChange(false);    
      
    // },[list,showOrg,beatChange,name])

    // const handleOtherBeat =(e)=>{
    //    setBeatInput(e.target.value)
    //    console.log(beatInput)
    // }

    
    // const handleOtherShop =(e)=>{
    //     setShopInput(e.target.value)
    //     console.log(shopInput)
    //  }

     const handleLogout = () => {
            beatname.current = ""
            shopname.current = ""
            setBeatInput("")
            setShopInput("")
            localStorage.clear();
        navigate("/", { replace: true })
      }

      const handleRefresh = () => {
        setLocSent(true);
      }

    //   const openNewWindow = (sugloc) => {
    //     // localStorage.setItem("beatname",beatname.current);
    //     // localStorage.setItem("shopname",shopname.current);
    //     localStorage.setItem("name",name);
    //     if(showBeatInput){
    //         localStorage.setItem("otherbeat",beatInput);
    //     }
    //     if(showShopInput){
    //       localStorage.setItem("other shop",shopInput);
    //     }
    //     window.open(sugloc,'_blank')
    //   }
  return (
    <div className='cardStyle'>
        <h1 className='nameHead'>HI {setName.toUpperCase()}</h1>
        <div className='formCard'>
        <div className='buttonClass'>
            <ButtonComponent label="Refresh" change={handleRefresh}></ButtonComponent>
        </div>
         <div className='buttonClass'>
        <ButtonComponent label="Send Location" change={handleSubmit}></ButtonComponent>
        </div>
        </div>
        <ButtonComponent label="Logout" change={handleLogout}></ButtonComponent>
    </div>
  )
}

export default PCMarket