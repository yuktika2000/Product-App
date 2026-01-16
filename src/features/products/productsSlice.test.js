import productsReducer, {fetchProducts} from './productsSlice';

describe('productsSlice unit test', () => {
    const initialState = {
        items: [],
        loading: false,
        error: null
    };

    test('should set loading to true on fetchProducts.pending',() => {
        const action = {type: fetchProducts.pending.type};
        const state = productsReducer(initialState, action);
        expect(state.loading).toBe(true);
        expect(state.error).toBe(null);
    })

    test("should set items on fetchProducts.fulfilled", () => {
        const mockProducts = [{id:1, title:"Product 1"}]

        const action = {
            type: fetchProducts.fulfilled.type,
            payload: mockProducts
        }

        const state = productsReducer(initialState, action);
        expect(state.loading).toBe(false);
        expect(state.items.length).toBe(1);
        expect(state.items[0].title).toBe("Product 1");
    })

    test("should set error on fetchProducts.rejected",() => {
        const action = {
            type : fetchProducts.rejected.type,
            error: {message: "Failed to fetch"}
        }
            const state = productsReducer(initialState, action);
            expect(state.loading).toBe(false);
            expect(state.error).toBe("Failed to fetch");
    })


})

