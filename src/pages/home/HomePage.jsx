import MainLayout from 'components/MainLayout'
import Articles from 'pages/container/Articles'
import CTA from 'pages/container/CTA'
import Hero from 'pages/container/Hero'

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
