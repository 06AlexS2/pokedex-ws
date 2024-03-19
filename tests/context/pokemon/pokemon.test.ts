import request from "supertest";
import app from "../../../src/app";

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 10000));
});
//test for catching a pokemon
describe("POST /api/v1/catch/pokemon-name/:pokemon", () => {
  jest.setTimeout(30000);

  it("responds with a JSON containing the info from a pokemon", async () => {
    const pokemonName = "bulbasaur";
    const response = await request(app).post(
      `/api/v1/catch/pokemon-name/${pokemonName}`
    );
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("moves");
  });

  it("responds with a 400 when the pokemon is already registered", async () => {
    const nonExistentPokemonName = "bulbasaur";
    const response = await request(app).post(
      `/api/v1/catch/pokemon-name/${nonExistentPokemonName}`
    );
    expect(response.status).toBe(400);
  });
});

//test for release a pokemon by id
describe("DELETE /api/v1/set-free/pokemon-id/:id", () => {
  jest.setTimeout(30000);

  it("responds with a 204 HTTP status code", async () => {
    const pokemonId: number = 1;
    const response = await request(app).delete(
      `/api/v1/set-free/pokemon-id/${pokemonId}`
    );
    expect(response.status).toBe(204);
  });

  it("responds with a 404 when the pokemon does not exists", async () => {
    const nonExistentPokemonId = 1001;
    const response = await request(app).delete(
      `/api/v1/catch/pokemon-name/${nonExistentPokemonId}`
    );
    expect(response.status).toBe(404);
  });
});

//test for release a pokemon by name
describe("DELETE /api/set-free/pokemon-name/:pokemon", () => {
  jest.setTimeout(30000);

  //create another pokemon
  it("creates a pokemon to delete first", async () => {
    const pokemonName = "squirtle";
    const response = await request(app).post(
      `/api/v1/catch/pokemon-name/${pokemonName}`
    );
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("moves");
  });
  it("deletes that pokemon and responds with a 204 HTTP status code", async () => {
    const pokemonName: string = "squirtle";
    const response = await request(app).delete(
      `/api/v1/set-free/pokemon-name/${pokemonName}`
    );
    expect(response.status).toBe(204);
  });
});

//test for releasing multiple pokemon by type
//api/set-free/pokemon-type/:type
describe("DELETE /api/set-free/pokemon-type/:type", () => {
  jest.setTimeout(30000);

  it("creates a pokemon to delete first", async () => {
    const pokemonName = "charmander";
    const response = await request(app).post(
      `/api/v1/catch/pokemon-name/${pokemonName}`
    );
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("moves");
  });
  it("deletes that pokemon and responds with a 204 HTTP status code", async () => {
    const pokemonType: string = "fire";
    const response = await request(app).delete(
      `/api/v1/set-free/pokemon-type/${pokemonType}`
    );
    expect(response.status).toBe(204);
  });
});

//test for getting the pokedex
describe("GET /api/v1/pokedex", () => {
  jest.setTimeout(30000);

  it("responds with a 200 HTTP status code", async () => {
    const response = await request(app).get("/api/v1/pokedex");
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength;
  });
});
