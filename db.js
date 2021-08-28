const company = [
    {
        id: 'companyOne',
        company: 'Cocacola',
        nit: '35213213213',
        phone: 75161651,
        address: 'Cra 5416',
        email: 'safd@mail.com',
        users: [ 'userOne', 'userTwo', 'userThree'],
        projects: [ 'projectOne', 'projectTwo' ]
    },    
]

const users = [
    {
        id: 'userOne',
        name: 'pedro',
        username: 'pepe',
        email: 'pedro@mail.com',
        company: 'companyOne',
        password: '1234lf',
        permits: 'admin',
        projects: [ 'projectOne', 'projectTwo'],
        tickets: [],        
    },
    {
        id: 'userTwo',
        name: 'sofia',
        username: 'sofiDir',
        email: 'sofia@mail.com',
        company: 'companyOne',
        password: '1234lf',
        permits: 'productOwner',
        projects: [ 'projectOne', 'projectTwo'],
        tickets: [],        
    },
    {
        id: 'userThree',
        name: 'teresa',
        username: 'tere',
        email: 'teresa@mail.com',
        company: 'companyOne',
        password: '1234lf',
        permits: 'scrumMaster',
        projects: [ 'projectOne'],
        tickets: [],        
    },
    {
        id: 'userFour',
        name: 'javier',
        username: 'javi',
        email: 'javier@mail.com',
        company: 'companyOne',
        password: '1234lf',
        permits: 'developer',
        projects: [ 'projectOne'],
        tickets: [],        
    }
]
const projects = [
    {
        id: 'projectOne',
        title: 'proyecto uno',
        description: 'Ecommerce de companyOne',
        owner: 'userTwo',
        company: 'companyOne',
        userStories: [
            'company1project1us1', 
            'company1project1us2'
        ],
        team: ['userTwo', 'userThree', 'userFour'],
        state: 'active'
    },
    {
        id: 'projectTwo',
        title: 'proyecto dos',
        description: 'App para disfrutar una companyOne',
        owner: 'userTwo',
        company: 'companyOne',
        userStories: [],
        team: ['userTwo'],
        state: 'standby'
    }
]

const userStories = [
    {
        id: 'company1project1us1',
        description: {
            as: 'cliente habitual',
            wantTo: 'comprar gaseosas online',
            asThat: 'no tener que salir de casa'
        },
        finishedCondition: [
            'Tener un carrito de compras',
            'Tener pasarela de pagos'
        ],
        priority: 70,
        cost: 50,
        owner: 'userThree',
        project: 'projectOne',
        tickets: [
            'company1project1us1t1',
        ]
    },
    {
        id: 'company1project1us2',
        description: {
            as: 'cliente habitual',
            wantTo: 'ver versiones de cocacolas',
            asThat: 'escoger la que se adapte a mis gustos'
        },
        finishedCondition: [
            'Base de datos no relacional para múltiples consultas',
            'Cargar al menos 5 productos'
        ],
        priority: 90,
        cost: 35,
        owner: 'userThree',
        project: 'projectOne',
        tickets: [
            'company1project1us2t1',
            'company1project1us2t2',
        ]
    }
]

const tickets = [
    {
        id: 'company1project1us1t1',
        title: 'carrito de compras',
        description: 'Crear el carrito de compras',
        state: 'finished',
        owner: 'userThree',
        developer: 'userFour',
        userStory: 'company1project1us1',
        project: 'projectOne'
    },
    {
        id: 'company1project1us1t2',
        title: 'pasarela de pagos',
        description: 'Conectar con API de pasarela de pagos',
        state: 'inProcess',
        owner: 'userThree',
        developer: 'userFour',
        userStory: 'company1project1us1',
        project: 'projectOne'
    },
    {
        id: 'company1project1us2t1',
        title: 'Conexión a base de datos',
        description: 'Controller para Crud en node js',
        state: 'active',
        owner: 'userThree',
        developer: 'userThree',
        userStory: 'company1project1us2',
        project: 'projectOne'
    }
]

exports.company = company
exports.users = users
exports.projects = projects
exports.userStories = userStories
exports.tickets = tickets