import soup from "./public/soup.jpg";
import easy from "./public/easy.jpg";
import fruits from "./public/fruits.jpg";
import { StaticImageData } from "next/image";
interface Item {
  src: StaticImageData;
  alt: string;
  description: string;
}

export const items: Item[] = [
  {
    src: soup,
    alt: "Soup Image",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
  },
  {
    src: easy,
    alt: "Easy Image",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
  },
  {
    src: fruits,
    alt: "Fruits Image",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
  },
];
