"use client";
import axios from "axios";
import { LoaderPinwheel } from "lucide-react";
import { useState } from "react";

type CardProps = {
  item: {
    title: string;
    description: string;
    price: number;
    image: string;
  };
};

const Card = ({ item }: CardProps) => {
  const [loading, setLoading] = useState(false);
  const checkout = async () => {
    setLoading(true);
    // try {
    //   const res = await fetch("/api/zahlung", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       title: item.title,
    //     price: item.price,
    //      image: item.image,
    //     }),
    //   });
    //   const data = await res.json();
    //   console.log(data);
    //   window.location.href = data.url;
    // } catch (error) {
    //   console.error("Error: ", error);
    // } finally {
    //   setLoading(false);
    // }
    try {
      const res = await axios.post("/api/zahlung", {
        title: item.title,
        price: item.price,
        image: item.image,
      });
      const Responsdata = await res.data;
      console.log(Responsdata);
      window.location.href = Responsdata.url;
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
      <img
        src={item.image}
        alt={`Image of ${item.title}`}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
        <p className="text-white bg-red-500 hover:bg-red-600 rounded-md p-2 absolute top-2 right-2 mb-2">
          {item.price}€ / ein platz
        </p>
        <p className="text-gray-700 mb-4">{item.description}</p>
        <button
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 p-2 rounded-md text-white"
          onClick={checkout}
        >
          {loading ? <LoaderPinwheel /> : "kaufen"}
        </button>
      </div>
    </div>
  );
};
export default Card;
