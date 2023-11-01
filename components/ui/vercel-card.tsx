
import { CardTitle, CardDescription, Card } from "@/components/ui/card"
import Image from "next/image"

export default function VercelCard() {
  return (
    <Card className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <Image
            alt="food image"
            className="h-48 w-full object-cover md:h-full md:w-48"
            height="300"
            src="/placeholder.svg"
            style={{
              aspectRatio: "500/300",
              objectFit: "cover",
            }}
            width="500"
          />
        </div>
        <div className="p-8">
          <CardTitle className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Delicious Food
          </CardTitle>
          <CardDescription className="block mt-1 text-lg leading-tight font-medium text-black">
            Short food description.
          </CardDescription>
          <div className="mt-2 text-gray-500">Cooking time: 30 min. Ingredients: Flour, sugar, eggs.</div>
          <div className="mt-4">
            <div className="flex items-center">
              <svg
                className=" w-4 h-4 fill-primary"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <svg
                className=" w-4 h-4 fill-primary"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <svg
                className=" w-4 h-4 fill-primary"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <svg
                className=" w-4 h-4 fill-primary"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <svg
                className=" w-4 h-4 fill-muted stroke-muted-foreground"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="ml-2 text-sm text-gray-600">4.0</span>
            </div>
            <div className="mt-2 text-gray-500">200 reviews</div>
          </div>
        </div>
      </div>
    </Card>
  )
}
