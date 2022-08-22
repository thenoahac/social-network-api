const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema({
	thoughtText: {
		type: String,
		required: true,
		minLength: 1,
		maxLength: 280
	},
	createAt: {
		type: Date,
		default: Date.now,
		get: (date) => date.toLocaleString()
	},
	username: {
		type: String,
		required: true
	},
	reactions: [Reaction]
},
{
	toJSON: { getters: true },
	id: false
});

const reactionSchema = new Schema({
	reactionId: {
		type: Schema.Types.ObjectId,
		default: () => new Types.ObjectId()
	},
	reactionBody: {
		type: String,
		required: true,
		maxLength: 280
	},
	username: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now,
		get: (date) => date.toLocaleString()
	}
},
{
	toJSON: { getters: true },
	id: false
});

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thoughts', thoughtSchema);

module.exports = Thought;