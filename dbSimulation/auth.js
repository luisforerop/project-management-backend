const { users, company, projects } = require("../db");

const auth = ({ username, password }) => {
    const infoUser = users.find(user => user.username === username);
    if(infoUser.password === password){
        const infoCompany = company.find(info => info.id === infoUser.company)
        const infoProjects = projects.filter(project => project.company === infoUser.company)
        const companyUsers = infoCompany.users.map( id => {
            const infoCoworker = users.find( user => user.id === id )
            return { name: infoCoworker.name, id }
        })
        const info = {
            infoUser,
            infoCompany,
            companyUsers
            //infoProjects
        }
        return {info, token: '123456'}
    } else return null 
}

// const response = auth({username: 'pepe', password: '1234lf'})
// console.log(response);
export default auth