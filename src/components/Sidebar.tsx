import React, { useState } from 'react';
import { Pane, Heading, Image } from "evergreen-ui";


// Importing SVGs explicitly
import image1 from "../assets/image1.svg";
import image2 from "../assets/image2.svg";
import image3 from "../assets/image3.svg";
import image4 from "../assets/image4.svg";
import image5 from "../assets/image5.svg";
import image6 from "../assets/image6.svg";
import image7 from "../assets/image7.svg";
import image8 from "../assets/image8.svg";
import image9 from '../assets/image9.svg';
import image10 from '../assets/image10.svg'
import Component9 from './Component9.tsx';

const components = [
  () => <div>
    <Component9/>
  </div>,
  () => <div>Component for Image 1</div>,
  () => <div>Component for Image 2</div>,
  () => <div>Component for Image 3</div>,
  () => <div>Component for Image 4</div>,
  () => <div>Component for Image 5</div>,
  () => <div>Component for Image 6</div>,
  () => <div>Component for Image 7</div>,
  () => <div>Component for Image 8</div>,
  () => <div>Component for Image 10</div>,
];

const Sidebar: React.FC = () => {
  const [selectedComponentIndex, setSelectedComponentIndex] = useState<number | null>(null);

  const images = [
    image9,
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image10
  ];

  const SelectedComponent = selectedComponentIndex !== null ? components[selectedComponentIndex] : null;

  return (
    <Pane display="flex">
      <Pane width={100} padding={20} background="white" borderRight>
       
        <Pane display="flex" flexDirection="column" gap={30}>
          {images.map((image, index) => (
            <Image 
              key={index} 
              src={image} 
              alt={`Sidebar item ${index + 1}`} 
              height={60} 
              borderRadius={4} 
              objectFit="cover"
              onClick={() => setSelectedComponentIndex(index)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </Pane>
      </Pane>

      <Pane flex={1} padding={16}>
        {SelectedComponent ? <SelectedComponent /> : <div>Select an item from the sidebar</div>}
      </Pane>
    </Pane>
  );
};

export default Sidebar;