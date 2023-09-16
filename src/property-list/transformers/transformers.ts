import { Address } from "../interfaces/propertyDescription";

export const formatCurrency = (price) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
      });
    return formatter.format(price);
}

export const formatAddress = (address: Address) => {
    const fullAddress = `${address.street}, ${address.city}, ${address.state} ${address.zip}`
    return fullAddress;
}