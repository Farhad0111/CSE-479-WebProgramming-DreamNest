import { GiBoatFishing } from "react-icons/gi";
import { FaCarBattery, FaCity, FaFireExtinguisher } from "react-icons/fa";
import {
  FaHouseUser,
  FaPeopleRoof,
  FaKitchenSet,
  FaTreeCity,
} from "react-icons/fa6";
import {
  BiSolidWasher,
  BiSolidDryer,
  BiSolidFirstAid,
  BiWifi,
  BiSolidFridge,
  BiWorld,
} from "react-icons/bi";
import { BsSnow, BsFillDoorOpenFill, BsPersonWorkspace } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import {
  MdMicrowave,
  MdBalcony,
  MdYard,
  MdOutlineRoofing,
  MdElevator,
  MdGasMeter,
  MdFamilyRestroom,
} from "react-icons/md";
import {
  PiBathtubFill,
  PiBowlFoodFill,
  PiStairsDuotone,
  PiTelevisionFill,
} from "react-icons/pi";
import { GiHeatHaze, GiCctvCamera, GiToaster } from "react-icons/gi";
import { AiFillCar } from "react-icons/ai";
import { SiFireship } from "react-icons/si";
import { HiUserGroup } from "react-icons/hi";

export const categories = [
  {
    label: "All",
    icon: <BiWorld />,
  },
  {
    img: "assets/large_cat.jpeg",
    label: "Large Family",
    icon: <FaPeopleRoof />,
    description: "This property is big enough for joint families",
  },
  {
    img: "assets/small_cat.jpeg",
    label: "Small Family",
    icon: <MdFamilyRestroom />,
    description: "This property is for single families",
  },
  {
    img: "assets/city_cat.jpg",
    label: "City",
    icon: <FaCity />,
    description: "This property is in the heart of the city",
  },
  {
    img: "assets/village_cat.jpg",
    label: "Village",
    icon: <FaTreeCity />,
    description: "This property is in the village",
  },
  {
    img: "assets/lake_cat.jpg",
    label: "Lakefront",
    icon: <GiBoatFishing />,
    description: "This property is near a lake!",
  },
  {
    img: "assets/luxury_cat.jpg",
    label: "Luxury",
    icon: <IoDiamond />,
    description: "This property is brand new and luxurious!",
  },
];

export const types = [
  {
    name: "An entire apartment/house for family",
    description: "Guests have a large place to themselves for families",
    icon: <FaHouseUser />,
  },
  {
    name: "Sublet",
    description:
      "Guests have their own room in a house with a family, plus access to shared places",
    icon: <BsFillDoorOpenFill />,
  },
  {
    name: "A Seat in a Shared Room",
    description:
      "Guests sleep in a room or common area that maybe shared with you or other male member(s)",
    icon: <HiUserGroup />,
  },
];

export const facilities = [
  {
    name: "Air Conditioning",
    icon: <BsSnow />,
  },
  {
    name: "Bath tub",
    icon: <PiBathtubFill />,
  },
  {
    name: "Cooking set",
    icon: <FaKitchenSet />,
  },
  {
    name: "Dedicated workspace",
    icon: <BsPersonWorkspace />,
  },
  {
    name: "Dryer",
    icon: <BiSolidDryer />,
  },
  {
    name: "Elevator",
    icon: <MdElevator />,
  },
  {
    name: "First Aid",
    icon: <BiSolidFirstAid />,
  },
  {
    name: "Fire exit",
    icon: <PiStairsDuotone />,
  },
  {
    name: "Fire extinguisher",
    icon: <FaFireExtinguisher />,
  },
  {
    name: "Free parking",
    icon: <AiFillCar />,
  },
  {
    name: "Gas",
    icon: <SiFireship />,
  },
  {
    name: "Garden",
    icon: <MdYard />,
  },
  {
    name: "Generator",
    icon: <FaCarBattery />,
  },
  {
    name: "Heating",
    icon: <GiHeatHaze />,
  },
  {
    name: "LPG",
    icon: <MdGasMeter />,
  },
  {
    name: "Meal",
    icon: <PiBowlFoodFill />,
  },
  {
    name: "Microwave",
    icon: <MdMicrowave />,
  },
  {
    name: "Private Balcony",
    icon: <MdBalcony />,
  },
  {
    name: "Refrigerator",
    icon: <BiSolidFridge />,
  },
  {
    name: "Roof top",
    icon: <MdOutlineRoofing />,
  },
  {
    name: "Security cameras",
    icon: <GiCctvCamera />,
  },
  {
    name: "Stove",
    icon: <GiToaster />,
  },
  {
    name: "TV",
    icon: <PiTelevisionFill />,
  },
  {
    name: "Washer",
    icon: <BiSolidWasher />,
  },
  {
    name: "Wifi",
    icon: <BiWifi />,
  },
];
