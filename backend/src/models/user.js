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
      this.attendedCourses.push(course)
      course.participants.push(this)

      await this.save()
      await course.save()
    }
  }
)

module.exports = mongoose.model('User', userSchema)
