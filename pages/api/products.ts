import { Product } from "home/src/types";
import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   name: string;
// };

// export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
//   console.log({ req });
//   res.status(200).json({ name: "from product" });
// }

let products: Product[] = [
  {
    id: "1",
    title: "Product 1",
    price: 24.99,
    description: "This is a short description for Product 1.",
    category: "Electronics",
    image: "https://picsum.photos/200?random=1",
    quantity: 90,
  },
  {
    id: "2",
    title: "Product 2",
    price: 49.99,
    description: "This is a short description for Product 2.",
    category: "Clothing",
    image: "https://picsum.photos/200?random=2",
    quantity: 9,
  },
  {
    id: "3",
    title: "Product 3",
    price: 15.75,
    description: "This is a short description for Product 3.",
    category: "Home",
    image: "https://picsum.photos/200?random=3",
    quantity: 120,
  },
  {
    id: "4",
    title: "Product 4",
    price: 89.99,
    description: "This is a short description for Product 4.",
    category: "Sports",
    image: "https://picsum.photos/200?random=4",
    quantity: 89,
  },
  {
    id: "5",
    title: "Product 5",
    price: 39.99,
    description: "This is a short description for Product 5.",
    category: "Books",
    image: "https://picsum.photos/200?random=5",
    quantity: 90,
  },
  {
    id: "6",
    title: "Product 6",
    price: 72.49,
    description: "This is a short description for Product 6.",
    category: "Electronics",
    image: "https://picsum.photos/200?random=6",
    quantity: 900,
  },
  {
    id: "7",
    title: "Product 7",
    price: 29.95,
    description: "This is a short description for Product 7.",
    category: "Clothing",
    image: "https://picsum.photos/200?random=7",
    quantity: 590,
  },
  {
    id: "8",
    title: "Product 8",
    price: 55.5,
    description: "This is a short description for Product 8.",
    category: "Home",
    image: "https://picsum.photos/200?random=8",
    quantity: 740,
  },
  {
    id: "9",
    title: "Product 9",
    price: 64.99,
    description: "This is a short description for Product 9.",
    category: "Sports",
    image: "https://picsum.photos/200?random=9",
    quantity: 190,
  },
  {
    id: "10",
    title: "Product 10",
    price: 19.99,
    description: "This is a short description for Product 10.",
    category: "Books",
    image: "https://picsum.photos/200?random=10",
    quantity: 980,
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      res.status(200).json(products);
      break;
    case "POST":
      const newProduct = req.body;
      newProduct.id = products.length + 1;
      products.push(newProduct);
      res.status(201).json(newProduct);
      break;
    case "PUT":
      const { id, ...fields } = req.body;
      const productIndex = products.findIndex((p) => p.id === id);
      if (productIndex !== -1) {
        products[productIndex] = { ...products[productIndex], ...fields };
        res.status(200).json(products[productIndex]);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
      break;
    case "DELETE":
      const { id: deleteId } = req.body;
      products = products.filter((p) => p.id !== deleteId);
      res.status(200).json({ message: "Product deleted" });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
