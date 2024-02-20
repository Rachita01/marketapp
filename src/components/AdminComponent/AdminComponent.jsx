import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import ExcelCreation from '../ExcelCreation/ExcelCreation';
import './AdminHome.css'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function AdminComponent() {
  const location = useLocation();
  const { data } = location.state || {};
  console.log(JSON.parse(data));
  const final_data = JSON.parse(data)
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/", { replace: true })
  }

  return (
    <div className='cardStylePC'>
        <Header/>
        <p className='headStyle'>Details of All PC</p>
        <div className='adminContent'>
            <table className='tableStyle'>
                <thead>
                    <th>PC Name</th>
                    <th>Beat Name</th>
                    <th>Shop Name</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Visited On</th>
                </thead>
                <tbody>
                    {final_data.map(item => (
                        <tr key={item.id}>
                            <td>{item.pcname}</td>
                            <td>{item.beatname}</td>
                            <td>{item.shopname}</td>
                            <td>{item.latitude}</td>
                            <td>{item.longitude}</td>
                            <td>{item.date}</td>
                        </tr>))}
                </tbody>
            </table>
        </div>
       
        <div className='submitStyle'>
        <ExcelCreation data={final_data}/>
        <ButtonComponent label="Logout" change={handleSubmit} disabled={false}></ButtonComponent>
        </div>
        <Footer/>
    </div>
  )
}

export default AdminComponent