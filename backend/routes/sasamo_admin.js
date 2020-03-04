var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var secretObj = require('../config/jwt')
const moment = require('moment')

var mysql_dbc = require('../model/db/db_conn')();
var connection = mysql_dbc.init();

const resModel = () => {
	return {
		success: Boolean,
		error: String,
		data: String
	}
}
const loginModel = () => {
	return {
        success: Boolean,
		error: String,
        data: String,
        access : Boolean
	}
} 

const levelList = ['A', 'B', 'C', 'D']


// 로그인 
router.post('/user/login', function (req, res) {
    var id = req.body.id
    var pw = req.body.pw
    var query = `select * from ssm_member where ssm_id='${id}'`;
    console.log(`admin login ${id} and ${pw}`)
    console.log(typeof id)
    connection.query(query, function (err, result) {
        if (err) {
            console.log(err)
            throw err;
        } else {
            console.log(typeof result, result.length, result)
            console.log('user DATA: ', result[0])
            let data = loginModel()
            if (result[0]) {
                if (id === result[0].ssm_id && pw === result[0].ssm_pw) {
                    if (result[0].ssm_level != "E") {
                        // 정상적으로 로그인하는 경우
                        const userInfo = result[0]
                        // 로그인에 쓰일 토큰을 생성한다 
                        var token = jwt.sign({ data: userInfo }, secretObj.secret, { expiresIn: '5m' })
                        console.log("CREATE TOKEN :", token)
                        data.data = token
                        data.success = true
                        data.access = true
                        res.send(data)

                    } else {
                        // 접근 권한이 없는 경우
                        data.success = false
                        data.access = false
                        data.error = "접근권한이 없습니다."
                        res.send(data)
                    }
                }
            } else {
                // 로그인 정보가 달라 실패한 경우
                data.success = false
                data.access = false
                data.error = "정상적인 로그인이 아닙니다."
                res.send(data)
            }
        }
    })
})

const compareLevel = (level) => {
    return levelList.indexOf(level)

}

// 사역자 등급 변경 
router.post('/auth/class', (req, res) => {
    let token = req.headers['access-token'] || req.query.token
    let decoded = jwt.decode(token, secretObj.secret)
    

    if(decoded != null ){
        const {ssm_level, ssm_grptype, ssm_seq} = req.body
        const query = `update ssm_member set ssm_level = ${ssm_level}, ssm_grptype = ${ssm_grptype} where ssm_seq = ${ssm_seq}`
        let data = resModel()

        connection.query(query, (err, result) => {
            if(err) {
                console.log(err)
                data.success = false
                data.error = err
                res.send(data)
                throw err
            } else {
                data.success = true
                res.send(data)
            }
        })
    }
})

const arrangeTeam = (user, ssm_new_team) => {
    console.log('@@@@@@@@@@@@@@@@@@@',user, ssm_new_team)
    const {ssm_seq} = user
    console.log('SEQQQQQQQQQQQQQQ',ssm_seq)
    const query = ` insert into ssm_member(ssm_seq, ssm_team) values(${ssm_seq}, ${ssm_new_team})
                    on duplicate key update ssm_team = ${ssm_new_team}`
    let data = resModel()    
    connection.query(query, (err, result) => {
        if(err) {
            data.error = err
            data.success = false
            console.log(err)
            console.log("FAIL")
            return false
        } else {
            data.success = true
            data.data = 'Arrange team success'
            console.log("Success")
            console.log(data)
            return data
        }
    })
    


}

router.post('/team/arrange', async (req, res) => {
    let token = req.headers['access-token'] || req.query.token
    let decoded = jwt.decode(token, secretObj.secret)
    let data = resModel()

    const {ssm_user, ssm_new_team} = req.body
    console.log("arrange DATA : ", ssm_user.length, ssm_user)
    

    if(decoded) {
        let result = ''
        for(let idx in ssm_user) {
            console.log('FOR DATA : ', ssm_user[idx])
            await arrangeTeam(ssm_user[idx], ssm_new_team)
        }
        
        data.success = true
        data.data = 'Arrange team success'
        res.send(data)

    } else {
        const errData = resModel()
        errData.error = 'Vaild Token'
        errData.success = false
        res.send(errData)
    }
    
})

