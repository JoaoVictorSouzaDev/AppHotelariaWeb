import { getToken } from "./authAPI";

export async function listAllRoomsRequest() {
    const token = getToken();

    const response = await fetch("api/rooms", {
        method: "GET",
        headers: {
            "Accept" : "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    });

    let data = null;

    try {
        data = await response.json();
    } catch {
        data = null;
    }
    
}