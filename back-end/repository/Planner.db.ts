import { Planner } from "../model/Planner";
import database from "../util/database";

const getAllPlanners = async ():Promise<Planner[]> => {
    const prismaPlanners =  await database.planner.findMany({
        include: {
            activities: {
                include: {
                    location: true
                }
            }
        }
    })
    return  prismaPlanners.map(planner => Planner.from(planner))
}

const getPlanner = async (id:number):Promise<Planner|null> => {
    const prismaPlanner = await database.planner.findFirst({
        where: {
            id
        },
        include: {
            activities: {
                include: {
                    location: true
                }
            }
        }
    });
    return prismaPlanner ? Planner.from(prismaPlanner) : null;
}

const createPlanner = async ({name, description, activities}: Planner, userId: number):Promise<Planner> => {
    const prismaPlanner = await database.planner.create({
        data: {
            name,
            description,
            activities: {
                connect: activities.map(activity => ({id: activity.id}))
            },
            User: {
                connect: {
                    id: userId
                }
            }
        },
        include: {
            activities: {
                include: {
                    location: true
                }
            }
        }
    });
    return Planner.from(prismaPlanner)
}

export default {
    getPlanner,
    getAllPlanners,
    createPlanner,
}