import { toast } from "react-toastify";
export const post = async (url, params) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Add any additional headers as needed
            },
            body: JSON.stringify(params),
        });

       

        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        // Handle errors
        throw error; // Propagate the error to the caller
    }
};
export const get = async (url) => {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                // Add any headers as needed
            },
        });

     

        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        // Handle errors
        throw error; // Propagate the error to the caller
    }
};
export const put = async (url, params) => {
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                // Add any additional headers as needed
            },
            body: JSON.stringify(params),
        });

    

        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        // Handle errors
        throw error; // Propagate the error to the caller
    }
};
export const del = async (url) => {
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                // Add any headers as needed
            },
        });

   

        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        // Handle errors
        throw error; // Propagate the error to the caller
    }
};
