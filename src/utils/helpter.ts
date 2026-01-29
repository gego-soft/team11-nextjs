// Create a helper function to format the address
export const formatAddress = (address: string | { 
  address_1?: string; 
  address_2?: string; 
  locality?: string; 
  city?: string; 
  state?: string; 
  pincode?: string; 
  country?: string; 
} | null) => {
  if (!address) return "Not provided";
  
  if (typeof address === 'string') {
    try {
      // Try to parse if it's a JSON string
      const parsed = JSON.parse(address);
      return formatAddressObject(parsed);
    } catch {
      // If not valid JSON, return as is
      return address;
    }
  }
  
  // If it's already an object
  return formatAddressObject(address);
};

export const formatAddressObject = (address: { 
  address_1?: string; 
  address_2?: string; 
  locality?: string; 
  city?: string; 
  state?: string; 
  pincode?: string; 
  country?: string; 
}) => {
  const parts = [];
  
  if (address.address_1) parts.push(address.address_1);
  if (address.address_2) parts.push(address.address_2);
  if (address.locality) parts.push(address.locality);
  if (address.city) parts.push(address.city);
  if (address.state) parts.push(address.state);
  if (address.pincode) parts.push(address.pincode);
  if (address.country) parts.push(address.country);
  
  return parts.join(', ') || "Not provided";
};

