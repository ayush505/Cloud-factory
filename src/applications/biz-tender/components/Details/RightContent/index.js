import { getCurrencyFormattedAmount } from 'commons/Utils';
import React from 'react';
import { useSelector } from 'react-redux';
import DocumentsContent from './DocumentsContent';
import ItemList from './ItemList';
import MinimumRequirements from './MinimumRequirements';

export default function Index() {
  const data = useSelector((state) => state.bizTender.Details.data);
  const { itemDetails, hsnCode, quantity, itemPrice } = data;

  const items = itemDetails?.map((item) => ({
    item,
    quantity,
    hsn: hsnCode,
    price: getCurrencyFormattedAmount(itemPrice)
  }));

  return (
    <>
      <ItemList items={items} />
      <DocumentsContent data={data} />
      <MinimumRequirements data={data} />
    </>
  );
}
