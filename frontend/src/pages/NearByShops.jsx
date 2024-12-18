import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

const App = () => {
  const [nearbyShops, setNearbyShops] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user's current location using Geolocation API
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async position => {
              const { latitude, longitude } = position.coords;
              // Fetch nearby shops using user's location
              const response = await axios.get('http://localhost:3500/api/find-nearest-store', {
                params: { latitude, longitude }
              });

              setNearbyShops(response.data.store_data);
            },
            error => {
              setError('Error getting user location');
            }
          );
        } else {
          setError('Geolocation is not supported by this browser');
        }
      } catch (error) {
        setError('Error fetching nearby shops');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header activeHeading={3} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Nearby Shops</h1>
        {error && <p>{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {nearbyShops.length === 0 ? (
            <p>No nearby shops found</p>
          ) : (
            nearbyShops.map((shop, index) => (
              <Link to={`/shop/preview/${shop?._id}`} key={index} className="rounded overflow-hidden shadow-md bg-white hover:shadow-lg transition duration-300">
                <img src={`http://localhost:3500/api/images/${shop.avatar}`} alt={shop.name} className="w-full h-56 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{shop.name}</h3>
                  <p className="text-gray-700">{shop.address}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
