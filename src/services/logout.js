
export function logout() {

    sessionStorage.removeItem('isAuthenticated') // Eliminar estado de autenticación
    //localStorage.removeItem('username') // Eliminar nombre del usuario
    sessionStorage.removeItem('token') 
    sessionStorage.removeItem('token_type') 
    sessionStorage.removeItem('id') // Eliminar ID de usuario
    sessionStorage.removeItem('role')  //Eliminar rol del usuario
    
}