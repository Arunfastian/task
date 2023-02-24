import axios from 'axios';
export const userLogin = async (userDetails) => {
    const response = await axios.post('http://localhost:8000/user/logIn',userDetails);

    return {status:response.status,data:response.data};
}