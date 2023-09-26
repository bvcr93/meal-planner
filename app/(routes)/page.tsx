import NewMealForm from "@/components/ui/NewMealForm";
import { getMeals } from "@/lib/meals";
interface Product {
  id?: string;
  product: string;
  price: string;
}
export default async function Home() {
  const { meals } = await getMeals();
  console.log(meals);
  // const res = await fetch(
  //   "https://651319488e505cebc2e993a0.mockapi.io/product",
  //   {
  //     cache: "no-cache",
  //     next: {
  //       tags: ["product"],
  //     },
  //   }
  // );
  // const products: Product[] = await res.json();

  // const addProduct = async (e: FormData) => {
  //   "use server";
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
      <NewMealForm />
      {meals?.map((meal) => (
        <div>
          {meal.name} {meal.description}
        </div>
      ))}
    </div>
  );
}
