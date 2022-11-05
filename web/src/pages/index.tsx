import { FormEvent, useState } from "react";
import Image from "next/image";
import appPreviewImg from '../assets/phone.png'
import avatares from '../assets/avatares.png'
import logo from '../assets/logo.svg'
import iconCheck from '../assets/icon-check.svg'
import PoolStats from '../components/PoolStats'
import { api } from "../lib/api";

interface HomeProps {
  poolCount: number;
  guessCount: number;
  usersCount: number;
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('')

  async function createPool(evt: FormEvent) {
    evt.preventDefault()

    try {
      const response = await api.post('/pools', {
        title: poolTitle
      })
      const { code } = response.data

      await navigator.clipboard.writeText(code)
      alert('Bolão criado com sucesso, o código foi copiado para área de transferência!')
      setPoolTitle("")
    } catch (error) {
      console.error(error)
      alert('Falha ao criar o bolão, tente novamente!')
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image
          src={logo}
          alt="NLW Copa"
          quality={100}
        />

        <h1
          className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image
            src={avatares}
            alt="Avatares"
            quality={100}
          />
          <strong className="text-gray-100 font-bold text-xl items-center">
            <span className="text-ignite-500 mr-2">+{props.usersCount}</span>
            pessoas já estão usando
          </strong>
        </div>

        <div className="mt-10">
          <form onSubmit={createPool} className="flex items-center gap-2">
            <input
              type="text"
              className="flex-1 bg-gray-950 border border-gray-200 rounded px-6 py-4 text-sm text-gray-100"
              placeholder="Qual nome do seu bolão?"
              required
              onChange={(event) => setPoolTitle(event.target.value)}
              value={poolTitle}
            />
            <button
              type="submit"
              className="text-black bg-yellow-500 font-bold text-sm rounded px-6 py-4">
              CRIAR MEU BOLÃO
            </button>
          </form>
          <p className="text-gray-100 text-sm mt-4 leading-relaxed">
            Após criar seu bolão, você receberá um código único que
            poderá usar para convidar outras pessoas 🚀
          </p>
        </div>

        <div className="text-gray-100 mt-10 pt-10 flex justify-between border-t border-gray-200">
          <PoolStats
            icon={iconCheck}
            stats={props.poolCount}
            description='Bolões criados'
          />

          <div className="w-px bg-gray-200" />

          <PoolStats
            icon={iconCheck}
            stats={props.guessCount}
            description='Palpites enviados'
          />
        </div>
      </main>

      <Image
        src={appPreviewImg}
        alt="Preview da aplicação móvel"
        quality={100}
      />
    </div>
  )
}

export const getServerSideProps = async () => {
  const [poolCountResponse, guessCountResponse, usersCountResponse] = await Promise.all([
    api.get('/pools/count'),
    api.get('/guesses/count'),
    api.get('/users/count')
  ])

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      usersCount: usersCountResponse.data.count
    }
  }
}