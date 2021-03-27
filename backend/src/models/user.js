const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    attendedCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        autopopulate: { maxDepth: 2 },
      },
    ],
  },
  { timestamps: true }
)

userSchema.plugin(autopopulate)
userSchema.loadClass(
  class {
    async attendToCourse(course) {
      if (course.participants.some(el => el._id.equals(this._id))) {
        const err = new Error('Already attended')
        err.status = 400

        throw err
      }

      this.attendedCourses.push(course)
      course.participants.push(this)

      await this.save()
      await course.save()
    }
  }
)

module.exports = mongoose.model('User', userSchema)
