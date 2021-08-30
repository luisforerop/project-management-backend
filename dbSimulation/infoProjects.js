import { projects, users } from "../db";

export const infoProjectsByList = (listProject) => {
    return listProject.map(projectId => projects
        .find(project => project.id === projectId))
}

export const infoProjectsByCompany = ({company}) => {
    return  projects.filter(project => project.company === company)
}

export const infoTeam = (data) => { // Revisar esta lógica y la manera como se envían las peticiones
    if(data.team){
        return data.team.map(userId => {
            const info = users.find(userInfo => userInfo.id === userId)
            return {
                id: info.id,
                name: info.name,
                urlProfile: 'https://i0.wp.com/www.wag1mag.com/wp-content/uploads/monalisa-wag1mag.jpg?fit=567%2C471'
            }
        })
    } else if(data.dev){
        console.log(data.dev);
        const info = users.find(userInfo => userInfo.id === data.dev)
            return {
                id: info.id,
                name: info.name,
                urlProfile: 'https://i0.wp.com/www.wag1mag.com/wp-content/uploads/monalisa-wag1mag.jpg?fit=567%2C471'
            }
    }
}


export const infoUserProjects = ({userId}) => {
    console.log('Este es el userId:', userId);
    const { projects: listProject} = users.find(user => user.id === userId)
    return listProject.map(projectId => projects
        .find(project => project.id === projectId))
}
