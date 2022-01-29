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


  describe('função getById', () => {
    
    before(async () => {
      const response = [
        [{
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

    it('deve retornar um objeto', async () => {
      const response = await productModel.getById(2);
      expect(response).to.be.an('object')
    });

    it('o objeto deve ter as chaves esperadas', async () => {
      const response = await productModel.getById(2);
      expect(response).be.have.all.keys(['id', 'name', 'quantity']);
    });

    it("o objeto retornado deve conter os tipos esperados", async () => {
      const response = await productModel.getById(2);
      expect(response.id).to.be.a('number');
      expect(response.name).to.be.an('string');
      expect(response.quantity).to.be.a('number');
    });
  });
})