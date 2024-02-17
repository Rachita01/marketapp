import React,{useState,useEffect} from 'react';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import './PCMarket.css';

function PCMarket() {
    const [latitude,setLatitude] = useState(null);
    const [longitude,setLongitude] = useState(null);
    const [shopname,setShopName] = useState("")
    const [beatname,setBeatName] = useState("")
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

        handleSendLocation();
        console.log(longitude,latitude,shopname,beatname)
    },[latitude,longitude,shopname,beatname])

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
            .post('http://localhost:5555/marketdata',data)
            .then(() => {
            console.log(data);
            })
            .catch((error) => {
            console.log(error,data);
            alert("An error happened. Please check console",error);
            })

            setBeatName("")
            setShopName("")
        }
    
        console.log(longitude,latitude)

    const handleShopChange = (e) => {
        setShopName(e.target.value)
    }

    const handleBeatChange = (e) => {
        setBeatName(e.target.value)
    }
  return (
    <div>
        <h1>HI {name}</h1>
        <div className='getDetails'>
        <label>Shop Name</label><input type="text" className='userClassPC' value={shopname} onChange={(e) => handleShopChange(e)}></input>
        <br/>
        <label>Beat Name</label><input type="text" className='beatClassPC' value={beatname} onChange={(e) => handleBeatChange(e)}></input>
        </div>
        <ButtonComponent label="Send Location" change={handleSubmit}></ButtonComponent>
    </div>
  )
}

export default PCMarket