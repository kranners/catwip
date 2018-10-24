// For requesting to the Yelp API, made for Catwhip/Unnamed App
// Aaron Pierce 7/2018

const apiKey = 'OdeHnyVwAcgIKIbHDyZRY3iBdcmXtWcLtVfpd2aOEHoUHzeCtaq2yDiFp_zO7hja8Yad4eLXc4MyDJ45X2zDph0ksTIh_kkjNpgx2iwj8I07UY6RlzAr-qsMjURUW3Yx';
export const Yelp = {
  search(term, location, sortBy){
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,{
      headers:{
        Authorization: `Bearer ${apiKey}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if(jsonResponse.businesses) {
        return jsonResponse.businesses.map(business => {
          return {
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories.title,
            rating: business.rating,
            reviewCount: business.review_count
          }
        });
      }
    });
  }
}
