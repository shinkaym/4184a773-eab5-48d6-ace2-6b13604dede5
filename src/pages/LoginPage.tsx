import { Carousel } from '../components/Carousel';
import { LoginForm } from '../components/LoginForm';
import logo from '../assets/images/logo.jpg';

export function LoginPage() {
  return (
    <div className='min-h-screen w-full bg-nature-main p-6 md:p-12 flex flex-col relative overflow-hidden'>
      {/* Ambient background elements */}
      <div className='absolute top-0 left-1/4 w-[500px] h-[500px] bg-nature-primary/8 rounded-full blur-3xl' />
      <div className='absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-nature-secondary/8 rounded-full blur-3xl' />

      {/* Header */}
      <header className='w-full max-w-7xl mx-auto flex justify-between items-center mb-12 px-2 relative z-10'>
        <div className='flex items-center gap-3'>
          <img src={logo} alt='AICOMPOS Logo' className='h-10 md:h-12 w-auto rounded-soft shadow-soft' />
          <h1 className='text-3xl md:text-4xl font-display font-semibold tracking-tight text-nature-text-primary'>
            AICOM<span className='text-nature-primary'>POS</span>
          </h1>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className='flex-grow w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch relative z-10'>
        {/* Left Column: Carousel */}
        <div className='w-full h-full min-h-[400px] lg:min-h-[600px]'>
          <Carousel />
        </div>

        {/* Right Column: Login Form */}
        <div className='w-full h-full min-h-[600px] flex items-center'>
          <LoginForm />
        </div>
      </main>

      {/* Subtle texture overlay */}
      <div
        className='fixed inset-0 pointer-events-none z-0 opacity-[0.02]'
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
