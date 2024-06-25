import bcryptjs from 'bcryptjs';

const  Check_Pass = async ({u_password , d_password} : {u_password : any, d_password: any}) => {

    if (await bcryptjs.compare(u_password, d_password)) {
        return true
    }else{
        return false
    }
}

export default Check_Pass