const Project = require('./../models/Project');

// index
const index = async (req, res) => {

    try {
        const projects = await Project.find({});

        if (!projects) {
            let response = {
                status: "error",
                message: "Er zijn geen projecten gevonden."
            }
            res.json(response);
        }

        let response = {
            status: "success",
            data: projects,
        }
        res.json(response);
    }
    catch (error) {
        let response = {
            status: "error",
            message: "Er zijn geen projecten gevonden."
        }
        res.json(response);
    }
};

const getProjectsForHome = async (req, res) => {
    try {
        const projects = await Project.find({ fase: { $ne: "Fase 0: Wachten tot opstart" } });

        if (!projects) {
            let response = {
                status: "error",
                message: "Er zijn geen projecten gevonden."
            }
            res.json(response);
        }

        console.log(projects)

        let response = {
            status: "success",
            data: projects,
        }
        res.json(response);
    }
    catch (error) {
        let response = {
            status: "error",
            message: "Error: Er zijn geen projecten gevonden."
        }
        res.json(response);
    }
};

const getProjectsForVoting = async (req, res) => {
    try {
        const projects = await Project.find({ fase: "Fase 3: Stemmen" });

        if (!projects) {
            let response = {
                status: "error",
                message: "Er zijn geen projecten gevonden."
            }
            res.json(response);
        }

        let response = {
            status: "success",
            data: projects,
        }
        res.json(response);
    }
    catch (error) {
        let response = {
            status: "error",
            message: "Er zijn geen projecten gevonden."
        }
        res.json(response);
    }
}

const getProjectById = async (req, res) => {
    let id = req.params.id;

    try {
        const project = await Project.findById(id);

        let response = {
            status: "success",
            data: project,
        }
        res.json(response);
    } catch (error) {
        let response = {
            status: "error",
            message: "Project niet gevonden.",
            error: error
        }
        res.json(response);
    }
}

const addProject = async (req, res) => {
    const project = await Project.create(req.body);

    if (project) {
        let response = {
            status: "success",
            message: "Project is succesvol toegevoegd.",
            data: project
        }
        res.json(response);
    } else {
        let response = {
            status: "error",
            message: "Project toevoegen is mislukt."
        }
        res.json(response);
    }
}

const updateProjectById = async (req, res) => {
    let id = req.params.id;
    let update = req.body;

    let project = await Project.findByIdAndUpdate(id, update);

    let response = {
        status: "success",
        message: "Project is updated.",
        project: project
    }
    res.json(response);
}

const deleteProject = async (req, res) => {
    const id = req.params.id;

    let softDelete = {
        delete: {
            isDeleted: true,
            whenDeleted: Date.now()
        },
    }

    const project = await Project.findByIdAndUpdate(id, softDelete, { returnDocument: 'after' });

    let response = {
        status: "success",
        message: "Project is deleted",
        project: project
    }
    res.json(response);
}

module.exports.index = index;
module.exports.getProjectsForHome = getProjectsForHome;
module.exports.getProjectsForVoting = getProjectsForVoting;
module.exports.addProject = addProject;
module.exports.getProjectById = getProjectById;
module.exports.updateProjectById = updateProjectById;
module.exports.deleteProject = deleteProject;
