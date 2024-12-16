const getAllUsers = async () => {
    const token = localStorage.getItem('token');
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    });
};

const getUserById = async (id: number) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/user/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const loginUser = async (content: { username: string; password: string }) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/login', {
        method: 'POST',
        body: JSON.stringify(content),
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const getAllUserActivitiesById = async (id: number) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/user/${id}/activities`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const addUser = async (content: { name: string; email: string; password: string, username: string }) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/registration', {
        method: 'POST',
        body: JSON.stringify(content),
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const deleteUser = async (id:number) => {
    console.log(id)
    const token = localStorage.getItem('token');

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/user/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
}

const UserService = {
    getAllUsers,
    getUserById,
    loginUser,
    getAllUserActivitiesById,
    addUser,
    deleteUser,
};

export default UserService;
