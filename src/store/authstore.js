
const TOKEN_KEY = 'auth_token';

export function getAuthToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function getAuthenticatedUserId() {
    const token = getAuthToken();
    
    if (!token) {
        console.warn("Token JWT não encontrado. O usuário pode não estar logado.");
        return null;
    }

    try {
        const parts = token.split('.');
        if (parts.length !== 3) {
            console.error("Formato de Token JWT inválido.");
            return null;
        }

        const payloadBase64 = parts[1];
        const decodedPayload = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
        const payload = JSON.parse(decodedPayload); 
        return payload.sub?.id || null;
        
    } catch (e) {
        console.error("Erro ao decodificar token JWT:", e);
        return null;
    }
}

export function getAuthenticatedUserCargo() {
    const token = getAuthToken();
    
    if (!token) {
        return null; 
    }

    try {
        const parts = token.split('.');
        if (parts.length !== 3) {
            console.error("Formato de Token JWT inválido para obter o cargo.");
            return null;
        }

        const payloadBase64 = parts[1];
        const decodedPayload = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
        const payload = JSON.parse(decodedPayload); 
        
        return payload.sub?.cargo || null; 
        
    } catch (e) {
        console.error("Erro ao obter o cargo do token JWT:", e);
        return null;
    }
}