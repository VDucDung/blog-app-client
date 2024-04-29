import MainLayout from 'components/MainLayout'
import Articles from 'pages/container/Articles'
import Hero from 'pages/container/Hero'

const HomePage = () => {
  return (
    <MainLayout>
      <Hero />
      <Articles />
    </MainLayout>
  )
}

export default HomePage
