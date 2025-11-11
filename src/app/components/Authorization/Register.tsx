'use client'
interface RegisterProps {
    user: {
        userName: string;
        email: string;
        password: string;
        confirmPassword: string;
        check: boolean
    }
}
const Register = ({ user }: RegisterProps) => {
    
    const checkUserName = user.userName === '' && user.check;
    const checkEmail = user.email === '' && user.check;
    const checkPassword = user.password === '' && user.check;
    const checkConfirmPassword = user.confirmPassword === '' && user.check;
   
    return (
        <>
         <div className="mb-10 ">
            <label htmlFor="userName" className="flex items-start mb-3 text-sx font-normal">{checkUserName && <p className="mt-1 text-[10px] font-normal text-red_color">*</p>}<p>User name:</p></label>
            <input className="px-5 w-72 h-[52px] text-[14px] text-inp_col rounded-[50px] bg-bg_fon focus:outline-none" type="text" id="userName" name="userName" autoComplete="off" defaultValue="" />
        {checkUserName  && (<p className="mt-1 text-[10px] font-normal text-red_color">The user name is a required field</p>)}
        </div>

        <div className="mb-10 ">
            <label htmlFor="email" className="flex items-start mb-3 text-sx font-normal">{checkEmail && <p className="mt-1 text-[10px] font-normal text-red_color">*</p>}<p>Email:</p></label>
            <input className="px-5 w-72 h-[52px] text-[14px] text-inp_col rounded-[50px] bg-bg_fon focus:outline-none" type="email" id="email" name="email" autoComplete="off" defaultValue="" />
        {checkEmail  && (<p className="mt-1 text-[10px] font-normal text-red_color">The email is a required field</p>)}
        </div>

        <div className="mb-10 ">
           <label htmlFor="password" className="flex items-start mb-3 text-sx font-normal">{checkPassword && <p className="mt-1 text-[10px] font-normal text-red_color">*</p>}<p>Password:</p></label>
           <input className="px-5 w-72 h-[52px] text-[14px] text-inp_col rounded-[50px] bg-bg_fon focus:outline-none" type="password" id="password" name="password" autoComplete="off" defaultValue="" />
        {checkPassword && (<p className="mt-1 text-[10px] font-normal text-red_color">The password is a required field</p>)}
        </div>
            
         <div className="mb-10 ">
           <label htmlFor="confirmPassword" className="flex items-start mb-3 text-sx font-normal">{checkConfirmPassword && <p className="mt-1 text-[10px] font-normal text-red_color">*</p>}<p>Confirm password:</p></label>
           <input className="px-5 w-72 h-[52px] text-[14px] text-inp_col rounded-[50px] bg-bg_fon focus:outline-none" type="password" id="confirmPassword" name="confirmPassword" autoComplete="off" defaultValue="" />
        {checkConfirmPassword && (<p className="mt-1 text-[10px] font-normal text-red_color">The confirm password is a required field</p>)}
        </div>
        </>
    )
}

export default Register;