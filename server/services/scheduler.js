const schedule = require('node-schedule');
const UserModel = require('../api/models/user.model');
const { sendEmailReminderConfirm,sendEmailDelete } = require('./emailer');

const jobs = [
    //
    function()
    {
        schedule.scheduleJob('0 0 22 * *', async ()=>{
            const userNotConfirmedSinceTwoDays = await UserModel.find({
                accountCreation: { 
                  $gte: new Date(new Date() - 48 * 60 * 60 * 1000) //48h
                },
                accountConfirmed: false
              })
            for (const userNotConfirmed of userNotConfirmedSinceTwoDays) {
                const key = await confirmKeyGenerator(
                    userNotConfirmed.id,
                    userNotConfirmed.userName,
                    userNotConfirmed.userEmail
                  );
                  await sendEmailReminderConfirm(userNotConfirmed.userEmail, userNotConfirmed.id, key);
            }

            const userNotConfirmedSinceOneWeek = await UserModel.find({
                accountCreation: { 
                  $gte: new Date(new Date() - 7*24 * 60 * 60 * 1000) //7days
                },
                accountConfirmed: false
              })
            for (const userToForget of userNotConfirmedSinceOneWeek) {

                  await sendEmailDelete(userToForget.userEmail);
                  await userToForget.deleteOne()
            }
        })
    }
]

module.exports = jobs;