/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, Genre, conn } = require('../../src/db.js');

const agent = session(app);

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create({
      name: "Lucas Game",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores, iste",
      releaseDate: '2022/01/05',
      rating: 5.00,
      platforms: "Playstation 2, Nintendo",
      genres: ['Action', 'Adventure'],
    })
    )
    );

  describe('GET /genres', () => {
    it('should get 200', () =>
      agent.get('/genres').expect(200)
    );
  });

describe("POST /videogame", () => {
  it("should get 200", () => {
    agent
      .post("/videogame")
      .send({
        name: "Game Lucas",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores, iste",
        releaseDate: '2022/01/05',
        rating: 5.00,
        platforms: ["Playstation 2", "Nintendo"],
        genres: ['Action', 'Adventure'],
      })
      .expect(200);
  });
  it("creates a game in database", () => {
    agent
      .post("videogame")
      .send({
        name: "Luke Game",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores, iste",
        releaseDate: '2022/01/05',
        rating: 5.00,
        platforms: ["Playstation 2", "Nintendo"],
        genres: ['Action', 'Adventure'],
      })
      .then(() => {
        Videogame.findOne({
          where: {
            name: "Luke Game",
          },
        });
      })
      .then((game) => {
        expect(game).to.exist;
      });
  });
  it('correctly sets games in database', () => {
    agent.post('/videogame')
    .send({
      name: "Luke Skywalker",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores, iste",
      releaseDate: '2022/01/05',
      rating: 5.00,
      platforms: ["Playstation 2", "Nintendo"],
      genres: ['Action', 'Adventure'],
    })
    .then(() => {
      Videogame.findOne({
        where: {
          name: 'Luke Skywalker'
        },
        include: {
          model: Genre
        }
      });
    })
    .then((game) => {
      expect(game.genre[0].name).to.equal('Action');
      expect(game.genre[1].name).to.equal('Adventure');
      })
    })
  });
});