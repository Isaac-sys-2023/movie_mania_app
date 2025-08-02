"use client";
import { MasterContext } from '@/context/MasterContext';
import React, { useContext, useRef } from 'react';
import SliderSingle from '../SliderSingle/SliderSingle';
import { Movie } from '@/type/MovieType';

const SliderContainer = () => {
    const { movies } = useContext(MasterContext);

    const carouselRef = useRef<HTMLDivElement>(null);
    const scroll = (direction: 'left' | 'right') => {
        if (carouselRef.current) {
            const scrollAmount = 300; // Ajusta el desplazamiento deseado
            carouselRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="my-10 relative">
            <h2 className="text-2xl text-yellow-500 font-bold ml-16 mb-8 flex justify-between">In Cinemas <span className="text-[10px] md:mr-16 mr-4">Slide left to see more &gt;&gt;&gt;</span></h2>
            
            <button
                onClick={() => scroll('left')}
                className="absolute left-5 top-1/2 transform bg-black bg-opacity-60 text-white p-2 w-12 h-12 rounded-full z-10 flex items-center justify-center hover:bg-yellow-500 hover:scale-110 transition"
            >
                ❮
            </button>

            <div ref={carouselRef} className="carousel carousel-end rounded-box overflow-x-auto scroll-smooth">
                {movies.map((movie, index) => <SliderSingle key={index} movie={movie as Movie}/>)}
            </div>

            <button
                onClick={() => scroll('right')}
                className="absolute right-5 top-1/2 transform bg-black bg-opacity-60 text-white p-2 w-12 h-12 rounded-full z-10 flex items-center justify-center hover:bg-yellow-500 hover:scale-110 transition"
            >
                ❯
            </button>
        </div>
    );

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    //     }, 3000);

    //     return () => clearInterval(interval);
    // }, [movies.length]);

    // return (
    //     <div className="my-10">
    //         <h2 className="text-2xl text-yellow-500 font-bold ml-16 mb-8 flex justify-between">In Cinemas <span className="text-[10px] md:mr-16 mr-4">Slide left to see more &gt;&gt;&gt;</span></h2>
    //         <div className="carousel carousel-end rounded-box">
    //             {movies.map((movie, index) => <SliderSingle key={index} movie={movie} />)}
    //         </div>
    //     </div>
    // );
};

export default SliderContainer;
