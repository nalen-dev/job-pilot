import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { loginAction } from '../action'

export default function Page() {
  return (
    <main>
        <h1>Login</h1>
        <form action={loginAction}>
            <Input name="email" type="email" placeholder="email" />
            <Input name="password" type="password" placeholder="password" required/>
            <Button>Login</Button>
        </form>
    </main>
  )
}
