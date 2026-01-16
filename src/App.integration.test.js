import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import App from "./App";

import productsReducer from "./features/products/productsSlice";
import favoritesReducer from "./features/favorites/favoritesSlice";
import filtersReducer from "./features/filters/filtersSlice";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: 1,
            title: "Test Electronic Product",
            price: 999,
            category: "electronics",
            description: "Test product description",
            image: "test.jpg",
            rating: {
              rate: 4.5,
              count: 120,
            },
          },
        ]),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

function renderWithProviders(route = "/") {
  const store = configureStore({
    reducer: {
      products: productsReducer,
      favorites: favoritesReducer,
      filters: filtersReducer,
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
}

describe("Product Details Integration Test", () => {
  test("renders product details correctly", async () => {
    renderWithProviders("/product/1");

    // Title
    expect(
      await screen.findByText(/Test Electronic Product/i)
    ).toBeInTheDocument();

    // Price
    expect(screen.getByText(/\$999/i)).toBeInTheDocument();

    // Category
    expect(screen.getByText(/electronics/i)).toBeInTheDocument();

    // Favorite button
    expect(
      screen.getByRole("button", { name: /add to favorites/i })
    ).toBeInTheDocument();
  });
});
