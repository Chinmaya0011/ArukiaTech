import React, { useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import "./assets/invoiceForm.css";
import InvoicePreview from './InvoicePreview';

const InvoiceForm = () => {
  
  // State variables for form fields
  const [sellerName, setSellerName] = useState('');
  const [sellerAddress, setSellerAddress] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [panNo, setPanNo] = useState('');
  const [gstNo, setGstNo] = useState('');
  const [shippingName, setShippingName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [placeOfSupply, setPlaceOfSupply] = useState('');
  const [placeOfDelivery, setPlaceOfDelivery] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDetails, setInvoiceDetails] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [signature, setSignature] = useState('');

  // State variables for items
  const [items, setItems] = useState([
    { description: '', unitPrice: '', quantity: '' }
  ]);

  // Function to handle checkbox click to sync shipping address
  const handleSyncAddress = () => {
    setShippingName(customerName);
    setShippingAddress(customerAddress);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Create an object with all form data
    const invoiceData = {
      sellerName, 
      sellerAddress, 
      customerName, 
      customerAddress,
      panNo, 
      gstNo, 
      shippingName, 
      shippingAddress, 
      orderNumber,
      orderDate, 
      stateCode, 
      placeOfSupply, 
      placeOfDelivery,
      invoiceNumber, 
      invoiceDetails, 
      invoiceDate, 
      items,
      signature
    };
    // Pass the invoice data to the InvoicePreview component
    console.log(invoiceData);
  };

  const handleAddItem = () => {
    setItems([...items, { description: '', unitPrice: '', quantity: '' }]);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const sigCanvas = React.useRef(null);

  const handleClearSignature = () => {
    sigCanvas.current.clear();
  };

  const handleSaveSignature = () => {
    setSignature(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'));
  };

  const renderItems = () => {
    return items.map((item, index) => (
      <div key={index} className='items'>
        <label htmlFor={`itemDescription${index}`}>Description:</label>
        <input
          type="text"
          id={`itemDescription${index}`}
          placeholder='Description'
          value={item.description}
          onChange={(e) => handleItemChange(index, 'description', e.target.value)}
        />

        <label htmlFor={`unitPrice${index}`}>Unit Price:</label>
        <input
          type="number"
          id={`unitPrice${index}`}
          placeholder='Unit Price'
          value={item.unitPrice}
          onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
        />

        <label htmlFor={`quantity${index}`}>Quantity:</label>
        <input
          type="number"
          id={`quantity${index}`}
          value={item.quantity}
          onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
        />
      </div>
    ));
  };

  return (
    <>
      <form className="invoice-form" onSubmit={handleSubmit}>
        <div className='soldBy'>
          <label htmlFor="sellerName">Sold By:</label>
          <input
            type="text"
            id="sellerName"
            placeholder='Seller Name'
            value={sellerName}
            onChange={(e) => setSellerName(e.target.value)}
          />
          <input
            type="text"
            id="sellerAddress"
            placeholder='Seller Address'
            value={sellerAddress}
            onChange={(e) => setSellerAddress(e.target.value)}
          />
        </div>

        <div className='billingAddress'>
          <label htmlFor="customerName">Billing Address:</label>
          <input
            type="text"
            id="customerName"
            placeholder='Customer Name'
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <input
            type="text"
            id="customerAddress"
            placeholder='Customer Address'
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
          />
        </div>

        <div className='docs'>
          <div>
            <label htmlFor="panNo">PAN No:</label>
            <input
              type="text"
              id="panNo"
              placeholder='Seller PAN No'
              value={panNo}
              onChange={(e) => setPanNo(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="gstNo">GST No:</label>
            <input
              type="text"
              id="gstNo"
              placeholder='Seller GST No'
              value={gstNo}
              onChange={(e) => setGstNo(e.target.value)}
            />
          </div>
        </div>

        <div className='shippingAddress'>
          <label htmlFor="shippingName">Shipping Address:</label>
          <input
            type="text"
            id="shippingName"
            placeholder='Customer Name'
            value={shippingName}
            onChange={(e) => setShippingName(e.target.value)}
          />
          <input
            type="text"
            id="shippingAddress"
            placeholder='Customer Address'
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
          />
          {/* Checkbox to sync shipping address */}
          <label>
            <input
              type="checkbox"
              onChange={handleSyncAddress}
            />
            Same as Billing Address
          </label>
        </div>

        <div className='orderDetails'>
          <label htmlFor="orderNumber">Order Number:</label>
          <input
            type="text"
            id="orderNumber"
            placeholder='Order Number'
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
          />
          <label htmlFor="orderDate">Order Date:</label>
          <input
            type="date"
            id="orderDate"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
          />
        </div>

        <div className='invoiceDetails'>
          <label htmlFor="stateCode">State Code:</label>
          <input
            type="text"
            id="stateCode"
            value={stateCode}
            onChange={(e) => setStateCode(e.target.value)}
          />
          <label htmlFor="placeOfSupply">Place of Supply:</label>
          <input
            type="text"
            id="placeOfSupply"
            value={placeOfSupply}
            onChange={(e) => setPlaceOfSupply(e.target.value)}
          />
          <label htmlFor="placeOfDelivery">Place of Delivery:</label>
          <input
            type="text"
            id="placeOfDelivery"
            value={placeOfDelivery}
            onChange={(e) => setPlaceOfDelivery(e.target.value)}
          />
          <label htmlFor="invoiceNumber">Invoice Number:</label>
          <input
            type="text"
            id="invoiceNumber"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
          />
          <label htmlFor="invoiceDetails">Invoice Details:</label>
          <input
            type="text"
            id="invoiceDetails"
            value={invoiceDetails}
            onChange={(e) => setInvoiceDetails(e.target.value)}
          />
          <label htmlFor="invoiceDate">Invoice Date:</label>
          <input
            type="date"
            id="invoiceDate"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
          />
        </div>

        <div className='signature'>
          <label htmlFor="signature">Seller Signature:</label>
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            canvasProps={{ className: 'signatureCanvas' }}
          />
          <button type="button" onClick={handleClearSignature}>Clear</button>
          <button type="button" onClick={handleSaveSignature}>Save</button>
        </div>

        {renderItems()
}


    <button type="button" onClick={handleAddItem}>Add Item</button>

    <button type="submit">Submit</button>
  </form>

  {/* Pass the invoice data to the InvoicePreview component */}
  <InvoicePreview 
    sellerName={sellerName} 
    sellerAddress={sellerAddress} 
    customerName={customerName} 
    customerAddress={customerAddress}
    panNo={panNo} 
    gstNo={gstNo} 
    shippingName={shippingName} 
    shippingAddress={shippingAddress} 
    orderNumber={orderNumber}
    orderDate={orderDate} 
    stateCode={stateCode} 
    placeOfSupply={placeOfSupply} 
    placeOfDelivery={placeOfDelivery}
    invoiceNumber={invoiceNumber} 
    invoiceDetails={invoiceDetails} 
    invoiceDate={invoiceDate} 
    items={items}
    signature={signature}
  />
</>
);
}

export default InvoiceForm;
