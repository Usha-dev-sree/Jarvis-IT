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
        if(req.user.role !=="instructor"&&(!course.instructor||!course.instructor.equals(req.user._id)))
        {
            return res.status(403).send({
                message :"YOU CAN ONLY DELETE THE COURSE WHICH YOU HAVE CREATED"
            })
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

        const editableFields = [
            "title",
            "description",
            "category",
            "level",
            "price",
            "duration",
            "instructor"
        ];

        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).send({
                message: "Course not found"
            });
        }

        editableFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                course[field] = req.body[field];
            }
        });

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

        const course = await Course.findById(id).populate(
            "instructor",
            "name email role"
        );

        if (!course) {
            return res.status(404).send({
                message: "Bad Request : Course not found"
            });
        }

        return res.status(200).send(course);

    } catch (error) {
        console.log("Hello")
    }
}


module.exports = {
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    getCourseByID
};