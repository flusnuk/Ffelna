const {Schema, model} = require('mongoose')

const courseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  img: String,
  img2: String,
  img3: String,
  color: String,
  mainDesc: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  category: String
})

courseSchema.method('toClient', function() {
  const course = this.toObject()

  course.id = course._id
  delete course._id

  return course
})

module.exports = model('Course', courseSchema)