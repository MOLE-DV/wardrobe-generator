import './sass/mobile/generator.sass';
import { useContext, createContext, useState } from 'react';
import React from 'react'
import { Importer } from './Typescript/importer';

interface IContext {
    images: string[];
    setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export const Context = React.createContext<IContext>({
    images: [],
    setImages: () => {},
});


const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


export const Generator = () => {
    const [images, setImages] = useState([] as any);
    

    let [spinning, setSpinning] = useState(false);

    const handleSpin = async () => {
        setSpinning(true);
        const images = Array.from(document.getElementsByClassName('images') as HTMLCollectionOf<HTMLElement>);

        let imagesPositions = [] as number[]
        images.forEach((image, index) => {imagesPositions.push(0 + (100 * index))})
        
        let speed = Math.random() * 20 + 10;
        let randomDecreement = Math.random() * .1 + .01;

        // let speed = 1;
        // let randomDecreement = 0;
        while (speed > 0){

            images.forEach((image, index) => {
                if(imagesPositions[index] <= -100){
                    imagesPositions[index] += 100 * imagesPositions.length - 1 - 100
                }

                imagesPositions[index] -= speed;

                
                image.style.transform = `translateX(${imagesPositions[index]}%)`;
            });
            speed -= randomDecreement;
            await sleep(5);
        }

        let item = {
            closestValue: 1000,
            closestItem: null as HTMLElement | null,
            pos: 0,
        }

        images.forEach((image, index) => {
            let closeValue = Math.abs(50 - imagesPositions[index] - 50);

            
            if(closeValue < item.closestValue){
                item.closestValue = closeValue
                item.closestItem = image
                item.pos = Number(imagesPositions[index].toFixed(4));
            }
        })


        console.log(item.closestItem);

        while(!(Math.round(item.pos) == 0)){
            let diff = Number(((0 - item.pos) / 102).toFixed(4));

            item.pos += Number(diff)
            item.pos = Number(item.pos);

            
            images.forEach((image, index) => {
                imagesPositions[index] += Number(diff)

                image.style.transform = `translateX(${imagesPositions[index]}%)`;
                // console.log(imagesPositions[index] + diff)
            })
            
            await sleep(5);
        }
        
        setSpinning(false);
    }

    return (
        <div id="generator">
            <Context.Provider value={{ images, setImages } as any}>
                <div id="slider">
                    <div id="images">
                        {images.map((image: any, index: any) => {
                            return <img key={index} src={URL.createObjectURL(image)} alt={image.name} style={{transform: `translateX(${index * 100}%)`}} className='images'/>
                        })}
                        {images.length > 0 && !spinning ? <button id="spin" onClick={handleSpin}>Spin</button> : null}
                    </div>
                    <Importer />
                </div>
            </Context.Provider>
        </div>
    );
}