const UserLogin = require("../models").UserLogin;
const UserRole = require("../models").UserRole;
const UserProfile = require("../models").UserProfile;
const UserNotification = require("../models").UserNotification;

const emailSender = require("../utils/emails");
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const db = require("../models");
const Op = require("../models").Sequelize.Op;

module.exports = {
    async createUserLogin(req, res) {
        try {
            let user = await UserLogin.findAll({
                where: { UserEmail : req.query.userEmail.toLowerCase() }
            });
            
            if(user.length > 0)
                throw new Error("The specified email already exists in the system")

            let salt = await bcrypt.genSalt(10);
            let hashed = await bcrypt.hash(req.query.userPass, salt);

            user = await UserLogin.create({
                UserId: uuidv4(),
                UserEmail: req.query.userEmail.toLowerCase(),
                UserPwd: hashed,
                LatestCode: req.query.verifCode
            })
            .then(async usr => {
                usr = usr.get({ plain: true })
                let userPromises = [];
                userPromises.push(UserRole.create({ UserId: usr.UserId, IsContributor: true }));
                userPromises.push(UserProfile.create({ UserId: usr.UserId, UserEmail: req.query.userEmail.toLowerCase() }));
                userPromises.push(UserNotification.create({ UserId: usr.UserId }));
                let results = await Promise.all(userPromises);

                usr.Roles = results[0].dataValues;
                usr.Profile = results[1].dataValues;
                usr.Notifications = results[2].dataValues;

                return usr;
            })

            await emailSender.sendVerificationEmail(user.UserEmail.toLowerCase(), user.LatestCode);
            res.status(200).send(user);
        } catch (e) {
            res.status(500).send({ error: e.message });
        }
    },
    async verifyUserAccount(req, res){
        try{
            let user = await UserLogin.findAll({
              where: { UserEmail : req.query.userEmail.toLowerCase(), LatestCode: req.query.verifCode }
            });

            if(user.length == 0)
              throw new Error("The provided code doesn't match the code sent to " + req.query.userEmail.toLowerCase() );

            await UserLogin.update({ IsVerified : true }, { where: { UserEmail : req.query.userEmail.toLowerCase() } });
            user.IsVerified = true;

            res.status(200).send(user);
        } catch (e) {
            res.status(500).send({ error: e.message });
        }
    },
    async verifyUserCode(req, res){
        try {
            let user = await UserLogin.findAll({ raw: true, 
              where: { UserEmail : req.query.userEmail.toLowerCase(), LatestCode: req.query.verifCode }
            });

            if(user.length == 0)
              throw new Error("The provided code doesn't match the code sent to " + req.query.userEmail.toLowerCase())

            res.status(200).send(user[0]);
        } catch (e) {
            res.status(500).send({ error: e.message });
        }
    },
    async userLoginAttempt(req, res){
        try {
            let user = await UserLogin.findAll({ raw: true, 
              where: { UserEmail : req.query.userEmail.toLowerCase()  }
            });

            if(user.length == 0)
                throw new Error("The specified email doesn't exist in the system")
            else {
                let valid = await bcrypt.compare(req.query.userPwd, user[0].UserPwd);

                if(valid)
                {
                    if(!user[0].IsVerified || user[0].IsLocked)
                        res.status(200).send(user[0])
                    
                    let userPromises = [];
                    userPromises.push(UserRole.findAll({ raw: true, where: { UserId: user[0].UserId } }));
                    userPromises.push(UserProfile.findAll({ raw: true, where : { UserId: user[0].UserId } }));
                    userPromises.push(UserNotification.findAll({ raw: true, where : { UserId: user[0].UserId } }));
                    await Promise.all(userPromises)
                        .then(results => {
                            user[0].Roles = results[0][0];
                            user[0].Profile = results[1][0];
                            user[0].Notifications = results[2][0];

                            res.status(200).send(user[0]);
                        })
                }
                else
                {
                    if(user[0].FailedAttempts < 5) {
                        user[0].FailedAttempts++;
                        await UserLogin.update({ FailedAttempts : user[0].FailedAttempts, IsLocked: user[0].FailedAttempts == 5 }, 
                                                    { raw: true, where: { UserEmail : req.query.userEmail.toLowerCase() } })

                        throw new Error("The specified password is incorrect. You have "  + (5 - user[0].FailedAttempts) + " more attempts")
                    }
                    else
                    {
                        res.status(200).send(user[0]);
                    }
                }
            }
        } catch (e) {
            res.status(500).send({ error: e.message });
        } 
    },
    async updateUserNotifications(req, res) {
        try {
            await UserNotification.update({ PushActive : req.query.push, FeedActive: req.query.feed, EventActive: req.query.event }, { where: { UserId : req.query.userId } });
            let notifications = await UserNotification.findAll({ raw: true, where: { UserId : req.query.userId } });

            res.status(200).send(notifications[0]);
        } catch (e) {
            res.status(500).send({ error: e.message });
        }
    },
    async updateUserSettings(req, res) {
        try {
            let settings = req.body.settings;

            let emails = await UserLogin.findAll({ raw: true, 
                where: { UserEmail : settings.UserEmail.toLowerCase(), UserId : { [Op.ne]: settings.UserId }  }
            });

            if(emails.length > 0)
                throw new Error("Email " + settings.UserEmail + " is already beign used by a different account");
            
            if(settings.UserPhone != null) {
                let phones = await UserLogin.findAll({ raw: true, 
                    where: { UserPhone : settings.UserPhone, UserId : { [Op.ne]: settings.UserId }  }
                });

                if(phones.length > 0 )
                    throw new Error("Phone " + settings.UserPhone + " is already beign used by a different account")
            }
                        
            let newCode = (Math.floor(Math.random()*900000) + 100000);

            await UserLogin.update({ UserEmail: settings.UserEmail.toLowerCase(), UserPhone: settings.UserPhone, UserName: settings.UserName, IsVerified: !settings.ChangeEmail, LatestCode: newCode }, { raw: true, where: { UserId : settings.UserId } });
            await UserNotification.update({ PushActive: settings.Push, FeedActive: settings.Feed, EventActive: settings.Event }, { raw: true, where: { UserId : settings.UserId } });
            await UserProfile.update({ SecurityPin: settings.Pin }, { raw: true, where: { UserId : settings.UserId } });

            if(settings.ChangeEmail) await emailSender.sendVerificationEmail(settings.UserEmail.toLowerCase(), newCode);
            
            res.status(200).send({ updated: settings });
        } catch (e) {
            res.status(500).send({ error: e.message });
        }
    },
    async updateUserProfile(req, res) {
        try {
            let profile = req.body.profile;

            await UserProfile.update({ FirstName: profile.FirstName, MiddleName: profile.MiddleName, LastName: profile.LastName, Suffix: profile.Suffix, MaidenName: profile.MaidenName, 
                                                 Facebook: profile.Facebook, Instagram: profile.Instagram, Linkedin: profile.Linkedin, Twitter: profile.Twitter, UserImage: profile.UserImage }, 
                                                { where: { UserId : profile.UserId } });
            
            profile = await UserProfile.findAll({ raw: true, where: { UserId : profile.UserId } });

            res.status(200).send(profile[0]);
        } catch (e) {
            res.status(500).send({ error: e.message });
        }
    },
    async userRequestCode(req, res) {
        try {
            let user = await UserLogin.findAll({
              raw: true, where: { UserEmail : req.query.userEmail.toLowerCase() }
            });

            if(user.length == 0)
                throw new Error("The provided email doesn't exist in our records")

            await UserLogin.update({ LatestCode : req.query.verifCode }, { where: { UserEmail : req.query.userEmail.toLowerCase() } });
            user[0].LatestCode = req.query.verifCode;

            req.query.isPass ? await emailSender.sendResetEmail(user[0].UserEmail.toLowerCase(), user[0].LatestCode) : await emailSender.sendVerificationEmail(user[0].UserEmail.toLowerCase(), user[0].LatestCode);
            
            res.status(200).send(user[0]);
        } catch (e) {
            res.status(500).send({ error: e.message });
        }
    },
    async updateUserPassword(req, res) {
        try {
            let salt = await bcrypt.genSalt(10);
            let hashed = await bcrypt.hash(req.query.newPass, salt);

            await UserLogin.update({ UserPwd: hashed, FailedAttempts: 0, IsLocked: false }, { where: { UserEmail : req.query.userEmail.toLowerCase() } })
            let user = await UserLogin.findAll({where: { UserEmail : req.query.userEmail.toLowerCase() }});

            res.status(200).send(user[0]);
        } catch (e) {
            res.status(500).send({ error: e.message });
        }
    }
};