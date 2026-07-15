const API_BASE_URL = 'https://startpunch-1.onrender.com';

async function apiRequest(endpoint, method = 'GET', body = null) {
    const headers = { 'Content-Type': 'application/json' };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
        });

        // Get raw text for better debugging
        const text = await response.text();
        console.log("Raw Response from", endpoint, ":", text);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${text.substring(0, 200)}`);
        }

        // Parse JSON
        if (!text) {
            throw new Error("Empty response from server");
        }
        
        return JSON.parse(text);
    } catch (error) {
        console.error("API Error:", error);
        if (error.message.includes('Failed to fetch')) {
            throw new Error('Cannot connect to backend. Is the backend running?');
        }
        throw error;
    }
}

function runAnalysis(startupData) {
    return apiRequest('/api/validate-startup', 'POST', startupData);
}
