import { API } from './APICallBase';

export function Logout() {
  sessionStorage.removeItem('token');
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
    UserType: "2"
  });
}

export async function UserValidate() {
  const endpoint = `UserValidate`;
  let api = await API();
  return api.get(endpoint);
}