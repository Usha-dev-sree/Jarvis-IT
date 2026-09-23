const Course = require('../models/course');

async function getCourse(req, res) {
    try {
        const courses = await Course.find();

        return res.status(200).send(courses);
    } catch (error) {
        return res.status(500).send({
            message: "Unable to access courses",
            error: error.message
        });
    }
}


async function createCourse(req, res) {
    try {
        const {
            title,
            description,
            category,
            level,
            price,
            duration,
            instructor
        } = req.body;

        if (
            !title ||
            !description ||
            !category ||
            !level ||
            !instructor ||
            price === undefined ||
            duration === undefined
        ) {
            return res.status(400).send({
                message: "Bad request"
            });
        }
        const existingCourse = await Course.findOne({ title });

        if (existingCourse) {
            return res.status(400).send({
                message: "Bad request, course already exists"
            });
        }

        const course = new Course({
            title: title,
            description: description,
            instructor: instructor,
            category: category,
            level: level,
            price: price,
            duration: duration
        });

        await course.save();

        return res.status(201).send({
            message: "New course created successfully",
            course: course
        });

    } catch (error) {
        return res.status(500).send({
            message: "Unable to create course",
            error: error.message
        });
    }
}

async function deleteCourse(req, res) {
    try {
        const { id } = req.params;

        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).send({
                message: "Course not found"
            });
        }

        await Course.findByIdAndDelete(id);

        return res.status(200).send({
            message: "Course deleted successfully"
        });

    } catch (error) {
        return res.status(500).send({
            message: "Unable to delete course",
            error: error.message
        });
    }
}

async function updateCourse(req, res) {
    try {
        const { id } = req.params;

        const {
            title,
            description,
            category,
            level,
            price,
            duration,
            instructor
        } = req.body;

        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).send({
                message: "Course not found"
            });
        }

        course.title = title || course.title;
        course.description = description || course.description;
        course.category = category || course.category;
        course.level = level || course.level;
        course.instructor = instructor || course.instructor;
        course.price = price !== undefined ? price : course.price;
        course.duration = duration !== undefined ? duration : course.duration;

        await course.save();

        return res.status(200).send({
            message: "Course updated successfully",
            course: course
        });

    } catch (error) {
        return res.status(500).send({
            message: "Unable to update course",
            error: error.message
        });
    }
}


async function getCourseByID(req, res) {
    try {
        const { id } = req.params;

        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).send({
                message: "Course not found"
            });
        }

        return res.status(200).send(course);

    } catch (error) {
        return res.status(500).send({
            message: "Unable to access course",
            error: error.message
        });
    }
}


module.exports = {
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    getCourseByID
};