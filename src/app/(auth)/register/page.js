import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { registerAction } from '../action'


export default function Page() {
  return (
    <main>
      <h1>Register</h1>
      <form action={registerAction}>
          <Input name="name" placeholder="Name" type="text"/>
          <Input name="email" placeholder="email" type="Email" />
          <Input name="password" placeholder="Password" type="password" required/>
          <Button>Register</Button>
      </form>
  </main>
  )
}
