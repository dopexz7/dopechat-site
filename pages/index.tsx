import Head from 'next/head'
import { MainNav } from '../components/mainpage/nav/navigation'
import MainHeader from '../components/mainpage/header/header'
import { LookAtFeatures } from '../components/mainpage/lookat/lookat'
import Changelog from '../components/mainpage/changelog/changelog'
import MainFooter from '../components/mainpage/footer/footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>dopeChat</title>
        <meta name="description" content="Facebook Gaming extension dopeChat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <MainNav/>
      <MainHeader/>
      <LookAtFeatures/>
      <Changelog/>
      <MainFooter/>
    </>
  )
}
