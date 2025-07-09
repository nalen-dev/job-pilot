"use server"

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { createSession, getCurrentSession, verifyPassword } from '@/services/auth';
import { createUser, getUserByEmail } from '@/services/user';
import { prisma } from '@/utils/prisma';


export async function registerAction(formData) {
    const name = formData.get("name")
    const email = formData.get("email")
    const password = formData.get("password")

    if (!name || !email || !password) {
      console.log('All fields are required');
      return { error: 'All fields are required' };
    }

    console.log(name, email,password)
 
    const user = await getUserByEmail(email);

    if (user) {
      return { error: 'User already exists' };
    }
  
    const newUser = await createUser(name, email, password);
  
    return { success: 'User created successfully', user: newUser };
  }

  export async function loginAction(formData) {
    const cookieStore = await cookies();
  
    const email = formData.get('email');
    const password = formData.get('password');
  
    if (!email || !password) {
      return { error: 'All fields are required' };
    }
  
    const getWithPassword = true;
  
    // cek email
    const user = await getUserByEmail(email, getWithPassword);
    if (!user) {
      return { error: 'User not found' };
    }

    // cek password
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return { error: 'Invalid password' };
    }
  

    const session = await createSession(user.id);
  
    cookieStore.set('session', session.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });
  
    redirect('/');
  }

  export async function logoutAction() {
    const session = await getCurrentSession()
    const cookieStore = await cookies()
    
    await prisma.session.delete({
      where: {
        id: session.id
      }
    })
    
    cookieStore.delete("session")
    redirect("/login")
  }