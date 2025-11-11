'use client'
interface LoginProps {
    user: {
        email: string;
        password: string;
        check: boolean
    }
}
const Login = ({ user }: LoginProps) => {
    
    const checkEmail = user.email === '' && user.check;
    const checkPassword = user.password === '' && user.check
   
    return (
        <>
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
        </>
    )
}

export default Login;