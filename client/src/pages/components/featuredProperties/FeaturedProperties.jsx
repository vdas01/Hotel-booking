import React from "react";
import "./featuredProperties.css";
import useFetch from "../../../hooks/useFetch";

const FeaturedProperties = () => {
  const {data,loading,error} = useFetch("/hotels?featured=true&limit=4")
console.log(data);
  return (
    <div className="fp">
       {loading ? "Loading" : <>
             {data.map((item,i)=>(
              <div className="fpItem" key={item._id}>
              <img
                src={item.photos[0]}
                alt="" className="fpImg"/>
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from ₹{item.cheapestPrice}</span>
              {item.rating && <div className="fpRating">
                <button>{item.rating}</button>
                <span>
                { item.rating >= 4.5 ? "Excellent" :
                   item.rating >= 4.0 ? "Very Good" :
                   item.rating >= 3.5 ? "Good":
                   item.rating >=3.0 ? "Average":
                   item.rating >= 2.5 ? "Okayish":
                   item.rating >= 1.5 ? "Not Good" :
                   "Poor"
                }
                </span>
              </div>}
            </div>

             ))}
       </>
       }
      

    

    </div>
  );
};

export default FeaturedProperties;
