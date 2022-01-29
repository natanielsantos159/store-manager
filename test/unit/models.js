const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../models/connection');
const productModel = require('../../models/productModel');
const saleModel = require('../../models/saleModel');

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

  describe('função update', () => {

    const paramObj = {
      id: 2,
      name: "produto B",
      quantity: 20
    };

    before(async () => {
      const response = [
        [],
        []
      ];

      sinon.stub(connection, 'execute').resolves(response);
    })
    
    after(async () => {
      connection.execute.restore();
    })

    it('deve retornar um objeto', async () => {
      const response = await productModel.update(paramObj);
      expect(response).to.be.an('object')
    })

    it('deve retornar um objeto com os parametros esperados', async () => {
      const response = await productModel.update(paramObj);
      expect(response).be.have.all.keys(['id', 'name', 'quantity']);
    })

    it('o objeto retornado deve conter os tipos esperados', async () => {
      const response = await productModel.update(paramObj);
      expect(response.id).to.be.a('number');
      expect(response.name).to.be.an('string');
      expect(response.quantity).to.be.a('number');
    })

    it('deve retornar um objeto identico ao que foi passado como parametro', async () => {
      const response = await productModel.update(paramObj);
      expect(response).to.be.deep.equal(paramObj)
    })
  })
})

describe('Testa o arquivo saleModel', () => {

  describe('função getAll', () => {
    
    before(async () => {
      const response = [[
          {
            saleId: 1,
            date: "2021-09-09T04:54:29.000Z",
            product_id: 1,
            quantity: 2
          },
          {
            saleId: 1,
            date: "2021-09-09T04:54:54.000Z",
            product_id: 2,
            quantity: 2
          }
        ],
        []
      ];

      sinon.stub(connection, 'execute').resolves(response);
    })

    after(async () => {
      connection.execute.restore();
    })

    it('deve retornar um array', async () => {
      const response = await saleModel.getAll();
      expect(response).to.be.an('array');
    })

    it('o array deve conter apenas objetos', async () => {
      const response = await saleModel.getAll();
      response.forEach((el) => {
        expect(el).to.be.an('object');
      })
    })

    it('os objetos devem ter as propriedades esperadas', async () => {
      const response = await saleModel.getAll();
      response.forEach((obj) => {
        expect(obj).to.be.all.keys(['saleId', 'date', 'product_id', 'quantity']);
      })
    })

    it('os objetos devem ter as propriedades com os tipos esperados', async () => {
      const response = await saleModel.getAll();
      response.forEach((obj) => {
        expect(obj.saleId).to.be.a('number');
        expect(obj.date).to.be.an('string');
        expect(obj.product_id).to.be.a('number');
        expect(obj.quantity).to.be.a('number');
      })
    })
  })

  describe('função getById', () => {

    before(async () => {
      const response = [[
          { 
            date: "2021-09-09T04:54:29.000Z",
            product_id: 1,
            quantity: 2
          },
          {
            date: "2021-09-09T04:54:54.000Z",
            product_id: 2,
            quantity: 2
          }
        ],
        []
      ];

      sinon.stub(connection, 'execute').resolves(response);
    })

    after(async () => {
      connection.execute.restore();
    })

    it('deve retornar um array', async () => {
      const response = await saleModel.getById(1);
      expect(response).to.be.an('array');
    })

    it('deve retornar um array com objetos com as chaves esperadas', async () => {
      const response = await saleModel.getById(1);
      response.forEach((obj) => {
        expect(obj).to.be.all.keys(['date', 'product_id', 'quantity']);
      })
    })

    it('deve retornar um array com objetos com as chaves esperadas', async () => {
      const response = await saleModel.getById(1);
        response.forEach((obj) => {
        expect(obj.date).to.be.an('string');
        expect(obj.product_id).to.be.a('number');
        expect(obj.quantity).to.be.a('number');
      })
    })
  })

  describe('função createNewSale', () => {
    before(async () => {
      const response = [
          { 
            insertId: 1,
          },
        []
      ];

      sinon.stub(connection, 'execute').resolves(response);
    })

    after(async () => {
      connection.execute.restore();
    })

    it('deve retornar um id', async () => {
      const response = await saleModel.createNewSale();
      expect(response).to.be.an('number');
    })
  })
})