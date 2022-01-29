const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../models/connection');
const productModel = require('../../models/productModel');

describe("Testa o arquivo ProductModel", () => {

  describe("função getAll", () => {
    before(async () => {
      const response =   [
        [{
          "id": 1,
          "name": "produto A",
          "quantity": 10
        },
        {
          "id": 2,
          "name": "produto B",
          "quantity": 20
        }],
        []
      ];
      sinon.stub(connection, 'execute').resolves(response);
    })

    after(async () => {
      connection.execute.restore();
    })

    it("deve retornar um array com duas posições", async () => {
      const response = await productModel.getAll();
      console.log(response)
      expect(response).to.be.an('array');
      expect(response.length).to.be.equal(2);
    });

    it("deve retornar um array com as chaves esperadas", async () => {
      const response = await productModel.getAll();
      response.forEach((obj) => {
        expect(obj).to.have.all.keys(['id', 'name', 'quantity']);
      })
    });

    it("os objetos retornados devem ser dos tipos esperados", async () => {
      const response = await productModel.getAll();
      response.forEach((obj) => {
        expect(obj.id).to.be.a('number');
        expect(obj.name).to.be.an('string');
        expect(obj.quantity).to.be.a('number');
      })
    });
  })
})