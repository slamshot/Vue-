import router from '../../common/router'
class DefaultButtons {
    static addButton(path,name,dialogCallback){
        router.push({name,params:{useType:"add",dialogCallback}});
    }
    static modifyButton(path,name,id,dialogCallback){
        router.push({name,params:{useType:"modify",id,dialogCallback}});
    }
    static viewButton(path,name,id){
        router.push({name,params:{useType:"view",id}});
    }
}

export default DefaultButtons