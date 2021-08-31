import { companies, userStories, users, tickets, projects } from '../db'

const infoAll = () => {
    return {
        companies,
        userStories,
        users,
        tickets, 
        projects
    }
}

export default infoAll