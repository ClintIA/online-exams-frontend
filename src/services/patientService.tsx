import axios, {isAxiosError} from 'axios';

const apiPatient = axios.create({
    baseURL: 'http://localhost:3000/patient',
});

export const listPatient = async (cpf: string, tenantId: number) => {
    const data = {
        cpf: cpf,
    }
    try {
       return await apiPatient.post('/cpf', data,{
           headers: {
               'x-tenant-id': tenantId
           }
       })
    } catch (error) {
        if(isAxiosError(error)) {
            return error.response?.data
        }
    }
}