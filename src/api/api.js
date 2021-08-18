const API_URL = 'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev/';

export const fetchData = async (id) => {
    const apiUrl = id ? `${API_URL}${id}` : API_URL;
    try {
        const result = await fetch(apiUrl);
        if (result.status < 300) {
            return result.json();
        } else {
            throw new Error("API 응답값이 이상합니다.");
        }
    } catch {
        throw new Error("API 호출에 실패하였습니다.");
    }

};