const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done('It requires a valid name'))
          .catch(() => done());
      });
    });
  });
  describe("name", () => {
    it("Should not create a new game if name is null", (done) => {
      Videogame.create({
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores, iste",
        releaseDate: "2022/01/05",
        rating: 4.00,
        platforms: 'Nintendo',
      })
        .then(() => done('Should not have been created'))
        .catch(() => done());
    });
    it("Should not create a new game if the type of name is not equal to 'string'", () => {
      Videogame.create({
        name: 2234,
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores, iste",
        releaseDate: "2022/01/05",
        rating: 4.00,
        platforms: 'Nintendo',
      })
        .then(() => done('Should not have been created'))
        .catch(() => done());
    });
  });
  describe("description", () => {
    it("Should not create a new game if the description is null", (done) => {
      Videogame.create({
        name: 'Call of Duty 69',
        releaseDate: "2022/01/05",
        rating: 4.00,
        platforms: 'Nintendo',
      })
        .then(() => done('Game should not have been created'))
        .catch(() => done());
    })
    it('Should work when all the mandatory fields are complete', ()=>{
      Videogame.create({
        name:'Lucas Game',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas porro doloribus distinctio? Odit soluta, libero impedit quod quidem quaerat est.',
        platforms: ["Xbox One", "PC"],
        gGenre: "Action"
      })
      .then(() => done())
      .catch(() => done());
    })
  });
})
