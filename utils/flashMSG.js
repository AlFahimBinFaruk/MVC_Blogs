class Flash{
    constructor(req){
        this.req=req
        this.success=this.extractFlashMsg("success")
        this.fail=this.extractFlashMsg("fail")
    }

    extractFlashMsg(name){
        let msg=this.req.flash(name)
        return msg.length > 0 ? msg[0] : false
    }

    hasMsg(){
        return !this.success && !this.fail ? false : true
    }

    static getMsg(req){
        let flash=new Flash(req)
        return {
            success:flash.success,
            fail:flash.fail,
            hasMsg:flash.hasMsg()
        }
    }
}

module.exports=Flash