import express from "express";  
import ProductManager from "./productManager.js";

const manager = new ProductManager()
const app = express()

app.get("/products", async (req, res) => {
    const limit = req.query.limit
    const products = await manager.getProduct(limit)
    res.send({prueba:"funciona", payload: products})
})



app.get('/product/:pid', async (req, res) => {
    const product = await manager.getProductById(req.params.pid);
    res.send({ prueba: "funciona", payload: product });
});

app.listen(8080, () => [
    console.log("se inicio el servidor con express en el puerto 8080")
])