// post api SAMPLE
router.post('sample', (req, res) => {
    let token = req.headers['access-token'] || req.query.token
    let decoded = jwt.decode(token, secretObj.secret)
    let data = resModel()    
    const {ssm_seq, chk_isApply, chk_isCheck} = req.body

    if(decoded) {
        const query = ''
        connection.query(query, (err, result) => {
            if(err) {
                data.error = err
                data.success = false
                res.send(data)
                throw err
            } else {
                data.success = true
                data.data = result
                res.send(data)
            }
        })

    } else {
        data.error = 'Vaild Token'
        data.success = false
        res.send(data)
    }
    
})


// 사역자 조 변경 
router.post('/team/change', async (req, res) => {
    let token = req.headers['access-token'] || req.query.token
    let decoded = jwt.decode(token, secretObj.secret)
    const isAdmin = await compareLevel(decoded.ssm_level)
    
    if(isAdmin !== -1){
        const {ssm_level, ssm_grptype, ssm_seq} = req.body
        const query = `update ssm_member set ssm_level = ${ssm_level}, ssm_grptype = ${ssm_grptype} where ssm_seq = ${ssm_seq}`
        let data = resModel()

        connection.query(query, (err, result) => {
            if(err) {
                console.log(err)
                data.success = false
                data.error = err
                res.send(data)
                throw err
            } else {
                data.success = true
                res.send(data)
            }
        })
    }
})

const updateUser = (ssm_seq, ssm_name, ssm_team, grp_seq) => {
    const query = ` update ssm_member set ssm_name = '${ssm_name}', ssm_team=${ssm_team}, grp_seq=${grp_seq}
                    where ssm_seq=${ssm_seq}`
    connection.query(query, (err, result) => {
        if(err){
            console.log(err)
            throw err
        } else {
            console.log("ADMIN USER DATA UPDATE :", result )
            return true
        }
    })

}

const updateUserCheck = (ssm_seq,chk_isApply, chk_isCheck) => {
    const query = ` update ssm_check set chk_isApply = '${chk_isApply}', chk_isCheck='${chk_isCheck}'
                    where ssm_seq=${ssm_seq}`
    connection.query(query, (err, result) => {
        if(err){
            console.log(err)
            throw err
        } else {
            console.log("ADMIN USER CHECK DATA UPDATE :", result)
            return true
        }
    })

}
// 사역자 관리 - 체크 데이터 update
router.post('/user/update/check', async (req, res) => {
    let token = req.headers['access-token'] || req.query.token
    let decoded = jwt.decode(token, secretObj.secret)
    const {ssm_seq, chk_isApply, chk_isCheck} = req.body

    if (decoded) {
        const isUserCheckUpdate =  await updateUserCheck(ssm_seq, chk_isApply, chk_isCheck)
        let data = resModel()
        if(isUserCheckUpdate) {
             data.success = true
             res.send(data)
        } else {
             data.success = false
             data.error = 'wrong user data'
             res.send(data)  
        }

    } 
})


// 사역자 관리 - 유저 데이터 update
router.post('/user/update', async (req, res) => {
    let token = req.headers['access-token'] || req.query.token
    let decoded = jwt.decode(token, secretObj.secret)
    const {ssm_seq, ssm_name, ssm_team, grp_seq} = req.body
    
    if (decoded) {
       const isUserUpdate =  await updateUser(ssm_seq, ssm_name, ssm_team, grp_seq)
       let data = resModel()
       if(isUserUpdate) {
            data.success = true
            res.send(data)
       } else {
            data.success = false
            data.error = 'wrong user data'
            res.send(data)  
       }
     } else {
        data.error = 'Vaild Token'
        data.success = false
        res.send(data)
     }

})
// 팀 생성
router.post('/team/create', (req, res) => {
    let token = req.headers['access-token'] || req.query.token
    let decoded = jwt.decode(token, secretObj.secret)
    let data = resModel()
    const {tm_number, tm_leader} = req.body

    if(decoded) {
        const query = ` insert into ssm_team(tm_leader, tm_number)
                        values(${tm_leader}, ${tm_number})`
        connection.query(query, (err, result) => {
            if(err) {
                data.error = err
                data.success = false
                console.error(err)
                res.send(data)
                throw err
            } else {
                data.success = true
                data.data = 'insert team success'
                res.send(data)
            }
        })
    } else {
        data.error = 'Vaild Token'
        data.success = false
        res.send(data)
    }
})

