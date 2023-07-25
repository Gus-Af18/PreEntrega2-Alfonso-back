const { error } = require("console");
const fs = require("fs");

class Contendor {
  constructor(file) {
    this.file = file;
  }
  async save(obj) {
    try {
      const objects = await this.getAllObjects();
      const lastId = objects.length > 0 ? objects[objects.length - 1].id : 0;
      const newId = lastId + 1;
      const newObj = { id: newId, ...Obj };
      objects.push(newObj);
      await this.saveObjects(objects);
      return newId;
    } catch (error) {
      throw new Error("Error saving object");
    }
  }

  async getById(Id) {
    try {
      const objects = await this.getAllObjects();
      const obj = objects.fin((o) => o.id === Id);
      return obj || null;
    } catch (error) {
      throw new Error("Error getting ID");
    }
  }

  async getAll() {
    try {
      const Objects = await this.getAllObjects();
      return Objects;
    } catch (error) {
      throw new Error("Error getting objects");
    }
  }

  async deleteById(id) {
    try {
      let objects = await this.getAllObjects();
      objects = objects.filter((o) => o.id !== id);
      await this.saveObjects(objects);
    } catch (error) {
      throw new Error("Error al eliminar los objetos");
    }
  }

  async deleteAll() {
    try {
      await this.saveObjects([]);
    } catch (error) {
      throw new Error("Error al eliminar objetos");
    }
  }

  async getAllObjects() {
    try {
      const data = await fs.promises.readFile(this.file, "utf-8");
      return data ? JSON.parse(data) : [];
    } catch (error) {
      return [];
    }
  }

  async saveObjects(objects) {
    try {
      await fs.promises.writeFile(this.file, JSON.stringify(objects, null, 2));
    } catch (error) {
      throw new Error("Error al guardar objetos");
    }
  }
}

//llamar todos los metodos
const main = async () => {
  const products = new Contendor("products.txt");

  //save products
  const id = await products.save({ title: "Product 3", price: 100 });
  console.log("Product saved with ID: " + id);

  //obtain all products
  const allObjets = await products.getAll();
  console.log("objects saved: " + allObjets);

  //remove products
  const obj = await products.deleteById(1);
  console.log("objects deleted", obj);

  //optain products by ID
  const objs = await products.getById(2);
  console.log("objects obtained", objs);
};
main().catch((error) => console.error(error));
