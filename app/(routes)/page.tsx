import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import easy from "../../public/easy.jpg";
import fruits from "../../public/fruits.jpg";
import meallanding from "../../public/meal-landing.jpg";
import soup from "../../public/soup.jpg";

export default async function Home() {
  //   const product = e.get("product")?.toString();
  //   const price = e.get("price")?.toString();
  //   if (!product || !price) return;
  //   const newProduct: Product = {
  //     product,
  //     price,
  //   };
  //   await fetch("https://651319488e505cebc2e993a0.mockapi.io/product", {
  //     method: "POST",
  //     body: JSON.stringify(newProduct),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   revalidateTag("product");
  // };
  return (
    <div className="maincol  h-screen">
      <div className="mt-10 h-[500px] md:flex ">
        <div className="basis-1/2 flex flex-col items-start justify-center pr-[150px] leading-normal space-y-5">
          <h2 className="text-4xl">
            The easiest way to make your favourite meal
          </h2>
          <p>
            Discover the best recipes from around the world and learn how to
            cook them at home
          </p>
          <Link href={`/explore/recipes`}>
            <Button>Get Started</Button>
          </Link>
        </div>
        <div className="basis-1/2 flex items-center justify-center ">
          <Image
            alt=""
            className="rounded-full w-[500px] h-[500px] object-cover hidden md:flex"
            src={meallanding}
            width={1000}
          />
        </div>
      </div>
      <div className="md:mt-20">
      
          <h2 className="text-4xl">Discover</h2>

        <div className="md:col-span-2 mt-10">
          <div className="lg:flex sm:grid sm:grid-cols-2 grid-cols-1 gap-5 mt-20 space-y-10 md:space-y-0">
          <div className="flex flex-col items-center justify-center">
              <Image
                alt=""
                className="rounded-full w-[300px] h-[300px] object-cover shadow-2xl"
                src={soup}
                width={1000}
              />
              <p className="mt-10 w-2/3 mx-auto">
                lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Image
                alt=""
                className="rounded-full w-[300px] h-[300px] object-cover shadow-2xl"
                src={easy}
                width={1000}
              />
              <p className="mt-10 w-2/3 mx-auto">
                lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Image
                alt=""
                className="rounded-full w-[300px] h-[300px] object-cover shadow-2xl"
                src={fruits}
                width={1000}
              />
              <p className="mt-10 w-2/3 mx-auto">
                lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
