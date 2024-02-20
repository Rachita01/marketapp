import React from 'react';
import * as XLSX from 'xlsx';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
// import { saveAs } from 'file-saver';

const ExcelCreation = ({ data }) => {
  const handleDownload = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Provide headers manually
    // const headers = ['Sr.','Product','ICODE','Batch','MRP','Cs','Out','Unts','Qty','Amt','Kg.','Schm','Schm%','StarDisc.','CasePack','OutPack'];
    const headers = ['PC Name','Beat Name','Shop Name','Latitude','Longitude','Visited On'];

    // Create a worksheet and add headers
    const headerRow = [headers];
    const worksheet = XLSX.utils.aoa_to_sheet(headerRow);

    // Convert your data to an array of arrays
    // const dataArray = data.map((item,index) => [index+1,item.name,1,1,item.mrp,1,1,1,item.quantity, item.amount,1,1,1,1,1,1]);
    const dataArray = data.map(item => [item.pcname,item.beatname,item.shopname,item.latitude,item.longitude,item.date]);

    // Add data rows to the worksheet
    XLSX.utils.sheet_add_aoa(worksheet, dataArray, { origin: 'A2' });

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

     // Save the workbook as a blob
     XLSX.writeFile(workbook, `MapMyMarket.xlsx`, { bookType: 'xlsx', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
  };

  return (
    <div style={{marginRight:"10px"}}>
      <ButtonComponent change={handleDownload} label="Download Excel"/>
    </div>
  );
};

export default ExcelCreation;
