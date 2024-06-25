export function CheckPassword({
        lowercase,
        uppercase,
        number,
        length,
        spesialchar,
        pass
    }
    :
    {
        lowercase: boolean,
        uppercase: boolean,
        number: boolean,
        length: number,
        spesialchar: boolean,
        pass: string
    }) {

    const strongRegex = new RegExp(`^${lowercase === true ? '(?=.*[a-z])' : ""}${uppercase? '(?=.*[A-Z])' : ""}${number? '(?=.*[0-9])' : ""}${spesialchar? '(?=.*[!@#\$%\^&\*])' : ""}(?=.{${length},})`);
    if (strongRegex.test(pass)) {
        return true
    } else {
        return false
    }
}

export function CheckEmail({ email }: { email: string }) {
    const validEmail = new RegExp(/(\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)/gm);

    if(validEmail.test(email)){
        return true
    }else{
        return false
    }
}