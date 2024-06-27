import React from 'react';
import html2pdf from 'html2pdf.js';
import img from "./assets/logo.png";
import "./assets/invoicePreview.css";

const InvoicePreview = ({
  sellerName, sellerAddress, customerName, customerAddress,
  panNo, gstNo, shippingName, shippingAddress, orderNumber,
  orderDate, stateCode, placeOfSupply, placeOfDelivery,
  invoiceNumber, invoiceDetails, invoiceDate, items, signature
}) => {
  const shippingCharge = 30;
  const taxRate = 0.05; // Total tax rate (2.5% CGST + 2.5% SGST)
  const individualTaxRate = taxRate / 2; // 2.5% CGST and 2.5% SGST

  // Calculate totals
  const netAmount = items.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  const taxAmount = netAmount * individualTaxRate * 2;
  const shippingTaxAmount = shippingCharge * individualTaxRate * 2;
  const totalAmount = netAmount + taxAmount + shippingCharge + shippingTaxAmount;

  // Function to handle PDF generation and download
  const handleDownloadPDF = () => {
    const element = document.getElementById('invoice-preview'); // Get the DOM element to be converted to PDF

    html2pdf(element, {
      margin: 1,
      filename: 'invoice.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    });
  };

  return (
    <div className="invoice-preview-container">
      <div id="invoice-preview" className="invoice-preview">
        <div className='head'>
          <img src={img} alt="Logo" className="invoice-logo" />
          <h1 className="invoice-title">Tax Invoice/Bill of Supply/Cash Memo</h1>
        </div>
        <div className="row">
          <div className="column">
            <div className="seller-info">
              <h3>Sold By:</h3>
              <p>{sellerName}</p>
              <p>{sellerAddress}</p>
              <p>GST No: {gstNo}</p>
              <p>PAN No: {panNo}</p>
            </div>
            <div className="shipping-info">
              <h3>Shipping Address:</h3>
              <p>{shippingName}</p>
              <p>{shippingAddress}</p>
            </div>
          </div>
          <div className="column">
            <div className="billing-info">
              <h3>Billing Address:</h3>
              <p>{customerName}</p>
              <p>{customerAddress}</p>
            </div>
            <div className="invoice">
              <h3>Invoice Details:</h3>
              <p>State Code: {stateCode}</p>
              <p>Place of Supply: {placeOfSupply}</p>
              <p>Place of Delivery: {placeOfDelivery}</p>
              <p>Invoice Number: {invoiceNumber}</p>
              <p>Invoice Details: {invoiceDetails}</p>
              <p>Invoice Date: {invoiceDate}</p>
            </div>
          </div>
          <div className="column">
            <div className="order-info">
              <h3>Order Details:</h3>
              <p>Order Number: {orderNumber}</p>
              <p>Order Date: {orderDate}</p>
            </div>
            <div className="invoice-details">
              <h3>PAN/GST Details:</h3>
              <p>PAN No: {panNo}</p>
              <p>GST No: {gstNo}</p>
            </div>
          </div>
        </div>
        
        {/* Items Table and Summary */}
        <div className="items-table">
          <h3>Items:</h3>
          <table>
            <thead>
              <tr>
                <th>SL No.</th>
                <th>Description</th>
                <th>Unit Price</th>
                <th>Qty</th>
                <th>Net Amount</th>
                <th>CGST @2.5%</th>
                <th>SGST @2.5%</th>
                <th>Tax Amount</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                const netItemAmount = item.unitPrice * item.quantity; // Calculate net item amount

                const itemTaxAmount = netItemAmount * individualTaxRate;
                const itemTotalAmount = netItemAmount + itemTaxAmount * 2;

                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.description}</td>
                    <td>{item.unitPrice}</td>
                    <td>{item.quantity}</td>
                    <td>{typeof netItemAmount === 'number' ? netItemAmount.toFixed(2) : 'N/A'}</td>
                    <td>{(itemTaxAmount / 2).toFixed(2)}</td>
                    <td>{(itemTaxAmount / 2).toFixed(2)}</td>
                    <td>{itemTaxAmount.toFixed(2)}</td>
                    <td>{itemTotalAmount.toFixed(2)}</td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan="4"><strong>Total</strong></td>
                <td><strong>{netAmount.toFixed(2)}</strong></td>
                <td colSpan="2"></td>
                <td><strong>{taxAmount.toFixed(2)}</strong></td>
                <td><strong>{totalAmount.toFixed(2)}</strong></td>
              </tr>
              <tr>
                <td colSpan="7"><strong>Shipping Details</strong></td>
              </tr>
              <tr>
                <td colSpan="4">Shipping Charges</td>
                <td>{shippingCharge.toFixed(2)}</td>
                <td colSpan="2"></td>
                <td>{(shippingTaxAmount / 2).toFixed(2)}</td>
                <td>{shippingCharge.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="4">Shipping CGST @2.5%</td>
                <td>{(shippingTaxAmount / 2).toFixed(2)}</td>
                <td colSpan="2"></td>
                <td>{(shippingTaxAmount / 2).toFixed(2)}</td>
                <td></td>
              </tr>
              <tr>
                <td colSpan="4">Shipping SGST @2.5%</td>
                <td>{(shippingTaxAmount / 2).toFixed(2)}</td>
                <td colSpan="2"></td>
                <td>{(shippingTaxAmount / 2).toFixed(2)}</td>
                <td></td>
              </tr>
              <tr>
                <td colSpan="4"><strong>Total Shipping Amount</strong></td>
                <td>{shippingCharge.toFixed(2)}</td>
                <td colSpan="2"></td>
                <td>{shippingTaxAmount.toFixed(2)}</td>
                <td>{shippingCharge.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="4"><strong>Grand Total</strong></td>
                <td colSpan="4"></td>
                <td><strong>{totalAmount.toFixed(2)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="signature">
          <h3>Signature:</h3>
          {signature ? (
            <img src={signature} alt="Seller Signature" />
          ) : (
            <p>No signature provided.</p>
          )}
        </div>
      </div>
      {/* Button to download PDF */}
      <div className="pdf-buttons">
        <button className="btn-download" onClick={handleDownloadPDF}>Download PDF</button>
      </div>
    </div>
  );
};

export default InvoicePreview;
