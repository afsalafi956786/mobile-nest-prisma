// app/login/page.tsx
'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/service/api';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';


interface LoginFormData {
  email: string;
  password: string;
}


const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();


 useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await apiFetch.get("/auth/me"); // call backend to check cookie
        useAuthStore.getState().setAuth(res.user); // set user in store if logged in
        router.replace("/"); // redirect to dashboard
      } catch (err) {
        // not logged in, do nothing, stay on login page
      }
    };
    checkAuth();
  }, [router]);


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });


  const  formSubmit = async (FormData : LoginFormData)=>{
    try{
   await apiFetch.post('/auth/login', FormData)
  const res = await apiFetch.get("/auth/me");
    useAuthStore.getState().setAuth(res.user);
    toast.success('Login successful');
    router.replace('/');
    }catch(error:any){
        toast.error(error?.message);
    }
  
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Section with main-primary color */}
      <div 
        className="hidden lg:flex lg:w-1/2 bg-main-primary flex-col justify-between p-12"
        style={{ backgroundColor: 'var(--main-primary)' }}
      >
        <div>
          <div className="flex items-center space-x-3 mb-16">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-main-primary font-bold text-xl">L</span>
            </div>
            <span className="text-white text-2xl font-bold">Logo</span>
          </div>
          
          <div className="max-w-md">
            <h2 className="text-white text-4xl font-bold mb-6">
              Welcome Back
            </h2>
            <p className="text-white/90 text-lg">
              Sign in to access your dashboard, manage your account, and explore all features.
            </p>
          </div>
        </div>

        <div className="text-white/80">
          <p className="text-sm">
            © 2024 Your Company. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8 bg-main">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 bg-main-primary rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'var(--main-primary)' }}
              >
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span 
                className="text-text-primary text-2xl font-bold"
                style={{ color: 'var(--main-primary)' }}
              >
                Logo
              </span>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-text-primary">Sign in to your account</h1>
            <p className="mt-2 text-text-secondary">Please enter your credentials to continue</p>
          </div>
          
          <form noValidate className="space-y-6" onSubmit={handleSubmit(formSubmit)}>
            <div>
              <label  className="block text-sm font-medium text-text-secondary mb-2">
                Email
              </label>
              <div className="relative">
                <input
                {...register('email')}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  className={`${ errors.email ? 'border-red-500' : 'border-border' } w-full px-4 py-3  bg-sidebar border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-main-primary focus:border-transparent transition-all`}
                />
                {
                    errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>
                }
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Password
              </label>
              <div className="relative">
                <input
                {...register('password')}
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className={`${ errors.password ? 'border-red-500' : 'border-border' } w-full px-4 py-3 bg-sidebar border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-main-primary focus:border-transparent transition-all pr-12`}
                />
                { errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span> }
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5  cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-main-primary border-border rounded focus:ring-main-primary"
                  style={{ color: 'var(--main-primary)' }}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-text-secondary">
                  Remember me
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-main-primary hover:underline"
                style={{ color: 'var(--main-primary)' }}
              >
                Forgot password?
              </Link>
            </div>

            <button disabled={isSubmitting}
              type="submit"
              className="cursor-pointer w-full bg-main-primary text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
              style={{ backgroundColor: 'var(--main-primary)' }}
            >
            {isSubmitting ? <div className="loader"></div> : "Sign In"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-center text-text-secondary text-sm">
              Don't have an account?{' '}
              <Link
                href="/signup"
                className="text-main-primary font-medium hover:underline"
                style={{ color: 'var(--main-primary)' }}
              >
                Create one
              </Link>
            </p>
          </div>

       
        </div>
      </div>
    </div>
  );
}
