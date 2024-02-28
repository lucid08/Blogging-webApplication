import { useState } from 'react';

import { Box , TextField,Button,styled, Typography} from '@mui/material';

const Component = styled(Box)`
width:400px;
margin:auto;
box-shadow:5px 2px 5px 2px rgb(0 0 0/0.6)
`

const Image = styled('img')({
    width:250,
    margin:'auto',
    display:'flex',
    padding:'50px 0 0'
})

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display:flex;
    flex:1;
    flex-direction:column;
    & > div,& > button,& > p{
        margin-top:20px;
    }
`

const LoginButton = styled(Button)`
    text-transform: none;
    background-color:#FB641B;
    height:48px;
`

const SignupButton = styled(Button)`
    text-transform: none;
    box-shadow:0 2px 4px rgb(0 0 0/ 20%);
    height:48px;
    color:#2874f0
`
const Text = styled(Typography)`
    color:#878787;
`
const signupInitialValue = {
    name:'',
    username:'',
    password:''
}


const Login = () => {

    const imageURL = 'https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572-768x591.png'

    const [account,toggleAccount] = useState('login');
    const [signup,setSignup] = useState(signupInitialValue)

    const toggleSignup = () => {
        account === 'signup'? toggleAccount('login') : toggleAccount('signup');
    }
    const onInputChange = (e) => {
        setSignup({...signup,[e.target.name] : e.target.value});
    }

    const signupUser = () => {
        
    }

    return(
        <Component>
            <Box>
                <Image src={imageURL} alt='login' />
                {
                    account === 'login'?
                    <Wrapper>
                        <TextField variant="standard" label="Enter username"/>
                        <TextField variant="standard" label="Enter password"/>
                        <LoginButton variant='contained'>Login</LoginButton>
                        <Text style={{textAlign:'center'}}>OR</Text>
                        <SignupButton onClick={() => toggleSignup()}>Create an Account</SignupButton>
                    </Wrapper>
                :
                    <Wrapper>
                        <TextField variant="standard" onChange={(e) => onInputChange(e)} name='name' label="Enter Name"/>
                        <TextField variant="standard" onChange={(e) => onInputChange(e)} name='username' label="Enter Username"/>
                        <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password' label="Enter Password"/>

                        <SignupButton onClick={() => signupUser()}>Sign Up</SignupButton>
                        <Text style={{textAlign:'center'}}>OR</Text>
                        <LoginButton variant='contained' onClick={() => toggleSignup()}>Already have an account?</LoginButton>
                    </Wrapper>
                }
            </Box>
        </Component>
    )
}

export default Login;