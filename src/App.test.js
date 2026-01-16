import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App";
import productsReducer from "./features/products/productsSlice";

const store = configureStore({
  reducer: { products: productsReducer },
});

test("renders dashboard page", async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );

  const headerElement = await screen.findByText(/shop now/i);
  expect(headerElement).toBeInTheDocument();
});
