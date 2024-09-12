import axios from 'axios';


export const fetchCategories = () => {
  return axios.get('http://do-env.xyz/api/v1/menuCategory?filter[account]=2')
    .then(response => response.data.result.data)
    .catch(error => {
      console.error('Error fetching categories:', error);
      return [];
    });
};
export const fetchAllProducts = () => {
  return axios.get(Api)
    .then(response => response.data.result.data)
    .catch(error => {
      console.error('Error fetching products:', error);
      return [];
    }); 
};

export const fetchProductsByCategory = (categoryId) => {
  return axios.get(GG)
    .then(response => response.data.result.data)
    .catch(error => {
      console.error(`Error fetching products for category ${categoryId}:`, error);
      return [];
    });
};





export const fetchProductDetails = (productId) => {
  return axios.get(`http://do-env.xyz/api/v1/product/show?id=${productId}`)
    .then(response => response.data.result.data)
    .catch(error => {
      console.error(`Error fetching details for product ${productId}:`, error);
      return null;
    });
};
