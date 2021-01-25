import { API } from './APICallBase';

export async function GetDepartmentList() {
    const endpoint = `orgunit/departmentList`;
    let api = await API();
    return api.get(endpoint);
  }

  export async function LoginService(template) {
    const endpoint = `Login`;

    let api = await API();
    return api.post(endpoint, {
        email: template.email,
        password: template.password
       
    });
  }
    export async function RegisterService(template) {
        const endpoint = `Register`;
    
        let api = await API();
        return api.post(endpoint, {
            Email: template.email,
            Password: template.password,
            UserType:"2"

           
        });
}