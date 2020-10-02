import axios from 'axios';

interface GenerateTokenResponse {
  token: string,
}

const generateJwt = async (userId: string) => {
  const res = await axios.post<GenerateTokenResponse>(`${process.env.AUTH_SERVICE_URL}/auth/generateToken`, { userId });
  return res.data.token;
}

export default generateJwt;
