//전역 정보가 들어갈 곳
//왼쪽에 운영서버주소, 오른쪽에 로걸서버주소
const config = {
    serverUrl: process.env.NODE_ENV === "production" ? "http://localhost:8080" : "http://localhost:8080"
};

export default config;