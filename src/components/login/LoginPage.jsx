'use client'
import Link from 'next/link'
import React from 'react'
import signin from '../../../utils/auth/loginHandler'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    const loginHandler = async (e)=>{
        e.preventDefault();
        setLoading(true);

        const email = e.target.email.value;
        const password = e.target.password.value;

        const res = await signin(email, password);
        if(res.error){
            console.log(res.error);
            toast.error(res.error);
            setLoading(false);
            return;
        }
            console.log(res);
            toast.success('Login successful');
            router.push('/blogs');
    };
    return (
    <div className='min-h-screen flex align-middle'>
    <div className='m-auto w-96 px-8 pb-6 shadow-lg'>
      <h2 className='text-center font-bold text-3xl'>Login</h2>
        <form onSubmit={loginHandler}>
          <div className='mb-4'>
            <label className='block text-base font-medium text-gray-700'>Email</label>
            <input type='email' name='email' id='email' className='mt-1 p-2 block border w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' />
          </div>
          <div className='mb-4'>
            <label className='block text-base font-medium text-gray-700'>Password</label>
            <input type='password' name='password' id='password' className='mt-1 p-2 border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' />
          </div>
          <button type='submit' className='w-full bg-indigo-600 text-white p-2 rounded-md'>Login</button>
        </form>
      <div>
        <p className='text-center mt-4'>
          {"Don't have an account?"} <Link href='/signup' className='text-indigo-600'>Signup Here!</Link>
        </p>
      </div>
    </div>
    </div>
  )
}

export default LoginPage