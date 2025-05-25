import type { Request, Response } from "express";
import { sql } from "../config/db.ts";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await sql`
        SELECT * FROM Products
        ORDER BY created_at DESC
        `;
    console.log("fetched products", products);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error in getProducts function", error);
    res.status(500).json({ success: false, message: "Internal server Error" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, image } = req.body;
  if (!name || !price || !image) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  try {
    const newProduct = await sql`
    INSERT INTO products(name, price, image)
    VALUES (${name},${price},${image})  
    RETURNING *  
    `;
    console.log("new product added", newProduct[0]);
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log("Error in createProduct function", error);
    res.status(500).json({ success: false, message: "Internal server Error" });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await sql`
    SELECT * FROM products WHERE id=${id}
    `;

    res.status(200).json({ success: true, data: product[0] });
  } catch (error) {
    console.log("Error in getProduct function", error);
    res.status(500).json({ success: false, message: "Internal server Error" });
  }
};
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { name, price, image } = req.body;

  try {
    const updatedProduct = await sql`
  UPDATE products
  SET name=${name}, price=${price}, image=${image}
  WHERE id=${id}
  RETURNING *
`;

    if (updatedProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    res.status(200).json({ success: true, data: updatedProduct[0] });
  } catch (error) {
    console.log("Error in updateProduct function", error);
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedProduct = await sql`
      DELETE FROM products WHERE id=${id} RETURNING *
    `;

    if (deletedProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    res.status(200).json({ success: true, data: deletedProduct[0] });
  } catch (error) {
    console.log("Error in deleteProduct function", error);
    res.status(500).json({ success: false, message: "Internal server Error" });
  }
};
