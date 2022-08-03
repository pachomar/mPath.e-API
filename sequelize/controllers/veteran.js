const VeteranInfo = require("../models").VeteranInfo;
const VeteranOwner = require("../models").VeteranOwner;
const VeteranMOS = require("../models").VeteranMOS;
const VeteranUnit = require("../models").VeteranUnit;
const VeteranEngagement = require("../models").VeteranEngagement;
const VeteranAward = require("../models").VeteranAward;
const VeteranBadge = require("../models").VeteranBadge;
const VeteranMedia = require("../models").VeteranMedia;

const UserProfile = require("../models").UserProfile;
const Insignia = require("../models").Insignia;
const Branch = require("../models").Branch;
const Ribbon = require("../models").Ribbon;
const emailSender = require("../utils/emails");
const db = require("../models");
const { v4: uuidv4 } = require('uuid');
const sequelize = require("../models").Sequelize;
const Op = require("../models").Sequelize.Op;

const Enums = require("../utils/enums");

module.exports = {
    async updateVeteranBasic(req, res) { 
        try {
            let veteran = req.body.veteran;
            let owner = veteran.Owner;

            if(veteran.VeteranId == null)
            {
                veteran = await VeteranInfo.create({
                    VeteranId: uuidv4(), FirstName: veteran.FirstName, MiddleName: veteran.MiddleName, LastName: veteran.LastName, 
                    Suffix: veteran.Suffix, BirthMonth: veteran.BirthMonth, BirthDay: veteran.BirthDay, BirthYear: veteran.BirthYear,
                    City: veteran.City, StateCode: veteran.StateCode, Country: veteran.Country, IsDeceased: veteran.IsDeceased,
                    DeathMonth: veteran.DeathMonth, DeathDay: veteran.DeathDay, DeathYear: veteran.DeathYear,
                    CauseId: veteran.CauseId, BurialId: veteran.BurialId })
                .then(async vet => {
                    vet = vet.get({ plain: true})
                    owner = await VeteranOwner.create({ 
                        UserId: owner.UserId, VeteranId: vet.VeteranId, RelationshipId: owner.RelationshipId,
                        IsOwn: owner.IsOwn, IsHelp: owner.IsHelp, IsOther: owner.IsOther })
                    .then(async vetOwner => {
                        vet.Owner = vetOwner.dataValues;
                    });
                    
                    return vet;
                })
            }
            else
            {
                await VeteranInfo.update({ 
                    FirstName: veteran.FirstName, MiddleName: veteran.MiddleName, LastName: veteran.LastName, 
                    Suffix: veteran.Suffix, BirthMonth: veteran.BirthMonth, BirthDay: veteran.BirthDay, BirthYear: veteran.BirthYear,
                    City: veteran.City, StateCode: veteran.StateCode, Country: veteran.Country, IsDeceased: veteran.IsDeceased,
                    DeathMonth: veteran.DeathMonth, DeathDay: veteran.DeathDay, DeathYear: veteran.DeathYear,
                    CauseId: veteran.CauseId, BurialId: veteran.BurialId }, { where: { VeteranId : veteran.VeteranId } });

                await VeteranOwner.update({ 
                    UserId: owner.UserId, VeteranId: vet.VeteranId, RelationshipId: owner.RelationshipId,
                    IsOwn: owner.IsOwn, IsHelp: owner.IsHelp, IsOther: owner.IsOther }, { where: { VeteranId : veteran.VeteranId } });

                veteran = await VeteranInfo.findAll({ raw:true, where: { VeteranId : veteran.VeteranId } });
                owner = await VeteranOwner.findAll({ raw:true, where: { VeteranId : veteran.VeteranId } });

                veteran[0].Owner = owner[0];
                veteran = veteran[0];
            }

            if(veteran.Owner.IsOwn)
            {
                await UserProfile.update({ FirstName: veteran.FirstName, MiddleName: veteran.MiddleName, 
                        LastName: veteran.LastName, Suffix: veteran.Suffix }, { where: { UserId : veteran.Owner.UserId } });
            }

            res.status(200).send(veteran);
        } catch (e) {
            res.status(500).send({ error: e.message });
        }
    },
    async updateVeteranService(req, res) {
        try {
            let veteran = req.body.veteran;

            await VeteranInfo.update({ 
                BranchId: veteran.BranchId, EnlistMonth: veteran.EnlistMonth, EnlistDay: veteran.EnlistDay, 
                EnlistYear: veteran.EnlistYear, EntryCity: veteran.EntryCity, EntryState: veteran.EntryState,
                CompletedMonth: veteran.CompletedMonth, CompletedDay: veteran.CompletedDay, CompletedYear: veteran.CompletedYear, IsDeceased: veteran.IsDeceased,
                TypeId: veteran.TypeId, RankId: veteran.RankId }, { where: { VeteranId : veteran.VeteranId } });

            veteran = await VeteranInfo.findAll({ raw:true, where: { VeteranId : veteran.VeteranId } });

            res.status(200).send(veteran[0]);
        } catch (e) {
            res.status(500).send({ error: e.message });
        }
    },
    async updateVeteranTitles(req, res) {
        try {
            let veteran = req.body.veteran;
            let promises = []; let counter = 0;

            await VeteranMOS.destroy({ where : { VeteranId: veteran.VeteranId } });
            veteran.MOSCodes.forEach(mos => {
                promises.push(VeteranMOS.create({ VeteranId: veteran.VeteranId, MOSCodeId: mos.id, SortOrder: counter })); counter++;
            });
            await Promise.all(promises);

            promises = []; counter = 0;
            await VeteranUnit.destroy({ where : { VeteranId: veteran.VeteranId } });
            veteran.Units.forEach(unit => {
                if(unit.Unit && unit.Unit.length > 0) {
                    promises.push(VeteranUnit.create({ VeteranId: veteran.VeteranId, Unit: unit.Unit, SortOrder: counter })); counter++;
                }
            });
            await Promise.all(promises);

            promises = []; counter = 0;
            await VeteranEngagement.destroy({ where : { VeteranId: veteran.VeteranId } });
            veteran.Engagements.forEach(engage => {
                if(engage.Engagement && engage.Engagement.length > 0) {
                    promises.push(VeteranEngagement.create({ VeteranId: veteran.VeteranId, Engagement: engage.Engagement, SortOrder: counter })); counter++;
                }
            });
            await Promise.all(promises);

            promises = []; counter = 0;
            await VeteranAward.destroy({ where : { VeteranId: veteran.VeteranId } });
            veteran.Awards.forEach(award => {
                if(award.Award && award.Award.length > 0) {
                    promises.push(VeteranAward.create({ VeteranId: veteran.VeteranId, Award: award.Award, SortOrder: counter })); counter++;
                }
            });
            await Promise.all(promises);

            promises = []; counter = 0;
            await VeteranBadge.destroy({ where : { VeteranId: veteran.VeteranId } });
            veteran.Badges.forEach(badge => {
                promises.push(VeteranBadge.create({ VeteranId: veteran.VeteranId, RibbonId: badge.id, SortOrder: counter })); counter++;
            });
            await Promise.all(promises);

            res.status(200).send(veteran);
        } catch (e) {
            res.status(500).send({ error: e.message });
        }
    },
    async uploadVeteranMedia(req, res){
        try {
            let media = req.body.media;
            let existing = await VeteranMedia.findAll({ where: { VeteranId: media.VeteranId } });

            if(media.IsProfile) { 
                await VeteranMedia.update({ IsProfile: false }, { where: { VeteranId : media.VeteranId, IsProfile: true } })
            }

            media = await VeteranMedia.create({
                VeteranId: media.VeteranId, IsProfile: media.IsProfile, Comments: media.Comments, 
                Tags: media.Tags, ImageSrc: media.ImageStr, Height: media.Height, Width: media.Width, SortOrder: existing.length })
            .then(async vet => {         
                if(media.IsProfile)
                {
                    vet = await VeteranOwner.findAll({ raw: true, where: { VeteranId: media.VeteranId } })
                    .then( async vetOwner => {
                        if(vetOwner[0].IsOwn) {
                            await UserProfile.update({ UserImage: media.ImageStr }, { raw: true, where: {UserId : vetOwner[0].UserId} });
                        }
                        return vetOwner[0];
                    })
                }
                return vet;
            })

            res.status(200).send(media);
        } catch (e) {
            res.status(500).send({ error: e.message });
        }
    },
    async submitVeteranProfile(req, res) {
        try {
            let info = req.body.info;
            let veteran = await VeteranInfo.findAll({ raw: true, where: { VeteranId: info.VeteranId } });
            let user = await UserProfile.findAll({ raw: true, where: { UserId: info.UserId } });

            emailSender.sendApprovalEmail(info.UserEmail, info.VeteranId, veteran[0].FirstName + " " + veteran[0].LastName, user[0].FirstName != null && user[0].LastName != null ? user[0].FirstName + " " + user[0].LastName : null);

            res.status(200).send({ success: 'An email was sent to the corresponding proctor for approval'});
        } catch (e) {
            res.status(500).send({ error: e.message });
        }
    },
    async searchWithFilters(req, res) {
        try {
            let searchValue = req.query.searchValue;
            let resultIds = []; let Ids = []; let veteranList = [];

            if(searchValue.length > 0) {
                resultIds = await VeteranInfo.findAll({ attributes: ["VeteranId"], raw: true, 
                            where: [sequelize.where(sequelize.fn("concat", sequelize.col("FirstName"), ' ', sequelize.col("LastName")), {[Op.like]: '%' + searchValue +'%'}),]
                        })
                        .then( res => { return [...resultIds, ...res] })
                        .catch(error => { console.log(error) });

                resultIds = await VeteranInfo.findAll({ attributes: ["VeteranId"], raw: true, 
                    where: { [Op.or]: [{FirstName: {[Op.like]: '%' + searchValue +'%'}}, {LastName: {[Op.like]: '%' + searchValue +'%'}} ]} })
                        .then( res => { return [...resultIds, ...res] })
                        .catch(error => { console.log(error) });
            }
            else if(searchValue.length == 0 && parseInt(req.query.branch) == 0 && req.query.mos.length == 0 && parseInt(req.query.buried) == 0 && parseInt(req.query.state) == 0) {
                resultIds = await VeteranInfo.findAll({ attributes: ["VeteranId"], raw: true })
                        .then( res => { return [...resultIds, ...res] })
                        .catch(error => { console.log(error) });
            }

            if(parseInt(req.query.branch) > 0) {
                resultIds = await VeteranInfo.findAll({ attributes: ["VeteranId"], raw: true, where: { BranchId: parseInt(req.query.branch) } }) 
                .then( res => { return [...resultIds, ...res] })
                .catch(error => { console.log(error) })
            }

            if(parseInt(req.query.buried) > 0) {
                resultIds = await VeteranInfo.findAll({ attributes: ["VeteranId"], raw: true, where: { BurialId: parseInt(req.query.buried) } }) 
                .then( res => { return [...resultIds, ...res] })
                .catch(error => { console.log(error) })
            }

            if(req.query.unit === 'true') {
                resultIds = await VeteranUnit.findAll({ attributes: ["VeteranId"], raw: true, where: { Unit: {[Op.like]: '%' + searchValue +'%' }} }) 
                    .then( res => { return [...resultIds, ...res] })
                    .catch(error => { console.log(error) })
            }

            if(req.query.mos.length > 0) {
                mosIds = req.query.mos.split(',');
                resultIds = await VeteranMOS.findAll({ attributes: ["VeteranId"], raw: true, where: { MOSCodeId : mosIds } })
                    .then( res => { return [...resultIds, ...res] })
                    .catch(error => { console.log(error) })
            }

            if(req.query.state.length > 0) {
                resultIds = await VeteranInfo.findAll({ attributes: ["VeteranId"], raw: true, where: { StateCode : req.query.state } })
                    .then( res => { return [...resultIds, ...res] })
                    .catch(error => { console.log(error) })
            }

            if(req.query.award === 'true') {
                resultIds = await VeteranAward.findAll({ attributes: ["VeteranId"], raw: true, where: { Award: {[Op.like]: '%' + searchValue +'%' }} }) 
                    .then( res => { return [...resultIds, ...res] })
                    .catch(error => { console.log(error) })
            }

            if(req.query.conflict === 'true') {
                resultIds = await VeteranEngagement.findAll({ attributes: ["VeteranId"], raw: true, where: { Engagement: {[Op.like]: '%' + searchValue +'%' }} }) 
                    .then( res => { return [...resultIds, ...res] })
                    .catch(error => { console.log(error) })
            }

            resultIds = resultIds.filter( (v,i,a) => a.findIndex( t => (t.VeteranId === v.VeteranId)) === i);
            resultIds.forEach((item) => {Ids.push(item.VeteranId)});

            let results = await VeteranInfo.findAll({ attributes: ["VeteranId", "FirstName", "MiddleName", "LastName", "BranchId", "RankId"],
                raw: true, where: { VeteranId: Ids } });

            let images = await VeteranMedia.findAll({ raw:true, attributes: ["VeteranId", "ImageSrc"], where: { VeteranId : Ids, IsProfile: true }})
                .then(res => { return res });

            results.forEach(async (item) => {
                let img = images.filter(({VeteranId}) => VeteranId == item.VeteranId)[0];

                veteranList.push({
                    Id: item.VeteranId,
                    Name: item.FirstName + (item.MiddleName != null ? ' ' + item.MiddleName : '') + ' ' + item.LastName,
                    Branch: item.BranchId != null ? Enums.ServiceBranch[item.BranchId] : '',
                    Rank: item.BranchId != null && item.RankId != null ? Enums.RankByBranch[item.BranchId][item.RankId] : '',
                    Picture: img != null ? img.ImageSrc : null
                });
            })

            res.status(200).send(veteranList);
        } catch (e) {
            res.status(500).send({ error: e.message });
        }
    },
    async getVeteranProfile(req, res) {
        try {
            let veteran = await VeteranInfo.findAll({ raw: true, where: { VeteranId: req.query.veteranId } }).then(vet => { return vet[0]; })

            let veteranPromises = [];
            veteranPromises.push(VeteranOwner.findAll({ raw: true, where: { VeteranId: veteran.VeteranId } }));
            veteranPromises.push(VeteranMOS.findAll({ raw: true, where: { VeteranId: veteran.VeteranId } }));
            veteranPromises.push(VeteranUnit.findAll({ raw: true, where: { VeteranId: veteran.VeteranId } }));
            veteranPromises.push(VeteranEngagement.findAll({ raw: true, where: { VeteranId: veteran.VeteranId } }));
            veteranPromises.push(VeteranAward.findAll({ raw: true, where: { VeteranId: veteran.VeteranId } }));
            veteranPromises.push(VeteranBadge.findAll({ raw: true, where: { VeteranId: veteran.VeteranId } }));
            veteranPromises.push(VeteranMedia.findAll({ raw: true, where: { VeteranId: veteran.VeteranId, IsProfile: true } }));
            if(veteran.BranchId != null) veteranPromises.push(Branch.findAll({ raw: true, where: { BranchId: veteran.BranchId } }));
            if(veteran.RankId != null) veteranPromises.push(Insignia.findAll({ raw: true, where: { RankId: veteran.RankId } }));

            await Promise.all(veteranPromises)
            .then(async results => {
                veteran.Owner = results[0][0];
                veteran.MOSCodes = results[1];
                veteran.Units = results[2];
                veteran.Engagements = results[3];
                veteran.Awards = results[4];
                
                if(results[5] != null) {
                    veteran.Badges = [];
                    let badgeArr = [];
                    results[5].forEach((item, idx) => {
                        veteran.Badges.push({ RibbonId: item.RibbonId });
                        badgeArr.push(Ribbon.findAll({ raw: true, where: { RibbonId: item.RibbonId } }));
                    });

                    if(req.query.images === 'true') {
                        await Promise.all(badgeArr)
                        .then(badges => {
                            veteran.BadgeImgs = [];
                            badges.forEach(res => {
                                res.forEach((item) => { veteran.BadgeImgs.push({ Img: item.Image }) })
                            });
                        });
                    }
                }

                veteran.DeathCause = veteran.CauseId != null ? Enums.DeathCause[veteran.CauseId] : null;
                veteran.BurialPlace = veteran.BurialId != null ? Enums.BurialPlace[veteran.BurialId] : null;
                veteran.Branch = veteran.BranchId != null ? Enums.ServiceBranch[veteran.BranchId] : null;
                veteran.Rank = veteran.RankId != null && veteran.BranchId != null ? Enums.RankByBranch[veteran.BranchId][veteran.RankId] : null;
                veteran.SeparationType = veteran.TypeId != null ? Enums.SeparationType[veteran.TypeId] : null;
                
                if(req.query.images === 'true') {
                    veteran.Profile = results[6] != null && results[6][0] != null ? results[6][0].ImageSrc : '';
                    veteran.BranchLogo = results[7] != null && results[7][0] != null? results[7][0].Image : null;
                    veteran.Insignia = results[8] != null && results[8][0] != null? results[8][0].Insignia : null;
                    veteran.InsigniaH = results[8] != null && results[8][0] != null? results[8][0].InsigniaH : null;
                    veteran.InsigniaW = results[8] != null && results[8][0] != null ? results[8][0].InsigniaW : null;
                    veteran.Insignia2 = results[8] != null && results[8][0] != null? results[8][0].Insignia2 : null;
                    veteran.Insignia2H = results[8] != null && results[8][0] != null? results[8][0].Insignia2H : null;
                    veteran.Insignia2W = results[8] != null && results[8][0] != null ? results[8][0].Insignia2W : null;
                    veteran.Insignia3 = results[8] != null && results[8][0] != null? results[8][0].Insignia3 : null;
                    veteran.Insignia3H = results[8] != null && results[8][0] != null? results[8][0].Insignia3H : null;
                    veteran.Insignia3W = results[8] != null && results[8][0] != null ? results[8][0].Insignia3W : null;
                }
                     
                res.status(200).send(veteran);
            });

        } catch (e) {
            res.status(500).send({ error: e.message });
        }
    },
    async getVeteranMedia(req, res) {
        try {
            let media = await VeteranMedia.findAll({ raw: true, where: { VeteranId: req.query.veteranId } }).then(vet => { return vet })

            res.status(200).send(media);
        } catch (e) {
            res.status(500).send({ error: e.message });
        }
    }
}