// 팀 관리 - 리스트 
router.get('/team/list', (req, res) => {
    let token = req.headers['access-token'] || req.query.token
    let decoded = jwt.decode(token, secretObj.secret)

    if (decoded) {
        const query = ` select * from view_team_list;`
        connection.query(query, (err, result) => {
            if (err) {
                console.log(err)
                throw err
            } else {
                console.log("ADMIN TEAM DATA :", result.length)
                res.send(result)
            }
        })

    } else {
        res.send("no token")

    }
})

// 사역자 관리 메인 리스트 
router.get('/user/list', (req, res) => {
    let token = req.headers['access-token'] || req.query.token
    let decoded = jwt.decode(token, secretObj.secret)

    console.log("request Token :", token)
    console.log("DECODED INFO", decoded)
    if (decoded) {
        const query = `select a.ssm_seq, a.ssm_name, a.ssm_team, a.grp_seq, a.ssm_phone, b.chk_isApply, b.chk_isCheck 
                        from (select * from ssm_member) a, ssm_check b
                        where a.ssm_seq = b.ssm_seq;`
        connection.query(query, (err, result) => {
            if (err) {
                console.log(err)
                throw err
            } else {
                console.log("ADMIN USER DATA :", result[0])
                res.send(result)
            }
        })

    } else {
        res.send("no token")

    }

})

router.post('/event/leader', (req, res) => {
    let token = req.headers['access-token'] || req.query.token
    let decoded = jwt.decode(token, secretObj.secret)
    let data = resModel()
    const {ssm_name} = req.body
    console.log(ssm_name)
    
    if(decoded) {
        const query = `select ssm_seq, ssm_phone from ssm_member where ssm_name = '${ssm_name}'`
        connection.query(query, (err, result) => {
            if(err) {
                console.log(err)
                data.error = err 
                data.success = false
                res.send(data)
            } else {
                if(result[0] != undefined) {
                    data.success = true
                    data.data = result[0]
                    console.log('1',result[0])
                    res.send(data)
                } else {
                    data.success = false
                    data.error = 'no data'
                    console.log('2')
                    res.send(data)
                }
            }
        })
    } else {
        data.error = 'Vaild Token'
        data.success = false
        res.send(data)
    }

})

router.post('/event/create', async (req, res) => {
    let token = req.headers['access-token'] || req.query.token
    let decoded = jwt.decode(token, secretObj.secret)
    let data = resModel()
    const {evt_name, evt_date, evt_kind, evt_today} = req.body
    console.log('DATe :', evt_date, typeof evt_date)
    
    
    if(decoded) {
        const query = ` insert into ssm_event(evt_name, evt_date, evt_kind, evt_today)
                        values('${evt_name}', STR_TO_DATE('${evt_date}', '%Y-%m-%d'), ${evt_kind}, '${evt_today}' )`
        connection.query(query, (err, result) => {
            if(err) {
                data.error = err
                data.success = false
                console.error(err)
                res.send(data)
                throw err
            } else {
                data.success = true
                data.data = 'insert event success'
                res.send(data)
            }
        })
    } else {
        data.error = 'Vaild Token'
        data.success = false
        res.send(data)
    }
})

router.get('/event/list', async (req, res) => {
    let token = req.headers['access-token'] || req.query.token
    let decoded = jwt.decode(token, secretObj.secret)
    let data = resModel()

    if(decoded){
        const query = `select * from ssm_event`
        console.log('query :', query)

        connection.query(query, (err, result) => {
            if(err){
                data.error = err
                data.success = false
                res.send(data)
                throw err
            } else {
                data.success = true
                data.data = result
                console.log(result[0].evt_date, typeof result[0].evt_date)
                res.send(data)
            }
        })
    } else {
        data.error = 'Vaild Token'
        data.success = false
        res.send(data)

    }
})

module.exports = router;