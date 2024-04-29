import MainLayout from 'components/MainLayout'
import Articles from 'pages/home/container/Articles'
import CTA from 'pages/home/container/CTA'
import Hero from 'pages/home/container/Hero'

const HomePage = () => {
  return (
    <MainLayout>
      <Hero />
      <Articles />
      <CTA />
    </MainLayout>
  )
}

export default HomePage
