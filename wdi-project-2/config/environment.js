module.exports = {
  port: process.env.PORT || 3000,
  dbUri: process.env.MONGODB_URI || 'mongodb://localhost/Obscouture',
  sessionSecret: process.env.SESSION_SECRET || 'YghT5s617/1{%sDt'
};
