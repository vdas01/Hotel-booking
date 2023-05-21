import React from "react";
import "./propertyList.css"
import useFetch from "../../../hooks/useFetch";

const PropertyList = () => {
  const {data,loading,error} = useFetch("/hotels/countByType")
  console.log(data);
 const images = [
  "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
  "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
  "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
  "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
  ]

          
  return (
    <div className="pList">
     {loading ? "Loading" :
      <> 
        
        { data && images.map((img,index)=>(
          <div className="pListItem" key={Math.random()}>
            <img src={img} className="pListImg" alt="img"/>
            <div className="pListTitles">
              <h1>{data[index] ? data[index].type : ""}</h1>
               <h2>{data[index] ? data[index].count : 0} {data[index] ? data[index].type : ""}</h2>
           </div>
        </div>

        ))

        }
      </>
    }
    </div>
  );
};

export default PropertyList;
