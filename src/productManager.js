import fs from "fs";

class ProductManager {

    constructor() {
        this.products = []
        this.ids = 1
        this.path = "./src/storage.txt"
    }

    addProduct({ title, description, price, thumbnail, code, stock }) {

        if (title && description && price && thumbnail && code && stock) {
            if (this.products.some((p) => p.code === code)) {
                console.log("el codigo ya se encuentra en otro producto")
            } else {
                const product = {
                    id: this.ids++,
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock
                }
                this.products.push(product)
                fs.writeFileSync(this.path, JSON.stringify(this.products))
            }
        } else {
            const object = { title, description, price, thumbnail, code, stock }
            const objectIncomplete = []

            for (const key in object) {
                if (Object.hasOwnProperty.call(object, key)) {
                    const element = object[key];
                    if (element == undefined || element == "") {
                        objectIncomplete.push(key)
                    }
                }
            }

            console.log("falta " + objectIncomplete.join() + " para poder agregar el producto")

        }
    }

    getProduct(limit) {
        const fileProducts = JSON.parse(fs.readFileSync(this.path, "utf-8"))
        this.products = fileProducts
        console.log("productos conseguidos con exito");
        console.log(fileProducts);
        return limit == 0 ? fileProducts : fileProducts.slice(0, limit);
    }

    getProductById(idProduct) {
        const fileProducts = JSON.parse(fs.readFileSync(this.path, "utf-8"))
        this.products = fileProducts
        for (let i = 0; i < this.products.length; i++) {
            const product = this.products[i]
            if (product.id == idProduct) {
                console.log("producto encontrado por su id")
                console.log(this.products[i])
                return product
            }
        }
        console.log("Not found")

    }

    updateProduct(idProduct, dataToUpdate) {
        const fileProducts = JSON.parse(fs.readFileSync(this.path, "utf-8"))
        this.products = fileProducts

        for (let i = 0; i < this.products.length; i++) {
            const product = this.products[i]


            if (product.id === idProduct) {
                const key = Object.keys(dataToUpdate)
                const value = Object.values(dataToUpdate)

                this.products[i][key] = value[0]
                console.log("dato modificado correctamente");
                fs.writeFileSync(this.path, JSON.stringify(this.products))

            }
        }
    }

    deleteProduct(idProduct) {
        const fileProducts = JSON.parse(fs.readFileSync(this.path, "utf-8"))
        this.products = fileProducts
        for (let i = 0; i < this.products.length; i++) {
            const product = this.products[i]
            if (product.id === idProduct) {
                this.products.splice(i, 1)
                console.log("se elimino el producto correctamente");
                fs.writeFileSync(this.path, JSON.stringify(this.products))
            }
        }
    }
}

export default ProductManager

const productManager = new ProductManager();

//ejemplo de carga de productos
// productManager.addProduct(
//     {
//         title: "producto 1",
//         description: "este es el primer producto",
//         price: 200,
//         thumbnail: "./ejemploDeImagen.png",
//         code: "c726",
//         stock: 7
//     });

// productManager.addProduct(
//     {
//         title: "producto 2",
//         description: "este es el segundo producto",
//         price: 500,
//         thumbnail: "./ejemploDeImagen.png",
//         code: "c984",
//         stock: 8
//     });

// productManager.addProduct(
//     {
//         title: "producto 3",
//         description: "este es el tercer producto",
//         price: 450,
//         thumbnail: "./ejemploDeImagen.png",
//         code: "c123",
//         stock: 12
//     });

// productManager.addProduct(
//     {
//         title: "producto 4",
//         description: "este es el cuarto producto",
//         price: 280,
//         thumbnail: "./ejemploDeImagen.png",
//         code: "c104",
//         stock: 3
//     });
