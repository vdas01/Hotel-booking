import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async (req,res,next)=>{
    const newHotel = new Hotel(req.body);
  try{
       const savedHotel = await newHotel.save();
       res.status(200).json(savedHotel);
  }
  catch(error){
    // res.status(500).json(error);
    next(error);
  }
};

export const updateHotel = async (req,res,next)=>{
   try{
     const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id,{$set: req.body},{new:true});
     res.status(200).json(updatedHotel);
}
catch(error){
    next(error);
}
};

export const deleteHotel = async (req,res,next)=>{
    try{
       await Hotel.findByIdAndDelete(req.params.id);
       res.status(200).json("Hotel has been deletd");
  }
  catch(error){
    next(error);
  }
};

export const getHotel = async (req,res,next)=>{
    try{
        const hotel = await Hotel.findById(req.params.id);
         res.status(200).json(hotel);
    }
    catch(error){
     next(error);
    }
};


export const getHotels = async (req,res,next)=>{
  const {min,max,...others} = req.query;
    try{
        const hotels = await Hotel.find({...others, cheapestPrice:{$gte:min || 1,$lte:max || 99999 }}).limit(req.query.limit);
         res.status(200).json(hotels);
    }
    catch(error){
     
      next(error);
    }
};

export const countByCity = async (req,res,next)=>{

  const cities = req.query.cities.split(",");

  try{
      const list = await Promise.all(cities.map(city=>{
        // return Hotel.find({city}).length
        return Hotel.countDocuments({city});
      }));
    
       res.status(200).json(list);
  }
  catch(error){
   
    next(error);
  }
};

export const countByType = async (req,res,next)=>{

  try{
     const hotelCount =await Hotel.countDocuments({type:"Hotel"});
     const resturantCount =await Hotel.countDocuments({type:"Resturant"});
     const apartmentCount =await Hotel.countDocuments({type:"Apartment"});
     const villaCount =await Hotel.countDocuments({type:"villa"});

     res.status(200).json([
      {type:"hotels",count:hotelCount},
      {type:"apartments",count:apartmentCount},
      {type:"villas",count:villaCount},
      {type:"resturants",count:resturantCount}
     ]);

  }
  catch(error){
   
    next(error);
  }
};

export const getHotelRooms = async(req,res,next) =>{
  try{
        const hotel =await Hotel.findById(req.params.id);
        const list = await Promise.all(hotel.rooms.map((room)=>{
          return Room.findById(room);
        }));

       return res.status(200).json(list);
  }
  catch(err){
     next(err);
  }
}

