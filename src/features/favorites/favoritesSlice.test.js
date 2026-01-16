beforeAll(() => {
  global.Storage.prototype.getItem = jest.fn(() => '[]');
  global.Storage.prototype.setItem = jest.fn();
});

import reducer, { addToFavorites, removeFromFavorites } from "./favoritesSlice";

describe("favoritesSlice", () => {
  test("should add item to favorites", () => {
    const initialState = { items: [] };

    const product = { id: 1, title: "Test Product" };

    const state = reducer(initialState, addToFavorites(product));

    expect(state.items.length).toBe(1);
    expect(state.items[0].id).toBe(1);
  });

  test("should NOT add duplicate item", () => {
    const product = { id: 1, title: "Test Product" };

    const initialState = { items: [product] };

    const state = reducer(initialState, addToFavorites(product));

    expect(state.items.length).toBe(1);
  });

  test("should remove item from favorites", () => {
    const initialState = { items: [{ id: 1, title: "Test Product" }] };

    const state = reducer(initialState, removeFromFavorites({ id: 1 }));

    expect(state.items.length).toBe(0);
  });
});
