import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.image || !newProduct.price) {
            return {success: false, message: "Please fill in all fields." };
        }

        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct),
        });

        const data = await res.json();
        set((state) => ({products: [...state.products, data.data] }));
        return { success: true, message: "Product created successfully" };

    },
    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({ products: data.data });
    },

    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if(!data.success) return { success: false, message: data.message }

        //update the user interface immediately, without needing a refresh
        set(state => ({ products: state.products.filter(product => product._id !== pid ) }));
        return { success: true, message: data.message };
    },
   

    updateProduct: async (pid, updatedProduct) => {
        try {
            const res = await fetch(`/api/products/${pid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
            });
    
            // Check if the response is ok (status in the range 200-299)
            if (!res.ok) {
                return { success: false, message: "Failed to update product. Please try again." };
            }
    
            const data = await res.json();
    
            // Default handling if the API does not return a success field
            if (data.success === undefined) {
                return { success: false, message: "Unexpected response format." };
            }
    
            if (!data.success) {
                return { success: false, message: data.message || "Failed to update product." };
            }
    
            // Update the UI immediately
            set((state) => ({
                products: state.products.map((product) =>
                    product._id === pid ? data.data : product
                ),
            }));
    
            // Return a predefined success message
            return { success: true, message: "Product updated successfully." };
    
        } catch (error) {
            // Handle network or unexpected errors
            return { success: false, message: "An error occurred while updating the product." };
        }
    },
    


    

}));

