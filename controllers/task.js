const taskController = {
    async add(req, res) {
        try {
            const task = new Task({ ...req.body })
            await task.save();

            return res.status(200).json({ message: "Task created successfully." });
        } catch (error) {
            console.log("Error:authController:login", error)
        }
    },
    async update(req, res) {
        try {
            const task = await Task.findOneAndUpdate({ _id: req.params.taskid }, { ...req.body }, { new: true })
            return res.status(200).json({ task, message: "Task updated successfully." });
        } catch (error) {
            console.log("Error:authController:login", error)
        }
    },
    async delete(req, res) {
        try {
            await Task.findOneAndUpdate({ _id: req.params.taskid }, { isDeleted: true }, { new: true })
            return res.status(200).json({ message: "Task deleted successfully." });
        } catch (error) {
            console.log("Error:authController:login", error)
        }
    },
    async details(req, res) {
        try {
            const task = await Task.findOne({ _id: req.params.taskid })
            return res.status(200).json({ task, message: "Task details fetched successfully." });
        } catch (error) {
            console.log("Error:authController:login", error)
        }
    },
    async list(req, res) {
        try {
            const { skip, limit, search, sortBy, sortOrder,filterBy } = req.params

            const tasks = await Task.find({ isDeleted: false });


            return res.status(200).json({ tasks, message: "Task list fetched successfully." });
        } catch (error) {
            console.log("Error:authController:login", error)
        }
    },
}

module.exports = taskController