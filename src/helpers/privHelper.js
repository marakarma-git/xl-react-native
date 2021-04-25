import {ACTION_PRIVILEDGE} from '../constant/priviledge';

export default priviledgeHelper = {
    isHasPriviledge: (actionCode, userAuthorityList) => {
        if(typeof actionCode != 'string' || !actionCode){
            console.log("action code harus string");
            return;
        }

        if(typeof userAuthorityList != 'object' || !userAuthorityList){
            console.log("User authority list harus array");
            return;
        }

        if(actionCode.length >= 2 && actionCode <= 4){
            console.log("Format action code tidak sesuai");
            return;
        }      
        
        let tempPrivId = "";
        let hasPriviledge = "";

        ACTION_PRIVILEDGE.map((actionPriviledge) => {
            actionPriviledge.activity.map((activity) => {
                if(activity.actionCode === actionCode){
                    tempPrivId = activity.privId;
                }
            });
        });

        if(tempPrivId){
            userAuthorityList.map((authority) => {
                if(authority.priviledgeId == tempPrivId){
                    hasPriviledge = authority.priviledgeId
                }
            });
        }

        return hasPriviledge ? true : false;

    }
}