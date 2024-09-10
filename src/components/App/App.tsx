import './App.css';
import {
  allMars,
  deimos,
  phobos,
  polarIceCaps,
  rovers,
  olympusMons,
  ascraeusMons,
  pavonisMons,
  arsiaMons,
  vallesMarineris,
  argyrePlanitia,
  candorChasma,
  aresVallis
} from '../APICalls/APICalls';
import LandingPage from '../LandingPage/LandingPage';
import AllMarsMedia from '../AllMarsMedia/AllMarsMedia';
import DynamicMedia from '../DynamicMedia/DynamicMedia'
import Favorites from '../Favorites/Favorites';
import SingleMediaDetails from '../SingleMediaDetails/SingleMediaDetails';
import ErrorPage from '../ErrorPage/ErrorPage';

import { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

interface Photo {
  id: string;
  img_src: string;
  description: string;
  title: string;
  date_created: string;
}

export type MarsDataType = 'deimos' | 'phobos' | 'polarIceCaps' | 'rovers' | 'olympusMons' | 'ascraeusMons' | 'pavonisMons' | 'arsiaMons' | 'vallesMarineris' | 'argyrePlanitia' | 'candorChasma' | 'aresVallis' | '';

function App() {
  // State to hold data for all queries
  // Record
  const [marsData, setMarsData] = useState<Record<string, Photo[]>>({});
  const [userClick, setUserClick] = useState<MarsDataType>('');
  const [favorites, setFavorites] = useState<Photo[]>([]);

  // const [allMarsData, setAllMarsData] = useState<Photo[]>([]);

  const handleAddToFavorites = (photo: Photo) => {
    setFavorites(prevFavorites => 
    [...prevFavorites, photo]
    );
  }

  const fetchData = async (query: string, fetchFunction: () => Promise<Photo[]>) => {
    try {
      const data = await fetchFunction();
      setMarsData(prevData => ({
        ...prevData,
        [query]: data
      }));
      console.log(data, `${query} Data <><><><><><SNKFJ`);
    } catch (error) {
      console.log(`Error fetching ${query} data:`, error);
    }
  };

  useEffect(() => {
    fetchData('allMars', allMars);
    fetchData('rovers', rovers);
    fetchData('phobos', phobos);
    fetchData('deimos', deimos);
    fetchData('polarIceCaps', polarIceCaps);
    fetchData('olympusMons', olympusMons);
    fetchData('ascraeusMons', ascraeusMons);
    fetchData('pavonisMons', pavonisMons);
    fetchData('arsiaMons', arsiaMons);
    fetchData('vallesMarineris', vallesMarineris);
    fetchData('argyrePlanitia', argyrePlanitia);
    fetchData('candorChasma', candorChasma);
    fetchData('aresVallis', aresVallis);
  }, []);

  return (
    <>
      <LandingPage handleClick={setUserClick} />
      <Routes>
        <Route path='/AllMarsMedia' element={<AllMarsMedia
          allMarsData={marsData.allMars || []} 
          handleAddToFavorites={handleAddToFavorites}
          />} />
        <Route path='/mars/:media' element={<DynamicMedia
          data={marsData[userClick] || []} 
          handleAddToFavorites={handleAddToFavorites}
          />} />
        <Route path='/media/:id' element={
          marsData[userClick]?.find(photo => photo.id === useParams<{ id: string }>().id)
            ? <SingleMediaDetails 
                data={marsData[userClick]!.find(photo => photo.id === useParams<{ id: string }>().id)!}
                handleAddToFavorites={handleAddToFavorites}
              />
            : <ErrorPage error="Media not found" />
        } />
        <Route path='/favorites' element={<Favorites favorites={favorites} />} />
        <Route path='/error/:code' element={<ErrorPage error="Invalid URL" />} />
        <Route path='*' element={<ErrorPage error={404} />} />
      </Routes>
    </>
  );
}

export default App;