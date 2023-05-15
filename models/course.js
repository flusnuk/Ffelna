const {Schema, model} = require('mongoose')

const itemSchema = new Schema({
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
  desc: String,
  sizes: String,
  property: String,
  inStock: Boolean,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  category: String
})

itemSchema.method('toClient', function() {
  const course = this.toObject()

  course.id = course._id
  delete course._id

  return course
})

module.exports = model('Course', itemSchema)