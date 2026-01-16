import reducer, { setSearch, setCategory, setSort } from "./filtersSlice";

describe("filtersSlice", () => {
  const initialState = {
    search: "",
    category: "all",
    sort: "none",
  };

  test("should set search value", () => {
    const action = setSearch("test search");
    const state = reducer(initialState, action);
    expect(state.search).toBe("test search");
  });

  test("should set category value", () => {
    const action = setCategory("electronics");
    const state = reducer(initialState, action);
    expect(state.category).toBe("electronics");
  });

  test("should set sort value", () => {
    const action = setSort("asc");
    const state = reducer(initialState, action);
    expect(state.sort).toBe("asc");
  });
});
